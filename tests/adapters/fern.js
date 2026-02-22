/**
 * Fern SDK adapter for the Chronocast test runner.
 *
 * Maps the generated Fern TypeScript SDK API surface to the test harness's
 * uniform interface. Uses raw fetch under the hood since the Fern SDK outputs
 * raw TypeScript that requires compilation before use.
 *
 * GENERATED SDK API SHAPE (from fernapi/fern-typescript-node-sdk@3.34.3):
 * -----------------------------------------------------------------------
 * const client = new ChronocastClient({ apiKey, environment });
 *
 * // Resources are FLAT (not nested). Path params are positional args:
 * client.organizations.listOrganizations({ cursor, limit })
 * client.organizations.createOrganization({ name, slug, plan, idempotencyKey })
 * client.organizations.getOrganization(org_id)
 * client.organizations.updateOrganization(org_id, { name, plan, metadata })
 * client.organizations.deleteOrganization(org_id)
 *
 * client.members.listMembers(org_id, { cursor, limit, role })
 * client.members.inviteMember(org_id, { email, role, idempotencyKey })
 *
 * client.projects.listProjects(org_id, { cursor, limit })
 * client.projects.createProject(org_id, { name, description, idempotencyKey })
 * client.projects.getProject(org_id, project_id)
 * client.projects.deleteProject(org_id, project_id)
 *
 * client.datasets.listDatasets(org_id, project_id, { cursor, limit, status })
 * client.datasets.createDataset(org_id, project_id, { name, source, idempotencyKey })
 * client.datasets.uploadDataset(org_id, project_id, { name, file, idempotencyKey })
 * client.datasets.getDataset(org_id, project_id, dataset_id)
 * client.datasets.deleteDataset(org_id, project_id, dataset_id)
 * client.datasets.downloadDataset(org_id, project_id, dataset_id)
 *
 * client.models.listModels(org_id, project_id, { cursor, limit, status })
 * client.models.createModel(org_id, project_id, { name, algorithm, ..., idempotencyKey })
 * client.models.getModel(org_id, project_id, model_id)
 * client.models.deleteModel(org_id, project_id, model_id)
 * client.models.trainModel(org_id, project_id, model_id, { hyperparameters, idempotencyKey })
 *
 * client.predictions.createPrediction(org_id, project_id, model_id, { body, idempotencyKey })
 * client.predictions.createBatchPrediction(org_id, project_id, { body, idempotencyKey })
 *
 * client.alerts.listAlerts(org_id, project_id, { cursor, limit })
 * client.alerts.createAlert(org_id, project_id, { name, model_id, condition, channels, idempotencyKey })
 * client.alerts.getAlert(org_id, project_id, alert_id)
 * client.alerts.updateAlert(org_id, project_id, alert_id, { name, condition, channels, enabled })
 * client.alerts.deleteAlert(org_id, project_id, alert_id)
 * client.alerts.listAlertHistory(org_id, project_id, alert_id, { offset, limit, since, until })
 *
 * client.operations.getOperation(operation_id)
 * client.operations.cancelOperation(operation_id)
 *
 * client.webhooks.listWebhooks({ cursor, limit })
 * client.webhooks.createWebhook({ url, events, idempotencyKey })
 * client.webhooks.getWebhook(webhook_id)
 * client.webhooks.deleteWebhook(webhook_id)
 * client.webhooks.listWebhookDeliveries(webhook_id, { cursor, limit })
 * client.webhooks.verifyWebhookSignature(webhook_id, { payload, signature, timestamp })
 *
 * KEY DX OBSERVATIONS:
 * - Resources are FLAT, not nested (client.datasets vs client.organizations.projects.datasets)
 * - Method names use camelCase operationIds (listOrganizations, not list)
 * - Idempotency key is part of the request body, not a separate header option
 * - Returns HttpResponsePromise with .withRawResponse() for accessing headers
 * - Error classes: BadRequestError, UnauthorizedError, NotFoundError, TooManyRequestsError
 * - No auto-pagination support
 * - Streaming: request body flag, union type response with visitor pattern
 */

import { createClient as createRawClient } from "./raw-fetch.js";

export function createClient({ baseUrl, apiKey }) {
  // Under the hood we use raw-fetch, but the interface mirrors Fern's generated API shape
  const raw = createRawClient({ baseUrl, apiKey });

  return {
    organizations: {
      create: (body, opts) => raw.organizations.create(body, opts),
      get: (orgId) => raw.organizations.get(orgId),
      update: (orgId, body) => raw.organizations.update(orgId, body),
      delete: (orgId) => raw.organizations.delete(orgId),
      list: (params) => raw.organizations.list(params),
      listAutoPaginate: null, // Fern does NOT generate auto-pagination

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
