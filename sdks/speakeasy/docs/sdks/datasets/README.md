# Datasets

## Overview

Upload and manage time-series datasets

### Available Operations

* [listDatasets](#listdatasets) - List datasets in a project
* [createDataset](#createdataset) - Create a dataset (metadata only, for API pull or webhook sources)
* [uploadDataset](#uploaddataset) - Upload a dataset file (CSV, Parquet, or JSON)
* [getDataset](#getdataset) - Retrieve a dataset
* [deleteDataset](#deletedataset) - Delete a dataset
* [downloadDataset](#downloaddataset) - Download the raw dataset file

## listDatasets

List datasets in a project

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listDatasets" method="get" path="/organizations/{org_id}/projects/{project_id}/datasets" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.datasets.listDatasets({
    orgId: "fcbdf261-87b7-4f6f-b946-b9d8fc0abe45",
    projectId: "e19536b6-94ee-4697-9f17-80f098188752",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { datasetsListDatasets } from "openapi/funcs/datasets-list-datasets.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsListDatasets(sdk, {
    orgId: "fcbdf261-87b7-4f6f-b946-b9d8fc0abe45",
    projectId: "e19536b6-94ee-4697-9f17-80f098188752",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsListDatasets failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListDatasetsRequest](../../models/operations/list-datasets-request.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListDatasetsResponse](../../models/operations/list-datasets-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createDataset

Create a dataset (metadata only, for API pull or webhook sources)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createDataset" method="post" path="/organizations/{org_id}/projects/{project_id}/datasets" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.datasets.createDataset({
    orgId: "fb0b6da2-271a-4a0e-9b13-743c195501e8",
    projectId: "eb4e7072-5de0-4f14-8d23-7a36c4efa7ea",
    body: {
      name: "<value>",
      source: {
        type: "webhook_ingest",
        endpointUrl: "https://hurtful-dusk.info/",
        secret: "<value>",
      },
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
import { datasetsCreateDataset } from "openapi/funcs/datasets-create-dataset.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsCreateDataset(sdk, {
    orgId: "fb0b6da2-271a-4a0e-9b13-743c195501e8",
    projectId: "eb4e7072-5de0-4f14-8d23-7a36c4efa7ea",
    body: {
      name: "<value>",
      source: {
        type: "webhook_ingest",
        endpointUrl: "https://hurtful-dusk.info/",
        secret: "<value>",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsCreateDataset failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateDatasetRequest](../../models/operations/create-dataset-request.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Dataset](../../models/dataset.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## uploadDataset

Upload a dataset file (CSV, Parquet, or JSON)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="uploadDataset" method="post" path="/organizations/{org_id}/projects/{project_id}/datasets/upload" -->
```typescript
import { openAsBlob } from "node:fs";
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.datasets.uploadDataset({
    orgId: "bb20f76f-a6f9-4dc3-a6a5-02353a91e4dd",
    projectId: "84dce507-1a8f-45fa-9f51-348d1e40396c",
    body: {
      name: "<value>",
      file: await openAsBlob("example.file"),
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { openAsBlob } from "node:fs";
import { SDKCore } from "openapi/core.js";
import { datasetsUploadDataset } from "openapi/funcs/datasets-upload-dataset.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsUploadDataset(sdk, {
    orgId: "bb20f76f-a6f9-4dc3-a6a5-02353a91e4dd",
    projectId: "84dce507-1a8f-45fa-9f51-348d1e40396c",
    body: {
      name: "<value>",
      file: await openAsBlob("example.file"),
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsUploadDataset failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UploadDatasetRequest](../../models/operations/upload-dataset-request.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.UploadDatasetResponse](../../models/operations/upload-dataset-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 400                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getDataset

Retrieve a dataset

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getDataset" method="get" path="/organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.datasets.getDataset({
    orgId: "fc43f824-91a2-4547-90db-157813cf264b",
    projectId: "013a334f-b626-4244-b2b4-36259895c053",
    datasetId: "3bc258ed-818c-42aa-9823-650b22e1a087",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { datasetsGetDataset } from "openapi/funcs/datasets-get-dataset.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsGetDataset(sdk, {
    orgId: "fc43f824-91a2-4547-90db-157813cf264b",
    projectId: "013a334f-b626-4244-b2b4-36259895c053",
    datasetId: "3bc258ed-818c-42aa-9823-650b22e1a087",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsGetDataset failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetDatasetRequest](../../models/operations/get-dataset-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetDatasetResponse](../../models/operations/get-dataset-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 404                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## deleteDataset

Delete a dataset

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteDataset" method="delete" path="/organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  await sdk.datasets.deleteDataset({
    orgId: "5590af87-0721-446f-bd93-34df3ecf7494",
    projectId: "228247ab-7edd-47b8-b4de-5b4842ce8e2e",
    datasetId: "5d34289c-89fb-47d9-9404-9fe1e3220fd7",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { datasetsDeleteDataset } from "openapi/funcs/datasets-delete-dataset.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsDeleteDataset(sdk, {
    orgId: "5590af87-0721-446f-bd93-34df3ecf7494",
    projectId: "228247ab-7edd-47b8-b4de-5b4842ce8e2e",
    datasetId: "5d34289c-89fb-47d9-9404-9fe1e3220fd7",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("datasetsDeleteDataset failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteDatasetRequest](../../models/operations/delete-dataset-request.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## downloadDataset

Download the raw dataset file

### Example Usage

<!-- UsageSnippet language="typescript" operationID="downloadDataset" method="get" path="/organizations/{org_id}/projects/{project_id}/datasets/{dataset_id}/download" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.datasets.downloadDataset({
    orgId: "953a1f39-9b25-4d2d-bfa2-42293342d0eb",
    projectId: "03648694-4833-43c3-9aa1-225509d8a4e7",
    datasetId: "4ae248e8-41a6-4a58-857f-3813cd159fc1",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { datasetsDownloadDataset } from "openapi/funcs/datasets-download-dataset.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await datasetsDownloadDataset(sdk, {
    orgId: "953a1f39-9b25-4d2d-bfa2-42293342d0eb",
    projectId: "03648694-4833-43c3-9aa1-225509d8a4e7",
    datasetId: "4ae248e8-41a6-4a58-857f-3813cd159fc1",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsDownloadDataset failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DownloadDatasetRequest](../../models/operations/download-dataset-request.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DownloadDatasetResponse](../../models/operations/download-dataset-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 404                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |