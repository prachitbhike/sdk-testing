# WebhookDelivery

## Example Usage

```typescript
import { WebhookDelivery } from "openapi/models";

let value: WebhookDelivery = {
  id: "a80139c1-0830-459e-8eaa-2dfbc23305aa",
  webhookId: "ade6c770-3f3a-4c00-971f-25606684ca31",
  eventType: "<value>",
  payload: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  deliveredAt: new Date("2026-05-11T15:59:16.882Z"),
  success: false,
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `webhookId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `eventType`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `payload`                                                                                     | Record<string, *any*>                                                                         | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `responseStatus`                                                                              | *number*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `deliveredAt`                                                                                 | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `success`                                                                                     | *boolean*                                                                                     | :heavy_check_mark:                                                                            | N/A                                                                                           |