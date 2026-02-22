# CreatePredictionRequest

## Example Usage

```typescript
import { CreatePredictionRequest } from "openapi/models/operations";

let value: CreatePredictionRequest = {
  orgId: "8c6f4482-2fe9-4161-8a07-fd3c6fcc2a9b",
  projectId: "e336de9e-3465-4549-9a98-4376068a9221",
  modelId: "52a8604b-4601-4784-abfb-0086be9aaa12",
  body: {
    horizon: 747164,
  },
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `orgId`                                                        | *string*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `projectId`                                                    | *string*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `modelId`                                                      | *string*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `idempotencyKey`                                               | *string*                                                       | :heavy_minus_sign:                                             | Prevents duplicate operations when retrying requests.          |
| `body`                                                         | [models.PredictionRequest](../../models/prediction-request.md) | :heavy_check_mark:                                             | N/A                                                            |