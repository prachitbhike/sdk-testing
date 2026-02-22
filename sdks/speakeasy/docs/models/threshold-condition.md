# ThresholdCondition

## Example Usage

```typescript
import { ThresholdCondition } from "openapi/models";

let value: ThresholdCondition = {
  type: "threshold",
  metric: "<value>",
  operator: "gte",
  value: 2414.68,
  durationMinutes: 632948,
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *"threshold"*                            | :heavy_check_mark:                       | N/A                                      |
| `metric`                                 | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `operator`                               | [models.Operator](../models/operator.md) | :heavy_check_mark:                       | N/A                                      |
| `value`                                  | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `durationMinutes`                        | *number*                                 | :heavy_check_mark:                       | N/A                                      |