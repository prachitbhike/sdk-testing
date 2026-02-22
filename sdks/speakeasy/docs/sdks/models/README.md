# Models

## Overview

Create, train, and manage forecast models

### Available Operations

* [listModels](#listmodels) - List forecast models
* [createModel](#createmodel) - Create a forecast model
* [getModel](#getmodel) - Retrieve a forecast model
* [deleteModel](#deletemodel) - Delete a forecast model
* [trainModel](#trainmodel) - Start model training (async, returns operation to poll)

## listModels

List forecast models

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listModels" method="get" path="/organizations/{org_id}/projects/{project_id}/models" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.models.listModels({
    orgId: "91889c13-0041-420a-9a96-f0d79c3c9ef4",
    projectId: "99654536-80fa-4d36-b6f4-203fd6b3c1b4",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { modelsListModels } from "openapi/funcs/models-list-models.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await modelsListModels(sdk, {
    orgId: "91889c13-0041-420a-9a96-f0d79c3c9ef4",
    projectId: "99654536-80fa-4d36-b6f4-203fd6b3c1b4",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsListModels failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListModelsRequest](../../models/operations/list-models-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListModelsResponse](../../models/operations/list-models-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createModel

Create a forecast model

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createModel" method="post" path="/organizations/{org_id}/projects/{project_id}/models" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.models.createModel({
    orgId: "7c28f06c-fa36-4d9a-bc2e-cb580a37f427",
    projectId: "39886326-36a8-40fe-9e41-51d799a69a54",
    body: {
      name: "<value>",
      algorithm: {
        type: "arima",
        orderP: 465590,
        orderD: 838616,
        orderQ: 368584,
        seasonal: false,
      },
      datasetId: "d21129d5-5102-4092-a2b1-47d16b0ac09f",
      targetColumn: "<value>",
      featureColumns: [],
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
import { modelsCreateModel } from "openapi/funcs/models-create-model.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await modelsCreateModel(sdk, {
    orgId: "7c28f06c-fa36-4d9a-bc2e-cb580a37f427",
    projectId: "39886326-36a8-40fe-9e41-51d799a69a54",
    body: {
      name: "<value>",
      algorithm: {
        type: "arima",
        orderP: 465590,
        orderD: 838616,
        orderQ: 368584,
        seasonal: false,
      },
      datasetId: "d21129d5-5102-4092-a2b1-47d16b0ac09f",
      targetColumn: "<value>",
      featureColumns: [],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsCreateModel failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateModelRequest](../../models/operations/create-model-request.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.CreateModelResponse](../../models/operations/create-model-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 400                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getModel

Retrieve a forecast model

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getModel" method="get" path="/organizations/{org_id}/projects/{project_id}/models/{model_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.models.getModel({
    orgId: "59b9bf37-a1f1-440d-9052-258b9311484e",
    projectId: "997301d8-a372-4a74-b3ae-ba232ed500f7",
    modelId: "c4fd7309-e4a6-4d6d-863d-0d46e7cba895",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { modelsGetModel } from "openapi/funcs/models-get-model.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await modelsGetModel(sdk, {
    orgId: "59b9bf37-a1f1-440d-9052-258b9311484e",
    projectId: "997301d8-a372-4a74-b3ae-ba232ed500f7",
    modelId: "c4fd7309-e4a6-4d6d-863d-0d46e7cba895",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsGetModel failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetModelRequest](../../models/operations/get-model-request.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetModelResponse](../../models/operations/get-model-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 404                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## deleteModel

Delete a forecast model

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteModel" method="delete" path="/organizations/{org_id}/projects/{project_id}/models/{model_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  await sdk.models.deleteModel({
    orgId: "35e383c4-ce85-4420-a043-0f85eba7bafa",
    projectId: "dd251a58-7d4f-4120-9a1f-15b17aff3e36",
    modelId: "755a6107-cd1c-46ac-8b3d-b94b9e460eca",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { modelsDeleteModel } from "openapi/funcs/models-delete-model.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await modelsDeleteModel(sdk, {
    orgId: "35e383c4-ce85-4420-a043-0f85eba7bafa",
    projectId: "dd251a58-7d4f-4120-9a1f-15b17aff3e36",
    modelId: "755a6107-cd1c-46ac-8b3d-b94b9e460eca",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("modelsDeleteModel failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteModelRequest](../../models/operations/delete-model-request.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## trainModel

Start model training (async, returns operation to poll)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="trainModel" method="post" path="/organizations/{org_id}/projects/{project_id}/models/{model_id}/train" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.models.trainModel({
    orgId: "911bea98-86c0-4283-8659-273fc8a6bc28",
    projectId: "1f0b1c80-a7b7-4576-9131-848a9be7e908",
    modelId: "906c1236-d81a-45ea-907b-7ce6293dabc4",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { modelsTrainModel } from "openapi/funcs/models-train-model.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await modelsTrainModel(sdk, {
    orgId: "911bea98-86c0-4283-8659-273fc8a6bc28",
    projectId: "1f0b1c80-a7b7-4576-9131-848a9be7e908",
    modelId: "906c1236-d81a-45ea-907b-7ce6293dabc4",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("modelsTrainModel failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.TrainModelRequest](../../models/operations/train-model-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.TrainModelResponse](../../models/operations/train-model-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 400, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |