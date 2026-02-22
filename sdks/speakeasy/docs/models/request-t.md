# RequestT

## Example Usage

```typescript
import { RequestT } from "openapi/models";

let value: RequestT = {
  modelId: "95e886e0-2072-49d7-b6ef-5700a937567a",
  horizon: 767709,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `modelId`                                    | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `horizon`                                    | *number*                                     | :heavy_check_mark:                           | Number of time steps to forecast             |
| `confidenceIntervals`                        | *number*[]                                   | :heavy_minus_sign:                           | N/A                                          |
| `streaming`                                  | *boolean*                                    | :heavy_minus_sign:                           | If true, results are streamed via SSE        |
| `inputOverrides`                             | Record<string, *number*>                     | :heavy_minus_sign:                           | Override feature values for what-if analysis |