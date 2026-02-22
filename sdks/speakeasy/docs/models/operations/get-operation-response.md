# GetOperationResponse

## Example Usage

```typescript
import { GetOperationResponse } from "openapi/models/operations";

let value: GetOperationResponse = {
  headers: {
    "key": [],
    "key1": [
      "<value 1>",
      "<value 2>",
    ],
  },
  result: {
    id: "0167a38f-3221-46a4-85e1-2ee074f29e03",
    status: "failed",
    createdAt: new Date("2024-01-04T11:16:50.258Z"),
    updatedAt: new Date("2024-05-25T17:45:08.975Z"),
  },
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `headers`                                                | Record<string, *string*[]>                               | :heavy_check_mark:                                       | N/A                                                      |
| `result`                                                 | [models.AsyncOperation](../../models/async-operation.md) | :heavy_check_mark:                                       | N/A                                                      |