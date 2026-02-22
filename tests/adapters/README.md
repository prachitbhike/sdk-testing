# SDK Adapters

Each adapter wraps a generated SDK to expose a uniform interface for the test runner.

After generating an SDK with each platform, create an adapter file that maps
the SDK's API to the common interface below.

## Required Interface

```js
export function createClient({ baseUrl, apiKey }) {
  return {
    organizations: {
      create(body, opts?) → Organization
      get(orgId) → Organization
      update(orgId, body) → Organization
      delete(orgId) → void
      list(params?) → CursorPage<Organization>
      listAutoPaginate?(params?) → AsyncIterable<Organization>

      members: {
        create(orgId, body) → Member
        list(orgId, params?) → CursorPage<Member>
      },

      projects: {
        create(orgId, body) → Project
        get(orgId, projectId) → Project
        delete(orgId, projectId) → void
        list(orgId, params?) → CursorPage<Project>

        datasets: {
          create(orgId, projectId, body) → Dataset
          upload(orgId, projectId, { name, file }) → Dataset
          list(orgId, projectId, params?) → CursorPage<Dataset>
          get(orgId, projectId, datasetId) → Dataset
          download(orgId, projectId, datasetId) → Buffer/Blob
          delete(orgId, projectId, datasetId) → void
        },

        models: {
          create(orgId, projectId, body) → ForecastModel
          get(orgId, projectId, modelId) → ForecastModel
          delete(orgId, projectId, modelId) → void
          list(orgId, projectId, params?) → CursorPage<ForecastModel>
          train(orgId, projectId, modelId, body?) → AsyncOperation
          predict(orgId, projectId, modelId, body) → PredictionResult
          predictStream?(orgId, projectId, modelId, body) → AsyncIterable<StreamEvent>
        },

        alerts: {
          create(orgId, projectId, body) → Alert
          get(orgId, projectId, alertId) → Alert
          update(orgId, projectId, alertId, body) → Alert
          delete(orgId, projectId, alertId) → void
          list(orgId, projectId, params?) → CursorPage<Alert>
          listHistory(orgId, projectId, alertId, params?) → OffsetPage<AlertEvent>
        },

        predictions: {
          createBatch(orgId, projectId, body) → BatchPredictionResponse
        },
      },
    },

    operations: {
      get(operationId) → AsyncOperation
      cancel(operationId) → AsyncOperation
    },

    webhooks: {
      create(body) → WebhookEndpoint
      get(webhookId) → WebhookEndpoint
      delete(webhookId) → void
      list(params?) → CursorPage<WebhookEndpoint>
      listDeliveries(webhookId, params?) → CursorPage<WebhookDelivery>
      verify(webhookId, body) → { valid: boolean, reason?: string }
    },
  };
}
```
