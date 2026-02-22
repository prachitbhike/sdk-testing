# AlertCreate

## Example Usage

```typescript
import { AlertCreate } from "openapi/models";

let value: AlertCreate = {
  name: "<value>",
  modelId: "6120ef73-5f05-48cc-b931-0b0a56415bc4",
  condition: {
    type: "threshold",
    metric: "<value>",
    operator: "gte",
    value: 7230.99,
    durationMinutes: 13156,
  },
  channels: [],
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `name`                         | *string*                       | :heavy_check_mark:             | N/A                            |
| `modelId`                      | *string*                       | :heavy_check_mark:             | N/A                            |
| `condition`                    | *models.AlertCondition*        | :heavy_check_mark:             | N/A                            |
| `channels`                     | *models.NotificationChannel*[] | :heavy_check_mark:             | N/A                            |
| `enabled`                      | *boolean*                      | :heavy_minus_sign:             | N/A                            |