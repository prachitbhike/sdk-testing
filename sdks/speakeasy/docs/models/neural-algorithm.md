# NeuralAlgorithm

## Example Usage

```typescript
import { NeuralAlgorithm } from "openapi/models";

let value: NeuralAlgorithm = {
  type: "neural",
  architecture: "tcn",
  layers: 797243,
  hiddenSize: 430059,
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `type`                                           | *"neural"*                                       | :heavy_check_mark:                               | N/A                                              |
| `architecture`                                   | [models.Architecture](../models/architecture.md) | :heavy_check_mark:                               | N/A                                              |
| `layers`                                         | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `hiddenSize`                                     | *number*                                         | :heavy_check_mark:                               | N/A                                              |
| `dropout`                                        | *number*                                         | :heavy_minus_sign:                               | N/A                                              |