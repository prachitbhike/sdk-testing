# AnomalyCondition

## Example Usage

```typescript
import { AnomalyCondition } from "openapi/models";

let value: AnomalyCondition = {
  type: "anomaly",
  sensitivity: 1785.28,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `type`                                  | *"anomaly"*                             | :heavy_check_mark:                      | N/A                                     |
| `sensitivity`                           | *number*                                | :heavy_check_mark:                      | 0 = least sensitive, 1 = most sensitive |
| `minDeviationPct`                       | *number*                                | :heavy_minus_sign:                      | N/A                                     |