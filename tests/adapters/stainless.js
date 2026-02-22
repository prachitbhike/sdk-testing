/**
 * Stainless SDK adapter for the Chronocast test runner.
 *
 * Uses the actual generated Stainless TypeScript SDK (package: chronocast).
 *
 * GENERATED SDK API SHAPE (from Stainless, project chronocast-eval):
 * -----------------------------------------------------------------------
 * import Wndrco from 'chronocast';
 *
 * const client = new Wndrco({
 *   apiKey: "...",
 *   environment: "local_development"    // http://localhost:3737/v1
 * });
 *
 * // Resources are NESTED (Stainless signature pattern):
 * client.organizations.create({ name, slug, plan })
 * client.organizations.retrieve(orgId)
 * client.organizations.update(orgId, { name })
 * client.organizations.delete(orgId)
 * client.organizations.list({ limit, cursor })
 *
 * client.organizations.members.invite(orgId, { email, role })
 * client.organizations.members.list(orgId, { role })
 *
 * client.organizations.projects.create(orgId, { name, description })
 * client.organizations.projects.retrieve(orgId, projectId)
 * client.organizations.projects.delete(orgId, projectId)
 * client.organizations.projects.list(orgId, { limit })
 *
 * client.organizations.projects.datasets.create(orgId, projectId, { name, source })
 * client.organizations.projects.datasets.upload(orgId, projectId, { name, file })
 * client.organizations.projects.datasets.retrieve(orgId, projectId, datasetId)
 * client.organizations.projects.datasets.download(orgId, projectId, datasetId)
 * client.organizations.projects.datasets.delete(orgId, projectId, datasetId)
 * client.organizations.projects.datasets.list(orgId, projectId, { limit })
 *
 * client.organizations.projects.models.create(orgId, projectId, { name, algorithm, ... })
 * client.organizations.projects.models.retrieve(orgId, projectId, modelId)
 * client.organizations.projects.models.delete(orgId, projectId, modelId)
 * client.organizations.projects.models.list(orgId, projectId, { limit })
 * client.organizations.projects.models.train(orgId, projectId, modelId, { hyperparameters })
 *
 * client.organizations.projects.models.predictions.create(orgId, projectId, modelId, { horizon, streaming })
 * client.organizations.projects.predictions.createBatch(orgId, projectId, { requests })
 *
 * client.organizations.projects.alerts.create(orgId, projectId, { name, model_id, condition, channels })
 * client.organizations.projects.alerts.retrieve(orgId, projectId, alertId)
 * client.organizations.projects.alerts.update(orgId, projectId, alertId, { name, ... })
 * client.organizations.projects.alerts.delete(orgId, projectId, alertId)
 * client.organizations.projects.alerts.list(orgId, projectId, { limit })
 * client.organizations.projects.alerts.listHistory(orgId, projectId, alertId, { limit, offset })
 *
 * client.operations.retrieve(operationId)
 * client.operations.cancel(operationId)
 *
 * client.webhooks.create({ url, events })
 * client.webhooks.retrieve(webhookId)
 * client.webhooks.delete(webhookId)
 * client.webhooks.list({ limit })
 * client.webhooks.listDeliveries(webhookId, { limit })
 * client.webhooks.verifySignature(webhookId, { payload, signature, timestamp })
 *
 * KEY DX FEATURES:
 * - Resources are NESTED (client.organizations.projects.datasets)
 * - Methods: create, retrieve, update, delete, list (standard CRUD)
 * - Path params are positional, body/query last
 * - Idempotency key via requestOptions: { idempotencyKey: "..." }
 * - File upload via multipart (accepts File, ReadStream, Blob)
 * - File download returns raw Response
 * - Auto-pagination: for await (const item of client.organizations.list()) {}
 * - Typed errors: Wndrco.NotFoundError, .BadRequestError, .RateLimitError, etc.
 * - APIPromise with .withResponse() for header access
 */

import Wndrco from "chronocast";

export function createClient({ baseUrl, apiKey }) {
  const client = new Wndrco({
    apiKey,
    baseURL: baseUrl,
  });

  return {
    organizations: {
      create: (body, opts) => {
        // Extract idempotency key from either requestOptions or headers
        const idempotencyKey =
          opts?.idempotencyKey || opts?.headers?.["Idempotency-Key"];
        const requestOpts = idempotencyKey ? { idempotencyKey } : undefined;
        return client.organizations.create(body, requestOpts);
      },
      get: (orgId) => client.organizations.retrieve(orgId),
      update: (orgId, body) => client.organizations.update(orgId, body),
      delete: (orgId) => client.organizations.delete(orgId),
      list: (params) => client.organizations.list(params || {}),
      listAutoPaginate: async function* (params) {
        const page = await client.organizations.list(params || {});
        // Stainless list() returns a page object with data, has_more, next_cursor
        // For auto-pagination, we yield items from each page
        if (page && page.data) {
          for (const item of page.data) {
            yield item;
          }
          // Follow pagination if there are more pages
          if (page.has_more && page.next_cursor) {
            yield* this.listAutoPaginate({
              ...(params || {}),
              cursor: page.next_cursor,
            });
          }
        }
      },

      members: {
        create: (orgId, body) => client.organizations.members.invite(orgId, body),
        list: (orgId, params) =>
          client.organizations.members.list(orgId, params || {}),
      },

      projects: {
        create: (orgId, body) =>
          client.organizations.projects.create(orgId, body),
        get: (orgId, projectId) =>
          client.organizations.projects.retrieve(orgId, projectId),
        delete: (orgId, projectId) =>
          client.organizations.projects.delete(orgId, projectId),
        list: (orgId, params) =>
          client.organizations.projects.list(orgId, params || {}),

        datasets: {
          create: (orgId, projectId, body) =>
            client.organizations.projects.datasets.create(
              orgId,
              projectId,
              body
            ),
          upload: (orgId, projectId, body) =>
            client.organizations.projects.datasets.upload(
              orgId,
              projectId,
              body
            ),
          list: (orgId, projectId, params) =>
            client.organizations.projects.datasets.list(
              orgId,
              projectId,
              params || {}
            ),
          get: (orgId, projectId, datasetId) =>
            client.organizations.projects.datasets.retrieve(
              orgId,
              projectId,
              datasetId
            ),
          download: async (orgId, projectId, datasetId) => {
            const response =
              await client.organizations.projects.datasets.download(
                orgId,
                projectId,
                datasetId
              );
            // Stainless returns a raw Response for binary downloads
            // The test runner expects { buffer, contentType }
            const buffer = Buffer.from(await response.arrayBuffer());
            return {
              buffer,
              contentType:
                response.headers.get("content-type") ||
                "application/octet-stream",
            };
          },
          delete: (orgId, projectId, datasetId) =>
            client.organizations.projects.datasets.delete(
              orgId,
              projectId,
              datasetId
            ),
        },

        models: {
          create: (orgId, projectId, body) =>
            client.organizations.projects.models.create(
              orgId,
              projectId,
              body
            ),
          get: (orgId, projectId, modelId) =>
            client.organizations.projects.models.retrieve(
              orgId,
              projectId,
              modelId
            ),
          delete: (orgId, projectId, modelId) =>
            client.organizations.projects.models.delete(
              orgId,
              projectId,
              modelId
            ),
          list: (orgId, projectId, params) =>
            client.organizations.projects.models.list(
              orgId,
              projectId,
              params || {}
            ),
          train: (orgId, projectId, modelId, body) =>
            client.organizations.projects.models.train(
              orgId,
              projectId,
              modelId,
              body || {}
            ),
          predict: (orgId, projectId, modelId, body) =>
            client.organizations.projects.models.predictions.create(
              orgId,
              projectId,
              modelId,
              body
            ),
          predictStream: (orgId, projectId, modelId, body) => {
            // The Stainless SDK doesn't expose SSE streaming directly,
            // so we use raw fetch for the SSE event stream
            const path = `organizations/${orgId}/projects/${projectId}/models/${modelId}/predict`;
            const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : baseUrl + "/");
            return fetch(url.toString(), {
              method: "POST",
              headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
                Accept: "text/event-stream",
              },
              body: JSON.stringify({ ...body, streaming: true }),
            }).then(async function* (res) {
              if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                throw new Error(errBody.message || `HTTP ${res.status}`);
              }
              const text = await res.text();
              for (const block of text.split("\n\n")) {
                const trimmed = block.trim();
                if (!trimmed) continue;
                const lines = trimmed.split("\n");
                const event = {};
                for (const line of lines) {
                  if (line.startsWith("event:")) event.event = line.slice(6).trim();
                  else if (line.startsWith("data:")) {
                    try {
                      event.data = JSON.parse(line.slice(5).trim());
                    } catch {
                      event.data = line.slice(5).trim();
                    }
                  }
                }
                if (event.event) yield event;
              }
            });
          },
        },

        alerts: {
          create: (orgId, projectId, body) =>
            client.organizations.projects.alerts.create(
              orgId,
              projectId,
              body
            ),
          get: (orgId, projectId, alertId) =>
            client.organizations.projects.alerts.retrieve(
              orgId,
              projectId,
              alertId
            ),
          update: (orgId, projectId, alertId, body) =>
            client.organizations.projects.alerts.update(
              orgId,
              projectId,
              alertId,
              body
            ),
          delete: (orgId, projectId, alertId) =>
            client.organizations.projects.alerts.delete(
              orgId,
              projectId,
              alertId
            ),
          list: (orgId, projectId, params) =>
            client.organizations.projects.alerts.list(
              orgId,
              projectId,
              params || {}
            ),
          listHistory: (orgId, projectId, alertId, params) =>
            client.organizations.projects.alerts.listHistory(
              orgId,
              projectId,
              alertId,
              params || {}
            ),
        },

        predictions: {
          createBatch: (orgId, projectId, body) =>
            client.organizations.projects.predictions.createBatch(
              orgId,
              projectId,
              body
            ),
        },
      },
    },

    operations: {
      get: (id) => client.operations.retrieve(id),
      cancel: (id) => client.operations.cancel(id),
    },

    webhooks: {
      create: (body) => client.webhooks.create(body),
      get: (id) => client.webhooks.retrieve(id),
      delete: (id) => client.webhooks.delete(id),
      list: (params) => client.webhooks.list(params || {}),
      listDeliveries: (id, params) =>
        client.webhooks.listDeliveries(id, params || {}),
      verify: (id, body) => client.webhooks.verifySignature(id, body),
    },
  };
}
