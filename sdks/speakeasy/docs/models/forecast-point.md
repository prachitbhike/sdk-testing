# ForecastPoint

## Example Usage

```typescript
import { ForecastPoint } from "openapi/models";

let value: ForecastPoint = {
  timestamp: new Date("2025-02-28T15:28:18.827Z"),
  value: 2923.26,
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `timestamp`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `value`                                                                                       | *number*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `confidenceIntervals`                                                                         | [models.ConfidenceInterval](../models/confidence-interval.md)[]                               | :heavy_minus_sign:                                                                            | N/A                                                                                           |