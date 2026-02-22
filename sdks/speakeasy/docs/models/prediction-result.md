# PredictionResult

## Example Usage

```typescript
import { PredictionResult } from "openapi/models";

let value: PredictionResult = {
  id: "dbca5042-56e3-471d-9f41-3ab7ff727615",
  modelId: "562b2c7b-829f-4cf4-baaa-2adafb0bf645",
  horizon: 652437,
  createdAt: new Date("2026-04-22T15:07:17.540Z"),
  points: [
    {
      timestamp: new Date("2024-05-19T19:33:25.699Z"),
      value: 370.96,
    },
  ],
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `modelId`                                                                                     | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `horizon`                                                                                     | *number*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `points`                                                                                      | [models.ForecastPoint](../models/forecast-point.md)[]                                         | :heavy_check_mark:                                                                            | N/A                                                                                           |