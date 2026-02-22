# Predictions

## Overview

Run predictions and streaming forecasts

### Available Operations

* [createPrediction](#createprediction) - Run a prediction (optionally streaming via SSE)
* [createBatchPrediction](#createbatchprediction) - Run predictions across multiple models in a single request

## createPrediction

Run a prediction (optionally streaming via SSE)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createPrediction" method="post" path="/organizations/{org_id}/projects/{project_id}/models/{model_id}/predict" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.predictions.createPrediction({
    orgId: "63d5f380-16b4-44a4-8536-61de53ab8049",
    projectId: "2fa48519-7c03-45b9-9975-a20c8eb661f5",
    modelId: "55c70749-3d41-442e-aa1a-755fb1c75d23",
    body: {
      horizon: 315559,
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { predictionsCreatePrediction } from "openapi/funcs/predictions-create-prediction.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await predictionsCreatePrediction(sdk, {
    orgId: "63d5f380-16b4-44a4-8536-61de53ab8049",
    projectId: "2fa48519-7c03-45b9-9975-a20c8eb661f5",
    modelId: "55c70749-3d41-442e-aa1a-755fb1c75d23",
    body: {
      horizon: 315559,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("predictionsCreatePrediction failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreatePredictionRequest](../../models/operations/create-prediction-request.md)                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreatePredictionResponse](../../models/operations/create-prediction-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 400, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createBatchPrediction

Run predictions across multiple models in a single request

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createBatchPrediction" method="post" path="/organizations/{org_id}/projects/{project_id}/predictions/batch" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.predictions.createBatchPrediction({
    orgId: "39ea37a5-8a22-4ef2-b355-03c856c83253",
    projectId: "e74d70c6-6991-4730-b18a-f43bdfa20677",
    body: {
      requests: [
        {
          modelId: "28375707-f657-4133-91d0-315005fe5959",
          horizon: 373576,
        },
      ],
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { predictionsCreateBatchPrediction } from "openapi/funcs/predictions-create-batch-prediction.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await predictionsCreateBatchPrediction(sdk, {
    orgId: "39ea37a5-8a22-4ef2-b355-03c856c83253",
    projectId: "e74d70c6-6991-4730-b18a-f43bdfa20677",
    body: {
      requests: [
        {
          modelId: "28375707-f657-4133-91d0-315005fe5959",
          horizon: 373576,
        },
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("predictionsCreateBatchPrediction failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateBatchPredictionRequest](../../models/operations/create-batch-prediction-request.md)                                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.BatchPredictionResponse](../../models/batch-prediction-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |