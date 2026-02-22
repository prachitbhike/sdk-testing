# ForecastModel

## Example Usage

```typescript
import { ForecastModel } from "openapi/models";

let value: ForecastModel = {
  id: "76a1e7c1-7b6f-45aa-90cf-efe27907cdd5",
  projectId: "29e84a8e-bdd3-441d-96ee-ace20dcd2a55",
  name: "<value>",
  algorithm: {
    type: "ensemble",
    subAlgorithms: [],
    combinationMethod: "stacking",
  },
  status: "draft",
  datasetId: "e38a6397-fe8b-4e73-98a6-5f98d1ae098a",
  targetColumn: "<value>",
  featureColumns: [
    "<value 1>",
  ],
  createdAt: new Date("2026-09-04T01:17:43.724Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `projectId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `name`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `algorithm`                                                                                   | *models.Algorithm*                                                                            | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `status`                                                                                      | [models.ForecastModelStatus](../models/forecast-model-status.md)                              | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `datasetId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `targetColumn`                                                                                | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `featureColumns`                                                                              | *string*[]                                                                                    | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `hyperparameters`                                                                             | [models.Hyperparameters](../models/hyperparameters.md)                                        | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `metrics`                                                                                     | [models.TrainingMetrics](../models/training-metrics.md)                                       | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `trainedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |