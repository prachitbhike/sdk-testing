# CreateModelResponse

## Example Usage

```typescript
import { CreateModelResponse } from "openapi/models/operations";

let value: CreateModelResponse = {
  headers: {},
  result: {
    id: "9a7a34f2-d77d-45f3-ac7d-05947e5633ab",
    projectId: "75de3b7e-51ff-4fe6-af1b-ba09c3cfe5fa",
    name: "<value>",
    algorithm: {
      type: "neural",
      architecture: "transformer",
      layers: 969811,
      hiddenSize: 151378,
    },
    status: "training",
    datasetId: "fbda8ff6-9934-49b1-a093-4612d0dc95e9",
    targetColumn: "<value>",
    featureColumns: [
      "<value 1>",
      "<value 2>",
    ],
    createdAt: new Date("2025-12-23T16:26:15.222Z"),
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `headers`                                              | Record<string, *string*[]>                             | :heavy_check_mark:                                     | N/A                                                    |
| `result`                                               | [models.ForecastModel](../../models/forecast-model.md) | :heavy_check_mark:                                     | N/A                                                    |