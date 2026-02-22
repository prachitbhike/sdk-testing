# EnsembleAlgorithm1

## Example Usage

```typescript
import { EnsembleAlgorithm1 } from "openapi/models";

let value: EnsembleAlgorithm1 = {
  type: "ensemble",
  subAlgorithms: [],
  combinationMethod: "weighted",
};
```

## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `type`                                                      | *"ensemble"*                                                | :heavy_check_mark:                                          | N/A                                                         |
| `subAlgorithms`                                             | *models.Algorithm*[]                                        | :heavy_check_mark:                                          | N/A                                                         |
| `combinationMethod`                                         | [models.CombinationMethod](../models/combination-method.md) | :heavy_check_mark:                                          | N/A                                                         |