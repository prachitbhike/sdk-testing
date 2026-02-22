import Fastify from "fastify";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { v4 as uuidv4 } from "uuid";
import crypto from "node:crypto";

// =============================================================================
// In-memory stores
// =============================================================================
const db = {
  organizations: new Map(),
  projects: new Map(),
  datasets: new Map(),
  models: new Map(),
  alerts: new Map(),
  alertEvents: new Map(), // alertId -> AlertEvent[]
  operations: new Map(),
  members: new Map(), // orgId -> Member[]
  webhooks: new Map(),
  webhookDeliveries: new Map(), // webhookId -> WebhookDelivery[]
  predictions: new Map(),
  idempotencyStore: new Map(), // key -> { status, headers, body }
};

// =============================================================================
// Helpers
// =============================================================================
function now() {
  return new Date().toISOString();
}

function pastDate(minutesAgo) {
  return new Date(Date.now() - minutesAgo * 60_000).toISOString();
}

function encodeCursor(offset) {
  return Buffer.from(String(offset)).toString("base64");
}

function decodeCursor(cursor) {
  if (!cursor) return 0;
  try {
    return parseInt(Buffer.from(cursor, "base64").toString("utf8"), 10) || 0;
  } catch {
    return 0;
  }
}

function cursorPage(allItems, cursor, limit) {
  const offset = decodeCursor(cursor);
  const safeLimit = Math.max(1, Math.min(limit || 20, 100));
  const slice = allItems.slice(offset, offset + safeLimit);
  const hasMore = offset + safeLimit < allItems.length;
  return {
    data: slice,
    has_more: hasMore,
    next_cursor: hasMore ? encodeCursor(offset + safeLimit) : null,
  };
}

function offsetPage(allItems, offset, limit) {
  const safeOffset = Math.max(0, offset || 0);
  const safeLimit = Math.max(1, Math.min(limit || 20, 100));
  const slice = allItems.slice(safeOffset, safeOffset + safeLimit);
  return {
    data: slice,
    total: allItems.length,
    offset: safeOffset,
    limit: safeLimit,
  };
}

function apiError(type, message, requestId, details = null) {
  const err = { type, message, request_id: requestId };
  if (details) err.details = details;
  return err;
}

function notFound(requestId, resource = "Resource") {
  return apiError("not_found", `${resource} not found`, requestId);
}

function generateForecastPoints(horizon, confidenceIntervals = [0.9, 0.95]) {
  const points = [];
  const baseValue = 100 + Math.random() * 50;
  const startTime = Date.now();
  for (let i = 0; i < horizon; i++) {
    const ts = new Date(startTime + i * 3600_000).toISOString();
    const drift = (Math.random() - 0.5) * 10;
    const value = parseFloat((baseValue + i * 0.5 + drift).toFixed(4));
    const point = { timestamp: ts, value };
    if (confidenceIntervals && confidenceIntervals.length > 0) {
      point.confidence_intervals = confidenceIntervals.map((level) => {
        const spread = (1 - level) * 50 + i * 0.3;
        return {
          level,
          lower: parseFloat((value - spread).toFixed(4)),
          upper: parseFloat((value + spread).toFixed(4)),
        };
      });
    }
    points.push(point);
  }
  return points;
}

// =============================================================================
// Seed data
// =============================================================================
function seed() {
  // Organization
  const orgId = "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d";
  const org = {
    id: orgId,
    name: "Acme Forecasting",
    slug: "acme-forecasting",
    plan: "pro",
    created_at: pastDate(10080), // 7 days ago
    metadata: { industry: "finance", region: "us-east" },
  };
  db.organizations.set(orgId, org);

  const org2Id = "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e";
  db.organizations.set(org2Id, {
    id: org2Id,
    name: "Beta Analytics",
    slug: "beta-analytics",
    plan: "enterprise",
    created_at: pastDate(20160),
    metadata: null,
  });

  // Members for org1
  const member1 = {
    id: uuidv4(),
    org_id: orgId,
    email: "admin@acme.dev",
    role: "owner",
    joined_at: pastDate(10080),
  };
  const member2 = {
    id: uuidv4(),
    org_id: orgId,
    email: "analyst@acme.dev",
    role: "member",
    joined_at: pastDate(4320),
  };
  db.members.set(orgId, [member1, member2]);
  db.members.set(org2Id, []);

  // Project
  const projId = "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f";
  const project = {
    id: projId,
    org_id: orgId,
    name: "Revenue Forecasting",
    description: "Q4 revenue prediction pipeline",
    created_at: pastDate(4320),
    updated_at: pastDate(60),
  };
  db.projects.set(projId, project);

  const proj2Id = "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80";
  db.projects.set(proj2Id, {
    id: proj2Id,
    org_id: orgId,
    name: "Energy Demand",
    description: "Electrical grid load forecasting",
    created_at: pastDate(2880),
    updated_at: pastDate(120),
  });

  // Dataset
  const dsId = "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091";
  const dataset = {
    id: dsId,
    project_id: projId,
    name: "monthly-revenue-2024",
    format: "csv",
    row_count: 8760,
    columns: [
      { name: "timestamp", dtype: "datetime", nullable: false },
      { name: "revenue", dtype: "float64", nullable: false },
      { name: "customers", dtype: "int64", nullable: true },
      { name: "region", dtype: "string", nullable: false },
    ],
    size_bytes: 524288,
    status: "ready",
    created_at: pastDate(4000),
    source: {
      type: "file_upload",
      filename: "monthly-revenue-2024.csv",
      content_type: "text/csv",
    },
  };
  db.datasets.set(dsId, dataset);

  const ds2Id = "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102";
  db.datasets.set(ds2Id, {
    id: ds2Id,
    project_id: projId,
    name: "api-pull-weather",
    format: "json",
    row_count: 4380,
    columns: [
      { name: "timestamp", dtype: "datetime", nullable: false },
      { name: "temperature", dtype: "float64", nullable: false },
      { name: "humidity", dtype: "float64", nullable: true },
    ],
    size_bytes: 262144,
    status: "ready",
    created_at: pastDate(3000),
    source: {
      type: "api_pull",
      source_url: "https://weather-api.example.com/v2/hourly",
      schedule_cron: "0 */6 * * *",
      headers: { Authorization: "Bearer wk_live_example" },
    },
  });

  // Model
  const modelId = "1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d";
  const model = {
    id: modelId,
    project_id: projId,
    name: "revenue-arima-v2",
    algorithm: {
      type: "arima",
      order_p: 2,
      order_d: 1,
      order_q: 1,
      seasonal: true,
    },
    status: "trained",
    dataset_id: dsId,
    target_column: "revenue",
    feature_columns: ["customers", "region"],
    hyperparameters: {
      learning_rate: 0.001,
      epochs: 100,
      batch_size: 32,
      early_stopping: true,
    },
    metrics: {
      mae: 12.34,
      rmse: 18.56,
      mape: 3.21,
      r_squared: 0.94,
      training_duration_seconds: 127.5,
    },
    created_at: pastDate(2000),
    trained_at: pastDate(1900),
  };
  db.models.set(modelId, model);

  const model2Id = "2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e";
  db.models.set(model2Id, {
    id: model2Id,
    project_id: projId,
    name: "revenue-neural-v1",
    algorithm: {
      type: "neural",
      architecture: "transformer",
      layers: 6,
      hidden_size: 256,
      dropout: 0.1,
    },
    status: "draft",
    dataset_id: dsId,
    target_column: "revenue",
    feature_columns: ["customers"],
    hyperparameters: null,
    metrics: null,
    created_at: pastDate(500),
    trained_at: null,
  });

  // Alert
  const alertId = "3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f";
  const alert = {
    id: alertId,
    project_id: projId,
    name: "Revenue drop alert",
    model_id: modelId,
    condition: {
      type: "threshold",
      metric: "revenue",
      operator: "lt",
      value: 50000,
      duration_minutes: 60,
    },
    channels: [
      { type: "email", address: "alerts@acme.dev" },
      {
        type: "slack",
        channel_id: "C0123ALERTS",
        webhook_url: "https://hooks.slack.com/services/T00/B00/xxx",
      },
    ],
    enabled: true,
    created_at: pastDate(1500),
  };
  db.alerts.set(alertId, alert);

  // Alert events (history)
  const alertEvents = [];
  for (let i = 0; i < 25; i++) {
    alertEvents.push({
      id: uuidv4(),
      alert_id: alertId,
      triggered_at: pastDate(1440 - i * 60),
      condition_snapshot: alert.condition,
      observed_value: 45000 + Math.random() * 10000,
      resolved_at: i % 3 === 0 ? pastDate(1440 - i * 60 - 30) : null,
    });
  }
  db.alertEvents.set(alertId, alertEvents);

  // Webhook
  const whId = "4d5e6f7a-8b9c-4d0e-1f2a-3b4c5d6e7f80";
  db.webhooks.set(whId, {
    id: whId,
    url: "https://hooks.acme.dev/chronocast",
    events: [
      "model.training.completed",
      "prediction.completed",
      "alert.triggered",
    ],
    secret: "whsec_abcdef1234567890abcdef1234567890",
    active: true,
    created_at: pastDate(5000),
  });

  // Webhook deliveries
  const deliveries = [];
  for (let i = 0; i < 10; i++) {
    deliveries.push({
      id: uuidv4(),
      webhook_id: whId,
      event_type: ["model.training.completed", "alert.triggered", "prediction.completed"][i % 3],
      payload: { model_id: modelId, event: "training_complete", timestamp: pastDate(100 - i * 10) },
      response_status: i === 3 ? null : 200,
      delivered_at: pastDate(100 - i * 10),
      success: i !== 3,
    });
  }
  db.webhookDeliveries.set(whId, deliveries);

  // An operation (completed training)
  const opId = "5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8091";
  db.operations.set(opId, {
    id: opId,
    status: "succeeded",
    created_at: pastDate(1950),
    updated_at: pastDate(1900),
    result_url: `http://localhost:3737/v1/organizations/${orgId}/projects/${projId}/models/${modelId}`,
    error: null,
    progress_pct: 100,
  });
}

// =============================================================================
// Fastify setup
// =============================================================================
const app = Fastify({ logger: true });

// Allow empty bodies with application/json content-type (Stainless SDK sends
// Content-Type: application/json on POST/DELETE even with no body)
app.addContentTypeParser("application/json", { parseAs: "string" }, function (req, body, done) {
  if (!body || body.length === 0) {
    done(null, undefined);
    return;
  }
  try {
    done(null, JSON.parse(body));
  } catch (err) {
    err.statusCode = 400;
    done(err, undefined);
  }
});

await app.register(cors, { origin: true });
await app.register(multipart, { limits: { fileSize: 100 * 1024 * 1024 } });

// ---------------------------------------------------------------------------
// Global hooks: rate-limit headers, request-id, idempotency
// ---------------------------------------------------------------------------
app.addHook("onRequest", async (request, reply) => {
  request.requestId = request.headers["x-request-id"] || uuidv4();
});

app.addHook("onSend", async (request, reply, payload) => {
  reply.header("X-RateLimit-Limit", 1000);
  reply.header("X-RateLimit-Remaining", 999);
  reply.header(
    "X-RateLimit-Reset",
    new Date(Date.now() + 60_000).toISOString()
  );
  reply.header("X-Request-Id", request.requestId);
  return payload;
});

// Idempotency-Key support for mutating methods
app.addHook("preHandler", async (request, reply) => {
  if (!["POST", "PUT", "PATCH"].includes(request.method)) return;
  const idempotencyKey = request.headers["idempotency-key"];
  if (!idempotencyKey) return;
  const cached = db.idempotencyStore.get(idempotencyKey);
  if (cached) {
    reply.code(cached.statusCode);
    for (const [k, v] of Object.entries(cached.headers)) {
      reply.header(k, v);
    }
    reply.send(cached.body);
    return; // short-circuit
  }
  // Mark that we will capture the response
  request.idempotencyKey = idempotencyKey;
});

app.addHook("onSend", async (request, reply, payload) => {
  if (request.idempotencyKey && !db.idempotencyStore.has(request.idempotencyKey)) {
    db.idempotencyStore.set(request.idempotencyKey, {
      statusCode: reply.statusCode,
      headers: reply.getHeaders(),
      body: payload,
    });
  }
  return payload;
});

// =============================================================================
// Routes — all under /v1 prefix
// =============================================================================

// ---- Organizations --------------------------------------------------------
app.get("/v1/organizations", async (request, reply) => {
  const { cursor, limit } = request.query;
  const all = Array.from(db.organizations.values());
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations", async (request, reply) => {
  const body = request.body;
  if (!body || !body.name || !body.slug) {
    reply.code(400);
    return apiError("invalid_request", "name and slug are required", request.requestId, [
      ...(!body?.name ? [{ field: "name", message: "is required", code: "required" }] : []),
      ...(!body?.slug ? [{ field: "slug", message: "is required", code: "required" }] : []),
    ]);
  }
  const org = {
    id: uuidv4(),
    name: body.name,
    slug: body.slug,
    plan: body.plan || "free",
    created_at: now(),
    metadata: body.metadata || null,
  };
  db.organizations.set(org.id, org);
  reply.code(201);
  return org;
});

app.get("/v1/organizations/:org_id", async (request, reply) => {
  const org = db.organizations.get(request.params.org_id);
  if (!org) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  return org;
});

app.patch("/v1/organizations/:org_id", async (request, reply) => {
  const org = db.organizations.get(request.params.org_id);
  if (!org) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  const body = request.body || {};
  if (body.name !== undefined) org.name = body.name;
  if (body.plan !== undefined) org.plan = body.plan;
  if (body.metadata !== undefined) org.metadata = body.metadata;
  return org;
});

app.delete("/v1/organizations/:org_id", async (request, reply) => {
  const org = db.organizations.get(request.params.org_id);
  if (!org) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  db.organizations.delete(request.params.org_id);
  reply.code(204);
});

// ---- Members --------------------------------------------------------------
app.get("/v1/organizations/:org_id/members", async (request, reply) => {
  const orgId = request.params.org_id;
  if (!db.organizations.has(orgId)) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  let members = db.members.get(orgId) || [];
  const { role, cursor, limit } = request.query;
  if (role) {
    members = members.filter((m) => m.role === role);
  }
  return cursorPage(members, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations/:org_id/members", async (request, reply) => {
  const orgId = request.params.org_id;
  if (!db.organizations.has(orgId)) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  const body = request.body;
  if (!body || !body.email) {
    reply.code(400);
    return apiError("invalid_request", "email is required", request.requestId, [
      { field: "email", message: "is required", code: "required" },
    ]);
  }
  const member = {
    id: uuidv4(),
    org_id: orgId,
    email: body.email,
    role: body.role || "member",
    joined_at: now(),
  };
  const list = db.members.get(orgId) || [];
  list.push(member);
  db.members.set(orgId, list);
  reply.code(201);
  return member;
});

// ---- Projects -------------------------------------------------------------
app.get("/v1/organizations/:org_id/projects", async (request, reply) => {
  const orgId = request.params.org_id;
  if (!db.organizations.has(orgId)) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  const { cursor, limit } = request.query;
  const all = Array.from(db.projects.values()).filter((p) => p.org_id === orgId);
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations/:org_id/projects", async (request, reply) => {
  const orgId = request.params.org_id;
  if (!db.organizations.has(orgId)) {
    reply.code(404);
    return notFound(request.requestId, "Organization");
  }
  const body = request.body;
  if (!body || !body.name) {
    reply.code(400);
    return apiError("invalid_request", "name is required", request.requestId, [
      { field: "name", message: "is required", code: "required" },
    ]);
  }
  const project = {
    id: uuidv4(),
    org_id: orgId,
    name: body.name,
    description: body.description || null,
    created_at: now(),
    updated_at: now(),
  };
  db.projects.set(project.id, project);
  reply.code(201);
  return project;
});

app.get("/v1/organizations/:org_id/projects/:project_id", async (request, reply) => {
  const project = db.projects.get(request.params.project_id);
  if (!project || project.org_id !== request.params.org_id) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  return project;
});

app.delete("/v1/organizations/:org_id/projects/:project_id", async (request, reply) => {
  const project = db.projects.get(request.params.project_id);
  if (!project || project.org_id !== request.params.org_id) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  db.projects.delete(request.params.project_id);
  reply.code(204);
});

// ---- Datasets -------------------------------------------------------------
function findProject(request, reply) {
  const project = db.projects.get(request.params.project_id);
  if (!project || project.org_id !== request.params.org_id) {
    return null;
  }
  return project;
}

app.get("/v1/organizations/:org_id/projects/:project_id/datasets", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const projId = request.params.project_id;
  const { cursor, limit, status } = request.query;
  let all = Array.from(db.datasets.values()).filter((d) => d.project_id === projId);
  if (status) {
    all = all.filter((d) => d.status === status);
  }
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations/:org_id/projects/:project_id/datasets", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const body = request.body;
  if (!body || !body.name || !body.source) {
    reply.code(400);
    return apiError("invalid_request", "name and source are required", request.requestId, [
      ...(!body?.name ? [{ field: "name", message: "is required", code: "required" }] : []),
      ...(!body?.source ? [{ field: "source", message: "is required", code: "required" }] : []),
    ]);
  }

  const sourceType = body.source.type;
  let format = "json";
  if (sourceType === "file_upload") {
    const fn = body.source.filename || "";
    if (fn.endsWith(".csv")) format = "csv";
    else if (fn.endsWith(".parquet")) format = "parquet";
  }

  const dataset = {
    id: uuidv4(),
    project_id: request.params.project_id,
    name: body.name,
    format,
    row_count: null,
    columns: null,
    size_bytes: 0,
    status: sourceType === "file_upload" ? "uploading" : "processing",
    created_at: now(),
    source: body.source,
  };
  db.datasets.set(dataset.id, dataset);
  reply.code(201);
  return dataset;
});

// Multipart file upload
app.post("/v1/organizations/:org_id/projects/:project_id/datasets/upload", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }

  let name = "";
  let filename = "";
  let contentType = "application/octet-stream";
  let sizeBytes = 0;

  const parts = request.parts();
  for await (const part of parts) {
    if (part.type === "field") {
      if (part.fieldname === "name") {
        name = part.value;
      }
    } else if (part.type === "file") {
      filename = part.filename || "upload.csv";
      contentType = part.mimetype || "application/octet-stream";
      // Consume the file stream to get size
      for await (const chunk of part.file) {
        sizeBytes += chunk.length;
      }
    }
  }

  if (!name) {
    reply.code(400);
    return apiError("invalid_request", "name field is required", request.requestId, [
      { field: "name", message: "is required", code: "required" },
    ]);
  }

  let format = "csv";
  if (filename.endsWith(".parquet")) format = "parquet";
  else if (filename.endsWith(".json")) format = "json";

  const dataset = {
    id: uuidv4(),
    project_id: request.params.project_id,
    name,
    format,
    row_count: Math.floor(sizeBytes / 50) || 100,
    columns: [
      { name: "timestamp", dtype: "datetime", nullable: false },
      { name: "value", dtype: "float64", nullable: false },
    ],
    size_bytes: sizeBytes || 1024,
    status: "processing",
    created_at: now(),
    source: {
      type: "file_upload",
      filename,
      content_type: contentType,
    },
  };
  db.datasets.set(dataset.id, dataset);
  reply.code(201);
  return dataset;
});

app.get("/v1/organizations/:org_id/projects/:project_id/datasets/:dataset_id", async (request, reply) => {
  const dataset = db.datasets.get(request.params.dataset_id);
  if (!dataset || dataset.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Dataset");
  }
  return dataset;
});

app.delete("/v1/organizations/:org_id/projects/:project_id/datasets/:dataset_id", async (request, reply) => {
  const dataset = db.datasets.get(request.params.dataset_id);
  if (!dataset || dataset.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Dataset");
  }
  db.datasets.delete(request.params.dataset_id);
  reply.code(204);
});

// Binary download
app.get("/v1/organizations/:org_id/projects/:project_id/datasets/:dataset_id/download", async (request, reply) => {
  const dataset = db.datasets.get(request.params.dataset_id);
  if (!dataset || dataset.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Dataset");
  }
  // Generate a fake CSV file
  const header = "timestamp,value,region\n";
  const rows = [];
  const base = Date.now() - 86400_000 * 30;
  for (let i = 0; i < 100; i++) {
    const ts = new Date(base + i * 3600_000).toISOString();
    const val = (100 + Math.random() * 50).toFixed(2);
    rows.push(`${ts},${val},us-east`);
  }
  const csv = header + rows.join("\n") + "\n";
  const buf = Buffer.from(csv, "utf8");
  reply
    .header("Content-Type", "application/octet-stream")
    .header("Content-Disposition", `attachment; filename="${dataset.name}.csv"`)
    .header("Content-Length", buf.length);
  return reply.send(buf);
});

// ---- Models ---------------------------------------------------------------
app.get("/v1/organizations/:org_id/projects/:project_id/models", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const projId = request.params.project_id;
  const { cursor, limit, status } = request.query;
  let all = Array.from(db.models.values()).filter((m) => m.project_id === projId);
  if (status) {
    all = all.filter((m) => m.status === status);
  }
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations/:org_id/projects/:project_id/models", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const body = request.body;
  if (!body || !body.name || !body.algorithm || !body.dataset_id || !body.target_column || !body.feature_columns) {
    reply.code(400);
    return apiError("invalid_request", "Missing required fields", request.requestId, [
      { field: "name", message: "is required", code: "required" },
    ]);
  }
  const model = {
    id: uuidv4(),
    project_id: request.params.project_id,
    name: body.name,
    algorithm: body.algorithm,
    status: "draft",
    dataset_id: body.dataset_id,
    target_column: body.target_column,
    feature_columns: body.feature_columns,
    hyperparameters: body.hyperparameters || null,
    metrics: null,
    created_at: now(),
    trained_at: null,
  };
  db.models.set(model.id, model);
  reply.code(201);
  return model;
});

app.get("/v1/organizations/:org_id/projects/:project_id/models/:model_id", async (request, reply) => {
  const model = db.models.get(request.params.model_id);
  if (!model || model.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Model");
  }
  return model;
});

app.delete("/v1/organizations/:org_id/projects/:project_id/models/:model_id", async (request, reply) => {
  const model = db.models.get(request.params.model_id);
  if (!model || model.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Model");
  }
  db.models.delete(request.params.model_id);
  reply.code(204);
});

// Train (async operation)
app.post("/v1/organizations/:org_id/projects/:project_id/models/:model_id/train", async (request, reply) => {
  const model = db.models.get(request.params.model_id);
  if (!model || model.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Model");
  }

  const body = request.body || {};
  if (body.hyperparameters) {
    model.hyperparameters = body.hyperparameters;
  }

  model.status = "training";

  const opId = uuidv4();
  const createdAt = now();
  const operation = {
    id: opId,
    status: "pending",
    created_at: createdAt,
    updated_at: createdAt,
    result_url: null,
    error: null,
    progress_pct: 0,
  };
  db.operations.set(opId, operation);

  // Simulate async progress: after a short delay the operation "advances"
  // We encode the model_id and org/project path so GET /operations can resolve
  operation._model_id = model.id;
  operation._org_id = request.params.org_id;
  operation._project_id = request.params.project_id;

  reply.code(202);
  return operation;
});

// Predict (with optional SSE streaming)
app.post("/v1/organizations/:org_id/projects/:project_id/models/:model_id/predict", async (request, reply) => {
  const model = db.models.get(request.params.model_id);
  if (!model || model.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Model");
  }
  const body = request.body;
  if (!body || !body.horizon) {
    reply.code(400);
    return apiError("invalid_request", "horizon is required", request.requestId, [
      { field: "horizon", message: "is required", code: "required" },
    ]);
  }

  const horizon = Math.min(body.horizon, 1000);
  const confidenceIntervals = body.confidence_intervals || [0.9, 0.95];
  const streaming = body.streaming === true;

  if (streaming) {
    // SSE streaming
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-RateLimit-Limit": "1000",
      "X-RateLimit-Remaining": "999",
      "X-RateLimit-Reset": new Date(Date.now() + 60_000).toISOString(),
      "X-Request-Id": request.requestId,
    });

    const predictionId = uuidv4();
    const points = generateForecastPoints(horizon, confidenceIntervals);
    const batchSize = Math.max(1, Math.ceil(horizon / 10));

    for (let i = 0; i < points.length; i++) {
      // Send point event
      const pointEvent = { event: "point", data: points[i] };
      reply.raw.write(`event: point\ndata: ${JSON.stringify(pointEvent)}\n\n`);

      // Send progress every batch
      if ((i + 1) % batchSize === 0 || i === points.length - 1) {
        const pct = parseFloat((((i + 1) / points.length) * 100).toFixed(1));
        const progressEvent = { event: "progress", data: { pct } };
        reply.raw.write(`event: progress\ndata: ${JSON.stringify(progressEvent)}\n\n`);
      }
    }

    // Done event
    const doneEvent = { event: "done", data: { prediction_id: predictionId } };
    reply.raw.write(`event: done\ndata: ${JSON.stringify(doneEvent)}\n\n`);
    reply.raw.end();
    return;
  }

  // Non-streaming response
  const predictionId = uuidv4();
  const points = generateForecastPoints(horizon, confidenceIntervals);
  const result = {
    id: predictionId,
    model_id: model.id,
    horizon,
    created_at: now(),
    points,
  };
  db.predictions.set(predictionId, result);
  return result;
});

// ---- Batch predictions ----------------------------------------------------
app.post("/v1/organizations/:org_id/projects/:project_id/predictions/batch", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const body = request.body;
  if (!body || !body.requests || !Array.isArray(body.requests) || body.requests.length === 0) {
    reply.code(400);
    return apiError("invalid_request", "requests array is required and must not be empty", request.requestId);
  }

  const results = [];
  for (let i = 0; i < body.requests.length; i++) {
    const req = body.requests[i];
    const model = db.models.get(req.model_id);
    if (!model) {
      results.push({
        result_type: "error",
        index: i,
        code: "model_not_found",
        message: `Model ${req.model_id} not found`,
      });
      continue;
    }
    const horizon = Math.min(req.horizon || 10, 1000);
    const ci = req.confidence_intervals || [0.9, 0.95];
    const points = generateForecastPoints(horizon, ci);
    results.push({
      id: uuidv4(),
      model_id: model.id,
      horizon,
      created_at: now(),
      points,
    });
  }

  return {
    id: uuidv4(),
    results,
  };
});

// ---- Alerts ---------------------------------------------------------------
app.get("/v1/organizations/:org_id/projects/:project_id/alerts", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const projId = request.params.project_id;
  const { cursor, limit } = request.query;
  const all = Array.from(db.alerts.values()).filter((a) => a.project_id === projId);
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/organizations/:org_id/projects/:project_id/alerts", async (request, reply) => {
  if (!findProject(request, reply)) {
    reply.code(404);
    return notFound(request.requestId, "Project");
  }
  const body = request.body;
  if (!body || !body.name || !body.model_id || !body.condition || !body.channels) {
    reply.code(400);
    return apiError("invalid_request", "Missing required fields for alert", request.requestId);
  }
  const alert = {
    id: uuidv4(),
    project_id: request.params.project_id,
    name: body.name,
    model_id: body.model_id,
    condition: body.condition,
    channels: body.channels,
    enabled: body.enabled !== undefined ? body.enabled : true,
    created_at: now(),
  };
  db.alerts.set(alert.id, alert);
  db.alertEvents.set(alert.id, []);
  reply.code(201);
  return alert;
});

app.get("/v1/organizations/:org_id/projects/:project_id/alerts/:alert_id", async (request, reply) => {
  const alert = db.alerts.get(request.params.alert_id);
  if (!alert || alert.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Alert");
  }
  return alert;
});

app.patch("/v1/organizations/:org_id/projects/:project_id/alerts/:alert_id", async (request, reply) => {
  const alert = db.alerts.get(request.params.alert_id);
  if (!alert || alert.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Alert");
  }
  const body = request.body || {};
  if (body.name !== undefined) alert.name = body.name;
  if (body.condition !== undefined) alert.condition = body.condition;
  if (body.channels !== undefined) alert.channels = body.channels;
  if (body.enabled !== undefined) alert.enabled = body.enabled;
  return alert;
});

app.delete("/v1/organizations/:org_id/projects/:project_id/alerts/:alert_id", async (request, reply) => {
  const alert = db.alerts.get(request.params.alert_id);
  if (!alert || alert.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Alert");
  }
  db.alerts.delete(request.params.alert_id);
  db.alertEvents.delete(request.params.alert_id);
  reply.code(204);
});

// Alert history (offset-based pagination)
app.get("/v1/organizations/:org_id/projects/:project_id/alerts/:alert_id/history", async (request, reply) => {
  const alert = db.alerts.get(request.params.alert_id);
  if (!alert || alert.project_id !== request.params.project_id) {
    reply.code(404);
    return notFound(request.requestId, "Alert");
  }

  let events = db.alertEvents.get(request.params.alert_id) || [];
  const { offset, limit, since, until } = request.query;

  if (since) {
    const sinceDate = new Date(since);
    events = events.filter((e) => new Date(e.triggered_at) >= sinceDate);
  }
  if (until) {
    const untilDate = new Date(until);
    events = events.filter((e) => new Date(e.triggered_at) <= untilDate);
  }

  return offsetPage(events, parseInt(offset) || 0, parseInt(limit) || 20);
});

// ---- Operations -----------------------------------------------------------
app.get("/v1/operations/:operation_id", async (request, reply) => {
  const op = db.operations.get(request.params.operation_id);
  if (!op) {
    reply.code(404);
    return notFound(request.requestId, "Operation");
  }

  // Simulate progress based on time elapsed since creation
  if (op.status === "pending" || op.status === "running") {
    const elapsed = Date.now() - new Date(op.created_at).getTime();
    const elapsedSeconds = elapsed / 1000;

    if (elapsedSeconds < 2) {
      op.status = "pending";
      op.progress_pct = 0;
    } else if (elapsedSeconds < 5) {
      op.status = "running";
      op.progress_pct = Math.min(90, Math.floor((elapsedSeconds / 10) * 100));
    } else {
      // After 5 seconds, complete the operation
      op.status = "succeeded";
      op.progress_pct = 100;
      op.updated_at = now();
      if (op._model_id && op._org_id && op._project_id) {
        op.result_url = `http://localhost:3737/v1/organizations/${op._org_id}/projects/${op._project_id}/models/${op._model_id}`;
        // Also update the model status
        const model = db.models.get(op._model_id);
        if (model) {
          model.status = "trained";
          model.trained_at = now();
          model.metrics = {
            mae: parseFloat((Math.random() * 10 + 5).toFixed(2)),
            rmse: parseFloat((Math.random() * 15 + 10).toFixed(2)),
            mape: parseFloat((Math.random() * 5 + 1).toFixed(2)),
            r_squared: parseFloat((0.85 + Math.random() * 0.14).toFixed(4)),
            training_duration_seconds: parseFloat((Math.random() * 200 + 30).toFixed(1)),
          };
        }
      }
    }
    op.updated_at = now();
  }

  // Return operation without internal fields
  const { _model_id, _org_id, _project_id, ...publicOp } = op;
  return publicOp;
});

app.post("/v1/operations/:operation_id/cancel", async (request, reply) => {
  const op = db.operations.get(request.params.operation_id);
  if (!op) {
    reply.code(404);
    return notFound(request.requestId, "Operation");
  }
  if (op.status === "pending" || op.status === "running") {
    op.status = "cancelled";
    op.updated_at = now();
  }
  const { _model_id, _org_id, _project_id, ...publicOp } = op;
  return publicOp;
});

// ---- Webhooks -------------------------------------------------------------
app.get("/v1/webhooks", async (request, reply) => {
  const { cursor, limit } = request.query;
  const all = Array.from(db.webhooks.values());
  return cursorPage(all, cursor, parseInt(limit) || 20);
});

app.post("/v1/webhooks", async (request, reply) => {
  const body = request.body;
  if (!body || !body.url || !body.events || body.events.length === 0) {
    reply.code(400);
    return apiError("invalid_request", "url and events are required", request.requestId);
  }
  const secret = "whsec_" + crypto.randomBytes(24).toString("hex");
  const webhook = {
    id: uuidv4(),
    url: body.url,
    events: body.events,
    secret,
    active: true,
    created_at: now(),
  };
  db.webhooks.set(webhook.id, webhook);
  db.webhookDeliveries.set(webhook.id, []);
  reply.code(201);
  return webhook;
});

app.get("/v1/webhooks/:webhook_id", async (request, reply) => {
  const webhook = db.webhooks.get(request.params.webhook_id);
  if (!webhook) {
    reply.code(404);
    return notFound(request.requestId, "Webhook");
  }
  // Do not return secret on GET
  const { secret, ...publicWebhook } = webhook;
  return publicWebhook;
});

app.delete("/v1/webhooks/:webhook_id", async (request, reply) => {
  const webhook = db.webhooks.get(request.params.webhook_id);
  if (!webhook) {
    reply.code(404);
    return notFound(request.requestId, "Webhook");
  }
  db.webhooks.delete(request.params.webhook_id);
  db.webhookDeliveries.delete(request.params.webhook_id);
  reply.code(204);
});

app.get("/v1/webhooks/:webhook_id/deliveries", async (request, reply) => {
  const webhook = db.webhooks.get(request.params.webhook_id);
  if (!webhook) {
    reply.code(404);
    return notFound(request.requestId, "Webhook");
  }
  const { cursor, limit } = request.query;
  const deliveries = db.webhookDeliveries.get(request.params.webhook_id) || [];
  return cursorPage(deliveries, cursor, parseInt(limit) || 20);
});

// Webhook signature verification
app.post("/v1/webhooks/:webhook_id/verify", async (request, reply) => {
  const webhook = db.webhooks.get(request.params.webhook_id);
  if (!webhook) {
    reply.code(404);
    return notFound(request.requestId, "Webhook");
  }
  const body = request.body;
  if (!body || !body.payload || !body.signature || !body.timestamp) {
    reply.code(400);
    return apiError("invalid_request", "payload, signature, and timestamp are required", request.requestId);
  }

  // Verify HMAC-SHA256 signature: sign(timestamp + "." + payload) with the webhook secret
  const signedPayload = `${body.timestamp}.${body.payload}`;
  const expectedSig = crypto
    .createHmac("sha256", webhook.secret)
    .update(signedPayload)
    .digest("hex");

  const valid = body.signature === expectedSig;
  const result = { valid };
  if (!valid) {
    result.reason = "Signature mismatch. Expected HMAC-SHA256 of '{timestamp}.{payload}' using the webhook secret.";
  }
  return result;
});

// =============================================================================
// Start
// =============================================================================
seed();

try {
  await app.listen({ port: 3737, host: "0.0.0.0" });
  console.log("Chronocast mock server running on http://localhost:3737/v1");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
