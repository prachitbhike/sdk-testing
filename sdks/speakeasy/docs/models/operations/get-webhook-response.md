# GetWebhookResponse

## Example Usage

```typescript
import { GetWebhookResponse } from "openapi/models/operations";

let value: GetWebhookResponse = {
  headers: {
    "key": [
      "<value 1>",
    ],
    "key1": [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
  },
  result: {
    id: "625c0461-6c0d-43f6-83ec-1597eec89146",
    url: "https://icy-validity.org/",
    events: [],
    active: true,
    createdAt: new Date("2025-06-17T19:33:51.430Z"),
  },
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `headers`                                                  | Record<string, *string*[]>                                 | :heavy_check_mark:                                         | N/A                                                        |
| `result`                                                   | [models.WebhookEndpoint](../../models/webhook-endpoint.md) | :heavy_check_mark:                                         | N/A                                                        |