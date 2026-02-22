# openapi

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *openapi* API.

[![Built by Speakeasy](https://img.shields.io/badge/Built_by-SPEAKEASY-374151?style=for-the-badge&labelColor=f3f4f6)](https://www.speakeasy.com/?utm_source=openapi&utm_campaign=typescript)
[![License: MIT](https://img.shields.io/badge/LICENSE_//_MIT-3b5bdb?style=for-the-badge&labelColor=eff6ff)](https://opensource.org/licenses/MIT)


<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/wndrco/sdktesting). Delete this section before > publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

Chronocast API: Predictive analytics platform API. Upload time-series datasets,
train forecast models, run predictions, and receive anomaly alerts.
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [openapi](#openapi)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [Server-sent event streaming](#server-sent-event-streaming)
  * [File uploads](#file-uploads)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET>
```

> [!NOTE]
> This package is published with CommonJS and ES Modules (ESM) support.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type   | Scheme  |
| -------- | ------ | ------- |
| `apiKey` | apiKey | API key |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```

### Per-Operation Security Schemes

Some operations in this SDK require the security scheme to be specified at the request level. For example:
```typescript
import { SDK } from "openapi";

const sdk = new SDK();

async function run() {
  const result = await sdk.webhooks.listWebhooks({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  }, {});

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [Alerts](docs/sdks/alerts/README.md)

* [listAlerts](docs/sdks/alerts/README.md#listalerts) - List alerts in a project
* [createAlert](docs/sdks/alerts/README.md#createalert) - Create an alert
* [getAlert](docs/sdks/alerts/README.md#getalert) - Retrieve an alert
* [updateAlert](docs/sdks/alerts/README.md#updatealert) - Update an alert
* [deleteAlert](docs/sdks/alerts/README.md#deletealert) - Delete an alert
* [listAlertHistory](docs/sdks/alerts/README.md#listalerthistory) - List alert event history (offset-paginated)

### [Datasets](docs/sdks/datasets/README.md)

* [listDatasets](docs/sdks/datasets/README.md#listdatasets) - List datasets in a project
* [createDataset](docs/sdks/datasets/README.md#createdataset) - Create a dataset (metadata only, for API pull or webhook sources)
* [uploadDataset](docs/sdks/datasets/README.md#uploaddataset) - Upload a dataset file (CSV, Parquet, or JSON)
* [getDataset](docs/sdks/datasets/README.md#getdataset) - Retrieve a dataset
* [deleteDataset](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset
* [downloadDataset](docs/sdks/datasets/README.md#downloaddataset) - Download the raw dataset file

### [Members](docs/sdks/members/README.md)

* [listMembers](docs/sdks/members/README.md#listmembers) - List organization members
* [inviteMember](docs/sdks/members/README.md#invitemember) - Invite a member to the organization

### [Models](docs/sdks/models/README.md)

* [listModels](docs/sdks/models/README.md#listmodels) - List forecast models
* [createModel](docs/sdks/models/README.md#createmodel) - Create a forecast model
* [getModel](docs/sdks/models/README.md#getmodel) - Retrieve a forecast model
* [deleteModel](docs/sdks/models/README.md#deletemodel) - Delete a forecast model
* [trainModel](docs/sdks/models/README.md#trainmodel) - Start model training (async, returns operation to poll)

### [Operations](docs/sdks/operations/README.md)

* [getOperation](docs/sdks/operations/README.md#getoperation) - Poll an async operation
* [cancelOperation](docs/sdks/operations/README.md#canceloperation) - Cancel a running async operation

### [Organizations](docs/sdks/organizations/README.md)

* [listOrganizations](docs/sdks/organizations/README.md#listorganizations) - List organizations
* [createOrganization](docs/sdks/organizations/README.md#createorganization) - Create an organization
* [getOrganization](docs/sdks/organizations/README.md#getorganization) - Retrieve an organization
* [updateOrganization](docs/sdks/organizations/README.md#updateorganization) - Update an organization
* [deleteOrganization](docs/sdks/organizations/README.md#deleteorganization) - Delete an organization

### [Predictions](docs/sdks/predictions/README.md)

* [createPrediction](docs/sdks/predictions/README.md#createprediction) - Run a prediction (optionally streaming via SSE)
* [createBatchPrediction](docs/sdks/predictions/README.md#createbatchprediction) - Run predictions across multiple models in a single request

### [Projects](docs/sdks/projects/README.md)

* [listProjects](docs/sdks/projects/README.md#listprojects) - List projects in an organization
* [createProject](docs/sdks/projects/README.md#createproject) - Create a project
* [getProject](docs/sdks/projects/README.md#getproject) - Retrieve a project
* [deleteProject](docs/sdks/projects/README.md#deleteproject) - Delete a project

### [Webhooks](docs/sdks/webhooks/README.md)

* [listWebhooks](docs/sdks/webhooks/README.md#listwebhooks) - List webhook endpoints
* [createWebhook](docs/sdks/webhooks/README.md#createwebhook) - Create a webhook endpoint
* [getWebhook](docs/sdks/webhooks/README.md#getwebhook) - Retrieve a webhook endpoint
* [deleteWebhook](docs/sdks/webhooks/README.md#deletewebhook) - Delete a webhook endpoint
* [listWebhookDeliveries](docs/sdks/webhooks/README.md#listwebhookdeliveries) - List delivery attempts for a webhook
* [verifyWebhookSignature](docs/sdks/webhooks/README.md#verifywebhooksignature) - Verify a webhook payload signature

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`alertsCreateAlert`](docs/sdks/alerts/README.md#createalert) - Create an alert
- [`alertsDeleteAlert`](docs/sdks/alerts/README.md#deletealert) - Delete an alert
- [`alertsGetAlert`](docs/sdks/alerts/README.md#getalert) - Retrieve an alert
- [`alertsListAlertHistory`](docs/sdks/alerts/README.md#listalerthistory) - List alert event history (offset-paginated)
- [`alertsListAlerts`](docs/sdks/alerts/README.md#listalerts) - List alerts in a project
- [`alertsUpdateAlert`](docs/sdks/alerts/README.md#updatealert) - Update an alert
- [`datasetsCreateDataset`](docs/sdks/datasets/README.md#createdataset) - Create a dataset (metadata only, for API pull or webhook sources)
- [`datasetsDeleteDataset`](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset
- [`datasetsDownloadDataset`](docs/sdks/datasets/README.md#downloaddataset) - Download the raw dataset file
- [`datasetsGetDataset`](docs/sdks/datasets/README.md#getdataset) - Retrieve a dataset
- [`datasetsListDatasets`](docs/sdks/datasets/README.md#listdatasets) - List datasets in a project
- [`datasetsUploadDataset`](docs/sdks/datasets/README.md#uploaddataset) - Upload a dataset file (CSV, Parquet, or JSON)
- [`membersInviteMember`](docs/sdks/members/README.md#invitemember) - Invite a member to the organization
- [`membersListMembers`](docs/sdks/members/README.md#listmembers) - List organization members
- [`modelsCreateModel`](docs/sdks/models/README.md#createmodel) - Create a forecast model
- [`modelsDeleteModel`](docs/sdks/models/README.md#deletemodel) - Delete a forecast model
- [`modelsGetModel`](docs/sdks/models/README.md#getmodel) - Retrieve a forecast model
- [`modelsListModels`](docs/sdks/models/README.md#listmodels) - List forecast models
- [`modelsTrainModel`](docs/sdks/models/README.md#trainmodel) - Start model training (async, returns operation to poll)
- [`operationsCancelOperation`](docs/sdks/operations/README.md#canceloperation) - Cancel a running async operation
- [`operationsGetOperation`](docs/sdks/operations/README.md#getoperation) - Poll an async operation
- [`organizationsCreateOrganization`](docs/sdks/organizations/README.md#createorganization) - Create an organization
- [`organizationsDeleteOrganization`](docs/sdks/organizations/README.md#deleteorganization) - Delete an organization
- [`organizationsGetOrganization`](docs/sdks/organizations/README.md#getorganization) - Retrieve an organization
- [`organizationsListOrganizations`](docs/sdks/organizations/README.md#listorganizations) - List organizations
- [`organizationsUpdateOrganization`](docs/sdks/organizations/README.md#updateorganization) - Update an organization
- [`predictionsCreateBatchPrediction`](docs/sdks/predictions/README.md#createbatchprediction) - Run predictions across multiple models in a single request
- [`predictionsCreatePrediction`](docs/sdks/predictions/README.md#createprediction) - Run a prediction (optionally streaming via SSE)
- [`projectsCreateProject`](docs/sdks/projects/README.md#createproject) - Create a project
- [`projectsDeleteProject`](docs/sdks/projects/README.md#deleteproject) - Delete a project
- [`projectsGetProject`](docs/sdks/projects/README.md#getproject) - Retrieve a project
- [`projectsListProjects`](docs/sdks/projects/README.md#listprojects) - List projects in an organization
- [`webhooksCreateWebhook`](docs/sdks/webhooks/README.md#createwebhook) - Create a webhook endpoint
- [`webhooksDeleteWebhook`](docs/sdks/webhooks/README.md#deletewebhook) - Delete a webhook endpoint
- [`webhooksGetWebhook`](docs/sdks/webhooks/README.md#getwebhook) - Retrieve a webhook endpoint
- [`webhooksListWebhookDeliveries`](docs/sdks/webhooks/README.md#listwebhookdeliveries) - List delivery attempts for a webhook
- [`webhooksListWebhooks`](docs/sdks/webhooks/README.md#listwebhooks) - List webhook endpoints
- [`webhooksVerifyWebhookSignature`](docs/sdks/webhooks/README.md#verifywebhooksignature) - Verify a webhook payload signature

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Server-sent event streaming [eventstream] -->
## Server-sent event streaming

[Server-sent events][mdn-sse] are used to stream content from certain
operations. These operations will expose the stream as an async iterable that
can be consumed using a [`for await...of`][mdn-for-await-of] loop. The loop will
terminate when the server no longer has any events to send and closes the
underlying connection.

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

[mdn-sse]: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
[mdn-for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
<!-- End Server-sent event streaming [eventstream] -->

<!-- Start File uploads [file-upload] -->
## File uploads

Certain SDK methods accept files as part of a multi-part request. It is possible and typically recommended to upload files as a stream rather than reading the entire contents into memory. This avoids excessive memory consumption and potentially crashing with out-of-memory errors when working with very large files. The following example demonstrates how to attach a file stream to a request.

> [!TIP]
>
> Depending on your JavaScript runtime, there are convenient utilities that return a handle to a file without reading the entire contents into memory:
>
> - **Node.js v20+:** Since v20, Node.js comes with a native `openAsBlob` function in [`node:fs`](https://nodejs.org/docs/latest-v20.x/api/fs.html#fsopenasblobpath-options).
> - **Bun:** The native [`Bun.file`](https://bun.sh/docs/api/file-io#reading-files-bun-file) function produces a file handle that can be used for streaming file uploads.
> - **Browsers:** All supported browsers return an instance to a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) when reading the value from an `<input type="file">` element.
> - **Node.js v18:** A file stream can be created using the `fileFrom` helper from [`fetch-blob/from.js`](https://www.npmjs.com/package/fetch-blob).

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
<!-- End File uploads [file-upload] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({}, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`SDKError`](./src/models/errors/sdk-error.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { SDK } from "openapi";
import * as errors from "openapi/models/errors";

const sdk = new SDK({
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  try {
    const result = await sdk.organizations.listOrganizations({});

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.SDKError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.ApiError) {
        console.log(error.data$.type); // models.Type
        console.log(error.data$.message); // string
        console.log(error.data$.requestId); // string
        console.log(error.data$.details); // FieldError[]
      }
    }
  }
}

run();

```

### Error Classes
**Primary error:**
* [`SDKError`](./src/models/errors/sdk-error.ts): The base class for HTTP error responses.

<details><summary>Less common errors (7)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/http-client-errors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/http-client-errors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/http-client-errors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/http-client-errors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/http-client-errors.ts): Unrecognised or unexpected error.


**Inherit from [`SDKError`](./src/models/errors/sdk-error.ts)**:
* [`ApiError`](./src/models/errors/api-error.ts): Missing or invalid authentication. Applicable to 18 of 38 methods.*
* [`ResponseValidationError`](./src/models/errors/response-validation-error.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Index

You can override the default server globally by passing a server index to the `serverIdx: number` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the indexes associated with the available servers:

| #   | Server                          | Description       |
| --- | ------------------------------- | ----------------- |
| 0   | `https://api.chronocast.dev/v1` | Production        |
| 1   | `http://localhost:3737/v1`      | Local development |

#### Example

```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  serverIdx: 0,
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```

### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { SDK } from "openapi";

const sdk = new SDK({
  serverURL: "http://localhost:3737/v1",
  apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
  const result = await sdk.organizations.listOrganizations({});

  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to:
- route requests through a proxy server using [undici](https://www.npmjs.com/package/undici)'s ProxyAgent
- use the `"beforeRequest"` hook to add a custom header and a timeout to requests
- use the `"requestError"` hook to log errors

```typescript
import { SDK } from "openapi";
import { ProxyAgent } from "undici";
import { HTTPClient } from "openapi/lib/http";

const dispatcher = new ProxyAgent("http://proxy.example.com:8080");

const httpClient = new HTTPClient({
  // 'fetcher' takes a function that has the same signature as native 'fetch'.
  fetcher: (input, init) =>
    // 'dispatcher' is specific to undici and not part of the standard Fetch API.
    fetch(input, { ...init, dispatcher } as RequestInit),
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new SDK({ httpClient: httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { SDK } from "openapi";

const sdk = new SDK({ debugLogger: console });
```
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=openapi&utm_campaign=typescript)
