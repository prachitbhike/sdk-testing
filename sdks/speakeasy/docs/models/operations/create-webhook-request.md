# CreateWebhookRequest

## Example Usage

```typescript
import { CreateWebhookRequest } from "openapi/models/operations";

let value: CreateWebhookRequest = {
  body: {
    url: "https://passionate-season.net",
    events: [],
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `idempotencyKey`                                                        | *string*                                                                | :heavy_minus_sign:                                                      | Prevents duplicate operations when retrying requests.                   |
| `body`                                                                  | [models.WebhookEndpointCreate](../../models/webhook-endpoint-create.md) | :heavy_check_mark:                                                      | N/A                                                                     |