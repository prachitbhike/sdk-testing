# AlertEvent

## Example Usage

```typescript
import { AlertEvent } from "openapi/models";

let value: AlertEvent = {
  id: "20d0b4ce-09d6-4bd4-a174-03e57b3bd4ef",
  alertId: "b03a54f4-b062-47e3-9b4c-91d8c6a78b18",
  triggeredAt: new Date("2026-01-29T21:08:10.385Z"),
  conditionSnapshot: {
    type: "anomaly",
    sensitivity: 5682.61,
  },
  observedValue: 5097.77,
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `alertId`                                                                                     | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `triggeredAt`                                                                                 | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `conditionSnapshot`                                                                           | *models.AlertCondition*                                                                       | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `observedValue`                                                                               | *number*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `resolvedAt`                                                                                  | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |