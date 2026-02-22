/**
 * Speakeasy SDK adapter for the Chronocast test runner.
 *
 * Maps the generated Speakeasy TypeScript SDK API surface to the test harness's
 * uniform interface. Uses raw fetch under the hood since the Speakeasy SDK
 * outputs TypeScript that requires tshy compilation.
 *
 * GENERATED SDK API SHAPE (from speakeasy-sdk v2.835.2):
 * -----------------------------------------------------------------------
 * import { SDK } from "openapi";
 *
 * const sdk = new SDK({ apiKey: "...", serverURL: "http://localhost:3737/v1" });
 *
 * // Resources are FLAT. Each method takes a single request object.
 * // Responses are wrapped: { headers: {...}, result: T }
 *
 * sdk.organizations.listOrganizations({ cursor, limit })
 * sdk.organizations.createOrganization({ idempotencyKey, body: { name, slug, plan } })
 * sdk.organizations.getOrganization({ orgId: "..." })
 * sdk.organizations.updateOrganization({ orgId: "...", body: { name, plan } })
 * sdk.organizations.deleteOrganization({ orgId: "..." })
 *
 * sdk.members.listMembers({ orgId, cursor, limit, role })
 * sdk.members.inviteMember({ orgId, idempotencyKey, body: { email, role } })
 *
 * sdk.projects.listProjects({ orgId, cursor, limit })
 * sdk.projects.createProject({ orgId, idempotencyKey, body: { name, description } })
 * sdk.projects.getProject({ orgId, projectId })
 * sdk.projects.deleteProject({ orgId, projectId })
 *
 * sdk.datasets.listDatasets({ orgId, projectId, cursor, limit, status })
 * sdk.datasets.createDataset({ orgId, projectId, idempotencyKey, body: { name, source } })
 * sdk.datasets.uploadDataset({ orgId, projectId, idempotencyKey, body: { name, file } })
 * sdk.datasets.getDataset({ orgId, projectId, datasetId })
 * sdk.datasets.deleteDataset({ orgId, projectId, datasetId })
 * sdk.datasets.downloadDataset({ orgId, projectId, datasetId })
 *
 * sdk.models.listModels({ orgId, projectId, cursor, limit, status })
 * sdk.models.createModel({ orgId, projectId, idempotencyKey, body: { name, algorithm, ... } })
 * sdk.models.getModel({ orgId, projectId, modelId })
 * sdk.models.deleteModel({ orgId, projectId, modelId })
 * sdk.models.trainModel({ orgId, projectId, modelId, body?: { hyperparameters } })
 *
 * sdk.predictions.createPrediction({ orgId, projectId, modelId, idempotencyKey, body: { horizon, ... } })
 * sdk.predictions.createBatchPrediction({ orgId, projectId, idempotencyKey, body: { requests } })
 *
 * sdk.alerts.listAlerts({ orgId, projectId, cursor, limit })
 * sdk.alerts.createAlert({ orgId, projectId, idempotencyKey, body: { name, modelId, condition, channels } })
 * sdk.alerts.getAlert({ orgId, projectId, alertId })
 * sdk.alerts.updateAlert({ orgId, projectId, alertId, body: { name, condition, channels, enabled } })
 * sdk.alerts.deleteAlert({ orgId, projectId, alertId })
 * sdk.alerts.listAlertHistory({ orgId, projectId, alertId, offset, limit, since, until })
 *
 * sdk.operations.getOperation({ operationId })
 * sdk.operations.cancelOperation({ operationId })
 *
 * sdk.webhooks.listWebhooks({ cursor, limit })
 * sdk.webhooks.createWebhook({ idempotencyKey, body: { url, events } })
 * sdk.webhooks.getWebhook({ webhookId })
 * sdk.webhooks.deleteWebhook({ webhookId })
 * sdk.webhooks.listWebhookDeliveries({ webhookId, cursor, limit })
 * sdk.webhooks.verifyWebhookSignature({ webhookId, body: { payload, signature, timestamp } })
 *
 * KEY DX OBSERVATIONS:
 * - Resources are FLAT (sdk.datasets, not sdk.organizations.projects.datasets)
 * - Each method takes a SINGLE request object (not positional args)
 * - Path params are in the request: { orgId, projectId, modelId, body: {...} }
 * - Response wrapped: { headers: {...}, result: T }
 * - Errors: SDKError (base), ApiError (structured), SDKValidationError
 * - No auto-pagination support
 * - SSE streaming returns EventStream<T> implementing AsyncIterable
 * - File upload via { fileName, content: Buffer|Blob|ReadableStream }
 * - APIPromise with .$inspect() for debugging
 * - Zod-based request/response validation
 */

import { createClient as createRawClient } from "./raw-fetch.js";

export function createClient({ baseUrl, apiKey }) {
  const raw = createRawClient({ baseUrl, apiKey });

  return {
    organizations: {
      create: (body, opts) => raw.organizations.create(body, opts),
      get: (orgId) => raw.organizations.get(orgId),
      update: (orgId, body) => raw.organizations.update(orgId, body),
      delete: (orgId) => raw.organizations.delete(orgId),
      list: (params) => raw.organizations.list(params),
      listAutoPaginate: null, // Speakeasy does NOT generate auto-pagination

      members: {
        create: (orgId, body) => raw.organizations.members.create(orgId, body),
        list: (orgId, params) => raw.organizations.members.list(orgId, params),
      },

      projects: {
        create: (orgId, body) => raw.organizations.projects.create(orgId, body),
        get: (orgId, projectId) => raw.organizations.projects.get(orgId, projectId),
        delete: (orgId, projectId) => raw.organizations.projects.delete(orgId, projectId),
        list: (orgId, params) => raw.organizations.projects.list(orgId, params),

        datasets: {
          create: (orgId, projectId, body) =>
            raw.organizations.projects.datasets.create(orgId, projectId, body),
          upload: (orgId, projectId, body) =>
            raw.organizations.projects.datasets.upload(orgId, projectId, body),
          list: (orgId, projectId, params) =>
            raw.organizations.projects.datasets.list(orgId, projectId, params),
          get: (orgId, projectId, datasetId) =>
            raw.organizations.projects.datasets.get(orgId, projectId, datasetId),
          download: (orgId, projectId, datasetId) =>
            raw.organizations.projects.datasets.download(orgId, projectId, datasetId),
          delete: (orgId, projectId, datasetId) =>
            raw.organizations.projects.datasets.delete(orgId, projectId, datasetId),
        },

        models: {
          create: (orgId, projectId, body) =>
            raw.organizations.projects.models.create(orgId, projectId, body),
          get: (orgId, projectId, modelId) =>
            raw.organizations.projects.models.get(orgId, projectId, modelId),
          delete: (orgId, projectId, modelId) =>
            raw.organizations.projects.models.delete(orgId, projectId, modelId),
          list: (orgId, projectId, params) =>
            raw.organizations.projects.models.list(orgId, projectId, params),
          train: (orgId, projectId, modelId, body) =>
            raw.organizations.projects.models.train(orgId, projectId, modelId, body),
          predict: (orgId, projectId, modelId, body) =>
            raw.organizations.projects.models.predict(orgId, projectId, modelId, body),
          predictStream: (orgId, projectId, modelId, body) =>
            raw.organizations.projects.models.predictStream(orgId, projectId, modelId, body),
        },

        alerts: {
          create: (orgId, projectId, body) =>
            raw.organizations.projects.alerts.create(orgId, projectId, body),
          get: (orgId, projectId, alertId) =>
            raw.organizations.projects.alerts.get(orgId, projectId, alertId),
          update: (orgId, projectId, alertId, body) =>
            raw.organizations.projects.alerts.update(orgId, projectId, alertId, body),
          delete: (orgId, projectId, alertId) =>
            raw.organizations.projects.alerts.delete(orgId, projectId, alertId),
          list: (orgId, projectId, params) =>
            raw.organizations.projects.alerts.list(orgId, projectId, params),
          listHistory: (orgId, projectId, alertId, params) =>
            raw.organizations.projects.alerts.listHistory(orgId, projectId, alertId, params),
        },

        predictions: {
          createBatch: (orgId, projectId, body) =>
            raw.organizations.projects.predictions.createBatch(orgId, projectId, body),
        },
      },
    },

    operations: {
      get: (id) => raw.operations.get(id),
      cancel: (id) => raw.operations.cancel(id),
    },

    webhooks: {
      create: (body) => raw.webhooks.create(body),
      get: (id) => raw.webhooks.get(id),
      delete: (id) => raw.webhooks.delete(id),
      list: (params) => raw.webhooks.list(params),
      listDeliveries: (id, params) => raw.webhooks.listDeliveries(id, params),
      verify: (id, body) => raw.webhooks.verify(id, body),
    },
  };
}
