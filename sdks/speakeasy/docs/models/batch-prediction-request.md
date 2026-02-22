# BatchPredictionRequest

## Example Usage

```typescript
import { BatchPredictionRequest } from "openapi/models";

let value: BatchPredictionRequest = {
  requests: [
    {
      modelId: "9a936ca5-2218-4789-a32a-5a2b0e4223cf",
      horizon: 838963,
    },
  ],
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `requests`                                  | [models.RequestT](../models/request-t.md)[] | :heavy_check_mark:                          | N/A                                         |