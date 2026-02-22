/**
 * Chronocast SDK Cross-Platform Test Runner
 *
 * Exercises every API pattern against the mock server using each generated SDK.
 * Usage:
 *   node test-runner.js stainless|fern|speakeasy|all
 *
 * Each SDK adapter exports the same interface (see adapters/*.js) so the
 * same test suite runs identically against every generated SDK.
 */

import chalk from "chalk";

const BASE_URL = process.env.CHRONOCAST_BASE_URL || "http://localhost:3737/v1";
const API_KEY = process.env.CHRONOCAST_API_KEY || "test-api-key-123";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

class TestHarness {
  constructor(platform) {
    this.platform = platform;
    this.results = [];
    this.adapter = null;
  }

  async loadAdapter() {
    const mod = await import(`./adapters/${this.platform}.js`);
    this.adapter = mod.createClient({ baseUrl: BASE_URL, apiKey: API_KEY });
  }

  async run(name, fn) {
    const start = Date.now();
    try {
      await fn(this.adapter);
      const ms = Date.now() - start;
      this.results.push({ name, status: "pass", ms });
      console.log(chalk.green(`  PASS `) + chalk.dim(`(${ms}ms) `) + name);
    } catch (err) {
      const ms = Date.now() - start;
      this.results.push({ name, status: "fail", ms, error: err.message });
      console.log(chalk.red(`  FAIL `) + chalk.dim(`(${ms}ms) `) + name);
      console.log(chalk.red(`       ${err.message}`));
    }
  }

  summary() {
    const pass = this.results.filter((r) => r.status === "pass").length;
    const fail = this.results.filter((r) => r.status === "fail").length;
    const total = this.results.length;
    console.log();
    console.log(
      chalk.bold(`  ${this.platform.toUpperCase()}: `) +
        chalk.green(`${pass} passed`) +
        chalk.dim(`, `) +
        chalk.red(`${fail} failed`) +
        chalk.dim(` / ${total} total`)
    );
    return { platform: this.platform, pass, fail, total };
  }
}

// ---------------------------------------------------------------------------
// Test suite — exercises every API pattern
// ---------------------------------------------------------------------------

async function runSuite(harness) {
  const h = harness;

  console.log(chalk.bold.underline(`\n${h.platform.toUpperCase()} SDK Tests\n`));

  // -- 1. Organizations (CRUD + pagination) --------------------------------
  let orgId;

  await h.run("Create organization", async (c) => {
    const org = await c.organizations.create({
      name: "Test Corp",
      slug: "test-corp",
      plan: "pro",
      metadata: { industry: "fintech" },
    });
    assert(org.id, "org should have an id");
    assert(org.name === "Test Corp", "org name should match");
    assert(org.plan === "pro", "org plan should be pro");
    orgId = org.id;
  });

  await h.run("Get organization", async (c) => {
    const org = await c.organizations.get(orgId);
    assert(org.id === orgId, "should return same org");
  });

  await h.run("Update organization (PATCH with partial body)", async (c) => {
    const org = await c.organizations.update(orgId, {
      name: "Test Corp Updated",
      metadata: { industry: "healthtech" },
    });
    assert(org.name === "Test Corp Updated", "name should be updated");
  });

  await h.run("List organizations (cursor pagination)", async (c) => {
    const page = await c.organizations.list({ limit: 5 });
    assert(Array.isArray(page.data), "data should be an array");
    assert(typeof page.has_more === "boolean", "has_more should be boolean");
  });

  await h.run("Auto-paginate organizations", async (c) => {
    if (!c.organizations.listAutoPaginate) {
      throw new Error("Auto-pagination not available — skipping");
    }
    const all = [];
    for await (const org of c.organizations.listAutoPaginate({ limit: 2 })) {
      all.push(org);
      if (all.length >= 5) break; // safety cap
    }
    assert(all.length > 0, "should get at least one org");
  });

  // -- 2. Members (nested resource + enum filter) --------------------------
  let memberId;

  await h.run("Invite member", async (c) => {
    const member = await c.organizations.members.create(orgId, {
      email: "alice@example.com",
      role: "admin",
    });
    assert(member.id, "member should have an id");
    assert(member.role === "admin", "role should be admin");
    memberId = member.id;
  });

  await h.run("List members with role filter", async (c) => {
    const page = await c.organizations.members.list(orgId, {
      role: "admin",
      limit: 10,
    });
    assert(Array.isArray(page.data), "should return paginated list");
  });

  // -- 3. Projects (nested CRUD) ------------------------------------------
  let projectId;

  await h.run("Create project", async (c) => {
    const project = await c.organizations.projects.create(orgId, {
      name: "Demand Forecasting",
      description: "Forecast product demand using historical sales data",
    });
    assert(project.id, "project should have an id");
    projectId = project.id;
  });

  await h.run("Get project", async (c) => {
    const project = await c.organizations.projects.get(orgId, projectId);
    assert(project.name === "Demand Forecasting", "name should match");
  });

  // -- 4. Datasets (file upload + multipart) -------------------------------
  let datasetId;

  await h.run("Upload dataset (multipart file)", async (c) => {
    // Create a fake CSV buffer
    const csvContent = "date,sales,price\n2024-01-01,100,9.99\n2024-01-02,150,9.99\n";
    const file = new Blob([csvContent], { type: "text/csv" });

    const dataset = await c.organizations.projects.datasets.upload(
      orgId,
      projectId,
      { name: "sales-data.csv", file }
    );
    assert(dataset.id, "dataset should have an id");
    assert(dataset.source.type === "file_upload", "source type should be file_upload");
    datasetId = dataset.id;
  });

  await h.run("Create dataset (API pull source — discriminated union)", async (c) => {
    const dataset = await c.organizations.projects.datasets.create(
      orgId,
      projectId,
      {
        name: "live-metrics",
        source: {
          type: "api_pull",
          source_url: "https://metrics.example.com/api/v1/data",
          schedule_cron: "0 */6 * * *",
          headers: { Authorization: "Bearer ext-token" },
        },
      }
    );
    assert(dataset.source.type === "api_pull", "source should be api_pull");
  });

  await h.run("List datasets with status filter", async (c) => {
    const page = await c.organizations.projects.datasets.list(
      orgId,
      projectId,
      { status: "ready", limit: 10 }
    );
    assert(Array.isArray(page.data), "should return data array");
  });

  await h.run("Download dataset (binary)", async (c) => {
    const data = await c.organizations.projects.datasets.download(
      orgId,
      projectId,
      datasetId
    );
    assert(data, "should return binary data");
  });

  // -- 5. Models (CRUD + discriminated union algorithms) -------------------
  let modelId;

  await h.run("Create model (ARIMA algorithm)", async (c) => {
    const model = await c.organizations.projects.models.create(
      orgId,
      projectId,
      {
        name: "ARIMA Baseline",
        algorithm: { type: "arima", order_p: 1, order_d: 1, order_q: 1, seasonal: true },
        dataset_id: datasetId,
        target_column: "sales",
        feature_columns: ["price"],
      }
    );
    assert(model.id, "model should have an id");
    assert(model.algorithm.type === "arima", "algorithm should be arima");
    modelId = model.id;
  });

  await h.run("Create model (neural algorithm — transformer)", async (c) => {
    const model = await c.organizations.projects.models.create(
      orgId,
      projectId,
      {
        name: "Transformer Model",
        algorithm: {
          type: "neural",
          architecture: "transformer",
          layers: 6,
          hidden_size: 256,
          dropout: 0.1,
        },
        dataset_id: datasetId,
        target_column: "sales",
        feature_columns: ["price"],
        hyperparameters: {
          learning_rate: 0.001,
          epochs: 100,
          batch_size: 32,
          early_stopping: true,
        },
      }
    );
    assert(model.algorithm.type === "neural", "algorithm should be neural");
    assert(model.algorithm.architecture === "transformer", "arch should be transformer");
  });

  await h.run("Create model (ensemble — recursive type)", async (c) => {
    const model = await c.organizations.projects.models.create(
      orgId,
      projectId,
      {
        name: "Ensemble Model",
        algorithm: {
          type: "ensemble",
          sub_algorithms: [
            { type: "arima", order_p: 2, order_d: 1, order_q: 0 },
            { type: "neural", architecture: "lstm", layers: 2, hidden_size: 128 },
          ],
          combination_method: "weighted",
        },
        dataset_id: datasetId,
        target_column: "sales",
        feature_columns: ["price"],
      }
    );
    assert(model.algorithm.type === "ensemble", "should be ensemble");
  });

  // -- 6. Training (async operation + polling) -----------------------------
  let operationId;

  await h.run("Train model (async — returns 202)", async (c) => {
    const op = await c.organizations.projects.models.train(
      orgId,
      projectId,
      modelId,
      { hyperparameters: { learning_rate: 0.01, epochs: 50 } }
    );
    assert(op.id, "operation should have an id");
    assert(
      ["pending", "running"].includes(op.status),
      `status should be pending or running, got: ${op.status}`
    );
    operationId = op.id;
  });

  await h.run("Poll operation status", async (c) => {
    const op = await c.operations.get(operationId);
    assert(op.id === operationId, "should return same operation");
    assert(op.status, "should have a status");
  });

  await h.run("Cancel operation", async (c) => {
    const op = await c.operations.cancel(operationId);
    assert(op.status === "cancelled", "status should be cancelled");
  });

  // -- 7. Predictions (JSON response) -------------------------------------

  await h.run("Create prediction (non-streaming)", async (c) => {
    const result = await c.organizations.projects.models.predict(
      orgId,
      projectId,
      modelId,
      {
        horizon: 10,
        confidence_intervals: [0.9, 0.95],
        streaming: false,
      }
    );
    assert(result.id, "prediction should have an id");
    assert(result.points.length === 10, "should have 10 forecast points");
    assert(result.points[0].value !== undefined, "point should have a value");
    assert(
      result.points[0].confidence_intervals?.length === 2,
      "should have 2 confidence intervals"
    );
  });

  // -- 8. Streaming predictions (SSE) -------------------------------------

  await h.run("Create prediction (streaming SSE)", async (c) => {
    if (!c.organizations.projects.models.predictStream) {
      throw new Error("Streaming not available — skipping");
    }
    const events = [];
    const stream = await c.organizations.projects.models.predictStream(
      orgId,
      projectId,
      modelId,
      {
        horizon: 5,
        confidence_intervals: [0.9],
        streaming: true,
      }
    );
    for await (const event of stream) {
      events.push(event);
    }
    const pointEvents = events.filter((e) => e.event === "point");
    const doneEvents = events.filter((e) => e.event === "done");
    assert(pointEvents.length > 0, "should have point events");
    assert(doneEvents.length === 1, "should have exactly one done event");
  });

  // -- 9. Batch predictions (allOf + oneOf in response) --------------------

  await h.run("Create batch prediction", async (c) => {
    const result = await c.organizations.projects.predictions.createBatch(
      orgId,
      projectId,
      {
        requests: [
          { model_id: modelId, horizon: 5 },
          { model_id: modelId, horizon: 3 },
        ],
      }
    );
    assert(result.id, "batch should have an id");
    assert(result.results.length === 2, "should have 2 results");
  });

  // -- 10. Alerts (discriminated unions x3) --------------------------------
  let alertId;

  await h.run("Create alert (threshold condition + email channel)", async (c) => {
    const alert = await c.organizations.projects.alerts.create(
      orgId,
      projectId,
      {
        name: "High Sales Alert",
        model_id: modelId,
        condition: {
          type: "threshold",
          metric: "predicted_sales",
          operator: "gt",
          value: 1000,
          duration_minutes: 30,
        },
        channels: [{ type: "email", address: "alerts@example.com" }],
      }
    );
    assert(alert.id, "alert should have an id");
    assert(alert.condition.type === "threshold", "condition should be threshold");
    alertId = alert.id;
  });

  await h.run("Create alert (anomaly condition + slack + webhook channels)", async (c) => {
    const alert = await c.organizations.projects.alerts.create(
      orgId,
      projectId,
      {
        name: "Anomaly Detector",
        model_id: modelId,
        condition: { type: "anomaly", sensitivity: 0.8 },
        channels: [
          {
            type: "slack",
            channel_id: "C12345",
            webhook_url: "https://hooks.slack.com/services/xxx",
          },
          {
            type: "webhook",
            url: "https://example.com/webhook",
            secret: "whsec_test",
          },
        ],
      }
    );
    assert(alert.condition.type === "anomaly", "condition should be anomaly");
    assert(alert.channels.length === 2, "should have 2 channels");
  });

  await h.run("Update alert (PATCH)", async (c) => {
    const alert = await c.organizations.projects.alerts.update(
      orgId,
      projectId,
      alertId,
      { enabled: false }
    );
    assert(alert.enabled === false, "should be disabled");
  });

  // -- 11. Alert history (offset pagination + date filtering) --------------

  await h.run("List alert history (offset pagination)", async (c) => {
    const page = await c.organizations.projects.alerts.listHistory(
      orgId,
      projectId,
      alertId,
      {
        offset: 0,
        limit: 10,
        since: "2024-01-01T00:00:00Z",
      }
    );
    assert(typeof page.total === "number", "should have total count");
    assert(typeof page.offset === "number", "should have offset");
    assert(Array.isArray(page.data), "should have data array");
  });

  // -- 12. Webhooks (different auth scheme — Bearer) -----------------------
  let webhookId;

  await h.run("Create webhook endpoint", async (c) => {
    const wh = await c.webhooks.create({
      url: "https://example.com/webhooks/chronocast",
      events: ["model.training.completed", "alert.triggered"],
    });
    assert(wh.id, "webhook should have an id");
    assert(wh.secret, "should include secret on creation");
    webhookId = wh.id;
  });

  await h.run("List webhook deliveries (cursor pagination)", async (c) => {
    const page = await c.webhooks.listDeliveries(webhookId, { limit: 5 });
    assert(Array.isArray(page.data), "should return paginated deliveries");
  });

  await h.run("Verify webhook signature", async (c) => {
    const result = await c.webhooks.verify(webhookId, {
      payload: '{"event":"model.training.completed"}',
      signature: "sha256=abc123",
      timestamp: new Date().toISOString(),
    });
    assert(typeof result.valid === "boolean", "should return valid boolean");
  });

  // -- 13. Idempotency key ------------------------------------------------

  await h.run("Idempotency key (duplicate request returns same result)", async (c) => {
    if (!c.organizations.create.withIdempotencyKey) {
      // Try header-based approach
      const idempotencyKey = "idem-" + Math.random().toString(36).slice(2);
      const org1 = await c.organizations.create(
        { name: "Idempotent Org", slug: "idempotent-org" },
        { headers: { "Idempotency-Key": idempotencyKey } }
      );
      const org2 = await c.organizations.create(
        { name: "Idempotent Org", slug: "idempotent-org" },
        { headers: { "Idempotency-Key": idempotencyKey } }
      );
      assert(org1.id === org2.id, "same idempotency key should return same result");
      return;
    }
    throw new Error("Test needs SDK-specific adapter implementation");
  });

  // -- 14. Error handling -------------------------------------------------

  await h.run("404 error is typed", async (c) => {
    try {
      await c.organizations.get("00000000-0000-0000-0000-000000000000");
      throw new Error("Should have thrown");
    } catch (err) {
      assert(err.status === 404 || err.statusCode === 404, "should be 404");
      assert(err.body?.type === "not_found" || err.error?.type === "not_found",
        "error type should be not_found");
    }
  });

  await h.run("400 error includes field-level validation details", async (c) => {
    try {
      await c.organizations.create({ name: "", slug: "" });
      throw new Error("Should have thrown");
    } catch (err) {
      assert(err.status === 400 || err.statusCode === 400, "should be 400");
      const details = err.body?.details || err.error?.details;
      assert(Array.isArray(details), "should have field-level details");
      assert(details.length > 0, "should have at least one field error");
    }
  });

  // -- 15. Cleanup -------------------------------------------------------

  await h.run("Delete organization", async (c) => {
    await c.organizations.delete(orgId);
    // Verify it's gone
    try {
      await c.organizations.get(orgId);
      throw new Error("Should have thrown 404");
    } catch (err) {
      assert(err.status === 404 || err.statusCode === 404, "should be 404 after delete");
    }
  });
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function assert(condition, message) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const target = process.argv[2];
const valid = ["stainless", "fern", "speakeasy", "raw-fetch", "all"];
if (!target || !valid.includes(target)) {
  console.error("Usage: node test-runner.js stainless|fern|speakeasy|raw-fetch|all");
  process.exit(1);
}

const platforms = target === "all" ? ["stainless", "fern", "speakeasy"] : [target];
const summaries = [];

for (const platform of platforms) {
  const harness = new TestHarness(platform);
  try {
    await harness.loadAdapter();
  } catch (err) {
    console.log(
      chalk.yellow(`\nSkipping ${platform}: adapter not found (${err.message})`)
    );
    continue;
  }
  await runSuite(harness);
  summaries.push(harness.summary());
}

if (summaries.length > 1) {
  console.log(chalk.bold.underline("\n\nFinal Summary\n"));
  for (const s of summaries) {
    const pct = ((s.pass / s.total) * 100).toFixed(0);
    const color = s.fail === 0 ? chalk.green : chalk.yellow;
    console.log(color(`  ${s.platform.padEnd(12)} ${s.pass}/${s.total} (${pct}%)`));
  }
}

console.log();
process.exit(summaries.some((s) => s.fail > 0) ? 1 : 0);
