# ListWebhookDeliveriesResponse

Paginated list of webhook deliveries

## Example Usage

```typescript
import { ListWebhookDeliveriesResponse } from "openapi/models/operations";

let value: ListWebhookDeliveriesResponse = {
  hasMore: false,
  nextCursor: "<value>",
  data: [
    {
      id: "cf0b8841-990a-496c-a078-d435804efe73",
      webhookId: "28d62b71-3913-4484-b8d7-485f32a0c657",
      eventType: "<value>",
      payload: {
        "key": "<value>",
        "key1": "<value>",
        "key2": "<value>",
      },
      deliveredAt: new Date("2025-03-23T15:23:37.707Z"),
      success: true,
    },
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `hasMore`                                                    | *boolean*                                                    | :heavy_check_mark:                                           | N/A                                                          |
| `nextCursor`                                                 | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `data`                                                       | [models.WebhookDelivery](../../models/webhook-delivery.md)[] | :heavy_check_mark:                                           | N/A                                                          |