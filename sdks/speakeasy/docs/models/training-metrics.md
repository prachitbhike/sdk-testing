# TrainingMetrics

## Example Usage

```typescript
import { TrainingMetrics } from "openapi/models";

let value: TrainingMetrics = {
  mae: 6465.33,
  rmse: 5114.76,
  mape: 9389.45,
  rSquared: 5136.42,
  trainingDurationSeconds: 389.47,
};
```

## Fields

| Field                          | Type                           | Required                       | Description                    |
| ------------------------------ | ------------------------------ | ------------------------------ | ------------------------------ |
| `mae`                          | *number*                       | :heavy_check_mark:             | Mean absolute error            |
| `rmse`                         | *number*                       | :heavy_check_mark:             | Root mean squared error        |
| `mape`                         | *number*                       | :heavy_check_mark:             | Mean absolute percentage error |
| `rSquared`                     | *number*                       | :heavy_check_mark:             | N/A                            |
| `trainingDurationSeconds`      | *number*                       | :heavy_check_mark:             | N/A                            |