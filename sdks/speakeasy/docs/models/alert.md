# Alert

## Example Usage

```typescript
import { Alert } from "openapi/models";

let value: Alert = {
  id: "17b28496-574c-409d-b6fc-fef6a98fb49a",
  projectId: "eb7e3470-aa2c-499f-bed3-71c8cd326f10",
  name: "<value>",
  modelId: "1050edeb-3de0-439a-872b-2dcd1919f387",
  condition: {
    type: "threshold",
    metric: "<value>",
    operator: "gt",
    value: 8078.08,
    durationMinutes: 231196,
  },
  channels: [],
  enabled: false,
  createdAt: new Date("2025-07-13T12:44:44.008Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `projectId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `name`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `modelId`                                                                                     | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `condition`                                                                                   | *models.AlertCondition*                                                                       | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `channels`                                                                                    | *models.NotificationChannel*[]                                                                | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `enabled`                                                                                     | *boolean*                                                                                     | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |