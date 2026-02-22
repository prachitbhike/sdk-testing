# CreateBatchPredictionRequest

## Example Usage

```typescript
import { CreateBatchPredictionRequest } from "openapi/models/operations";

let value: CreateBatchPredictionRequest = {
  orgId: "ddd58395-0ae5-4459-915e-8297ee6a465e",
  projectId: "f14176fb-0f24-4720-83a7-b01224988dbc",
  body: {
    requests: [
      {
        modelId: "9a936ca5-2218-4789-a32a-5a2b0e4223cf",
        horizon: 838963,
      },
    ],
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `orgId`                                                                   | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       |
| `projectId`                                                               | *string*                                                                  | :heavy_check_mark:                                                        | N/A                                                                       |
| `idempotencyKey`                                                          | *string*                                                                  | :heavy_minus_sign:                                                        | Prevents duplicate operations when retrying requests.                     |
| `body`                                                                    | [models.BatchPredictionRequest](../../models/batch-prediction-request.md) | :heavy_check_mark:                                                        | N/A                                                                       |