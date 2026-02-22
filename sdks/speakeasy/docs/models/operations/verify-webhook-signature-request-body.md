# VerifyWebhookSignatureRequestBody

## Example Usage

```typescript
import { VerifyWebhookSignatureRequestBody } from "openapi/models/operations";

let value: VerifyWebhookSignatureRequestBody = {
  payload: "<value>",
  signature: "<value>",
  timestamp: new Date("2025-12-09T11:21:49.033Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `payload`                                                                                     | *string*                                                                                      | :heavy_check_mark:                                                                            | Raw JSON payload string                                                                       |
| `signature`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | The X-Chronocast-Signature header value                                                       |
| `timestamp`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | The X-Chronocast-Timestamp header value                                                       |