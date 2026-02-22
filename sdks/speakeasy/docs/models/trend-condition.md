# TrendCondition

## Example Usage

```typescript
import { TrendCondition } from "openapi/models";

let value: TrendCondition = {
  type: "trend",
  direction: "either",
  slopeThreshold: 2947.02,
  windowSize: 663938,
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `type`                                     | *"trend"*                                  | :heavy_check_mark:                         | N/A                                        |
| `direction`                                | [models.Direction](../models/direction.md) | :heavy_check_mark:                         | N/A                                        |
| `slopeThreshold`                           | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `windowSize`                               | *number*                                   | :heavy_check_mark:                         | N/A                                        |