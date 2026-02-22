# ModelCreate

## Example Usage

```typescript
import { ModelCreate } from "openapi/models";

let value: ModelCreate = {
  name: "<value>",
  algorithm: {
    type: "arima",
    orderP: 511504,
    orderD: 771304,
    orderQ: 39778,
    seasonal: false,
  },
  datasetId: "95f11160-289e-4f8a-9514-5a70653b704a",
  targetColumn: "<value>",
  featureColumns: [
    "<value 1>",
    "<value 2>",
  ],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `name`                                                 | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `algorithm`                                            | *models.Algorithm*                                     | :heavy_check_mark:                                     | N/A                                                    |
| `datasetId`                                            | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `targetColumn`                                         | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `featureColumns`                                       | *string*[]                                             | :heavy_check_mark:                                     | N/A                                                    |
| `hyperparameters`                                      | [models.Hyperparameters](../models/hyperparameters.md) | :heavy_minus_sign:                                     | N/A                                                    |