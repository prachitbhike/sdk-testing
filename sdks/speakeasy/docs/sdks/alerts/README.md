# Alerts

## Overview

Configure anomaly alerts and view history

### Available Operations

* [listAlerts](#listalerts) - List alerts in a project
* [createAlert](#createalert) - Create an alert
* [getAlert](#getalert) - Retrieve an alert
* [updateAlert](#updatealert) - Update an alert
* [deleteAlert](#deletealert) - Delete an alert
* [listAlertHistory](#listalerthistory) - List alert event history (offset-paginated)

## listAlerts

List alerts in a project

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listAlerts" method="get" path="/organizations/{org_id}/projects/{project_id}/alerts" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.alerts.listAlerts({
    orgId: "945d3628-ddfe-499f-93eb-d98dcd0bcca4",
    projectId: "75f5bdc8-f8d0-469c-9259-cc1fe2757cc9",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { alertsListAlerts } from "openapi/funcs/alerts-list-alerts.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsListAlerts(sdk, {
    orgId: "945d3628-ddfe-499f-93eb-d98dcd0bcca4",
    projectId: "75f5bdc8-f8d0-469c-9259-cc1fe2757cc9",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("alertsListAlerts failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListAlertsRequest](../../models/operations/list-alerts-request.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListAlertsResponse](../../models/operations/list-alerts-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createAlert

Create an alert

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createAlert" method="post" path="/organizations/{org_id}/projects/{project_id}/alerts" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.alerts.createAlert({
    orgId: "23b439f3-76c8-45fe-95e4-7aea637b5daf",
    projectId: "0226f3e2-3ea8-43c6-a4ca-40d194f7c29a",
    body: {
      name: "<value>",
      modelId: "229126f9-0c3a-4a66-83b7-b4c20ac78d40",
      condition: {
        type: "trend",
        direction: "decreasing",
        slopeThreshold: 8260.22,
        windowSize: 619829,
      },
      channels: [
        {
          type: "slack",
          channelId: "<id>",
          webhookUrl: "https://wise-cheetah.info/",
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
import { alertsCreateAlert } from "openapi/funcs/alerts-create-alert.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsCreateAlert(sdk, {
    orgId: "23b439f3-76c8-45fe-95e4-7aea637b5daf",
    projectId: "0226f3e2-3ea8-43c6-a4ca-40d194f7c29a",
    body: {
      name: "<value>",
      modelId: "229126f9-0c3a-4a66-83b7-b4c20ac78d40",
      condition: {
        type: "trend",
        direction: "decreasing",
        slopeThreshold: 8260.22,
        windowSize: 619829,
      },
      channels: [
        {
          type: "slack",
          channelId: "<id>",
          webhookUrl: "https://wise-cheetah.info/",
        },
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("alertsCreateAlert failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.CreateAlertRequest](../../models/operations/create-alert-request.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Alert](../../models/alert.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getAlert

Retrieve an alert

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getAlert" method="get" path="/organizations/{org_id}/projects/{project_id}/alerts/{alert_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.alerts.getAlert({
    orgId: "c7c54af9-81a4-4208-844b-4f25f89cf8a1",
    projectId: "c7ead004-1144-404f-b048-c642abce6db4",
    alertId: "abfd9a11-f654-4039-b993-88cfc6d2088b",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { alertsGetAlert } from "openapi/funcs/alerts-get-alert.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsGetAlert(sdk, {
    orgId: "c7c54af9-81a4-4208-844b-4f25f89cf8a1",
    projectId: "c7ead004-1144-404f-b048-c642abce6db4",
    alertId: "abfd9a11-f654-4039-b993-88cfc6d2088b",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("alertsGetAlert failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetAlertRequest](../../models/operations/get-alert-request.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetAlertResponse](../../models/operations/get-alert-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ApiError        | 404                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## updateAlert

Update an alert

### Example Usage

<!-- UsageSnippet language="typescript" operationID="updateAlert" method="patch" path="/organizations/{org_id}/projects/{project_id}/alerts/{alert_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.alerts.updateAlert({
    orgId: "4b33f869-03b3-4db9-843c-9e2b76a4f868",
    projectId: "310a45c0-1225-49be-9179-6a7114227e97",
    alertId: "65790cd4-4002-47bb-9131-c0f3cd5a9c8a",
    body: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { alertsUpdateAlert } from "openapi/funcs/alerts-update-alert.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsUpdateAlert(sdk, {
    orgId: "4b33f869-03b3-4db9-843c-9e2b76a4f868",
    projectId: "310a45c0-1225-49be-9179-6a7114227e97",
    alertId: "65790cd4-4002-47bb-9131-c0f3cd5a9c8a",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("alertsUpdateAlert failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateAlertRequest](../../models/operations/update-alert-request.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Alert](../../models/alert.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## deleteAlert

Delete an alert

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteAlert" method="delete" path="/organizations/{org_id}/projects/{project_id}/alerts/{alert_id}" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  await sdk.alerts.deleteAlert({
    orgId: "ff1a4d69-504e-40a5-811b-636a3d8ea592",
    projectId: "86c497be-3197-4679-a955-752981afe4e1",
    alertId: "b32caffe-7008-482a-b4dc-ab7c69e92560",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { alertsDeleteAlert } from "openapi/funcs/alerts-delete-alert.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsDeleteAlert(sdk, {
    orgId: "ff1a4d69-504e-40a5-811b-636a3d8ea592",
    projectId: "86c497be-3197-4679-a955-752981afe4e1",
    alertId: "b32caffe-7008-482a-b4dc-ab7c69e92560",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("alertsDeleteAlert failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteAlertRequest](../../models/operations/delete-alert-request.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## listAlertHistory

List alert event history (offset-paginated)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listAlertHistory" method="get" path="/organizations/{org_id}/projects/{project_id}/alerts/{alert_id}/history" -->
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.alerts.listAlertHistory({
    orgId: "f62b45d5-b687-4f89-b94c-6b9f82141351",
    projectId: "deb14544-e550-4997-a77a-4b162d6e8c62",
    alertId: "328a6a71-3cf4-4097-9542-e543fe3a1360",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SDKCore } from "openapi/core.js";
import { alertsListAlertHistory } from "openapi/funcs/alerts-list-alert-history.js";

// Use `SDKCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const sdk = new SDKCore({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const res = await alertsListAlertHistory(sdk, {
    orgId: "f62b45d5-b687-4f89-b94c-6b9f82141351",
    projectId: "deb14544-e550-4997-a77a-4b162d6e8c62",
    alertId: "328a6a71-3cf4-4097-9542-e543fe3a1360",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("alertsListAlertHistory failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListAlertHistoryRequest](../../models/operations/list-alert-history-request.md)                                                                                    | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListAlertHistoryResponse](../../models/operations/list-alert-history-response.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |