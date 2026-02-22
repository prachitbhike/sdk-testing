# ListWebhookDeliveriesRequest

## Example Usage

```typescript
import { ListWebhookDeliveriesRequest } from "openapi/models/operations";

let value: ListWebhookDeliveriesRequest = {
  webhookId: "2e798498-4475-49ec-ae70-ac3e60ac1fa1",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `webhookId`                                | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `cursor`                                   | *string*                                   | :heavy_minus_sign:                         | Opaque cursor for cursor-based pagination. |
| `limit`                                    | *number*                                   | :heavy_minus_sign:                         | N/A                                        |