# PredictionRequest

## Example Usage

```typescript
import { PredictionRequest } from "openapi/models";

let value: PredictionRequest = {
  horizon: 689006,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `horizon`                                    | *number*                                     | :heavy_check_mark:                           | Number of time steps to forecast             |
| `confidenceIntervals`                        | *number*[]                                   | :heavy_minus_sign:                           | N/A                                          |
| `streaming`                                  | *boolean*                                    | :heavy_minus_sign:                           | If true, results are streamed via SSE        |
| `inputOverrides`                             | Record<string, *number*>                     | :heavy_minus_sign:                           | Override feature values for what-if analysis |