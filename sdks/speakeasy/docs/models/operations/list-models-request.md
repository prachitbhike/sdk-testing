# ListModelsRequest

## Example Usage

```typescript
import { ListModelsRequest } from "openapi/models/operations";

let value: ListModelsRequest = {
  orgId: "6def144a-b0c9-450e-9fcb-71dddbd84b33",
  projectId: "3b55d489-4dab-49c4-a377-4a55db848022",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `orgId`                                                                      | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `projectId`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `cursor`                                                                     | *string*                                                                     | :heavy_minus_sign:                                                           | Opaque cursor for cursor-based pagination.                                   |
| `limit`                                                                      | *number*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `status`                                                                     | [operations.ListModelsStatus](../../models/operations/list-models-status.md) | :heavy_minus_sign:                                                           | N/A                                                                          |