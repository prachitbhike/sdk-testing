# VerifyWebhookSignatureRequest

## Example Usage

```typescript
import { VerifyWebhookSignatureRequest } from "openapi/models/operations";

let value: VerifyWebhookSignatureRequest = {
  webhookId: "c67bc7ae-1d33-48a6-94df-889e5b2229a4",
  body: {
    payload: "<value>",
    signature: "<value>",
    timestamp: new Date("2025-03-11T00:46:00.044Z"),
  },
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `webhookId`                                                                                                      | *string*                                                                                                         | :heavy_check_mark:                                                                                               | N/A                                                                                                              |
| `body`                                                                                                           | [operations.VerifyWebhookSignatureRequestBody](../../models/operations/verify-webhook-signature-request-body.md) | :heavy_check_mark:                                                                                               | N/A                                                                                                              |