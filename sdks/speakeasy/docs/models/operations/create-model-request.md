# CreateModelRequest

## Example Usage

```typescript
import { CreateModelRequest } from "openapi/models/operations";

let value: CreateModelRequest = {
  orgId: "e8e6ce74-be3e-4e58-b4df-713d0079f6ac",
  projectId: "bab0f896-a6ff-41b9-b3c3-eaf8531a9eed",
  body: {
    name: "<value>",
    algorithm: {
      type: "arima",
      orderP: 430605,
      orderD: 60970,
      orderQ: 229025,
      seasonal: false,
    },
    datasetId: "3ec6ce0b-47cd-472b-8de0-2aaa8946c7aa",
    targetColumn: "<value>",
    featureColumns: [
      "<value 1>",
      "<value 2>",
    ],
  },
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `orgId`                                               | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `projectId`                                           | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `idempotencyKey`                                      | *string*                                              | :heavy_minus_sign:                                    | Prevents duplicate operations when retrying requests. |
| `body`                                                | [models.ModelCreate](../../models/model-create.md)    | :heavy_check_mark:                                    | N/A                                                   |