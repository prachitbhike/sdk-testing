# TrainModelRequest

## Example Usage

```typescript
import { TrainModelRequest } from "openapi/models/operations";

let value: TrainModelRequest = {
  orgId: "08518b12-7d88-4895-ae40-c7093c5b8abf",
  projectId: "2237d4c7-39af-4baf-9043-7092a4aec5b3",
  modelId: "136d276d-3246-4e3d-9f06-f1aaf9ac9326",
};
```

## Fields

| Field                                                                                   | Type                                                                                    | Required                                                                                | Description                                                                             |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `orgId`                                                                                 | *string*                                                                                | :heavy_check_mark:                                                                      | N/A                                                                                     |
| `projectId`                                                                             | *string*                                                                                | :heavy_check_mark:                                                                      | N/A                                                                                     |
| `modelId`                                                                               | *string*                                                                                | :heavy_check_mark:                                                                      | N/A                                                                                     |
| `idempotencyKey`                                                                        | *string*                                                                                | :heavy_minus_sign:                                                                      | Prevents duplicate operations when retrying requests.                                   |
| `body`                                                                                  | [operations.TrainModelRequestBody](../../models/operations/train-model-request-body.md) | :heavy_minus_sign:                                                                      | N/A                                                                                     |