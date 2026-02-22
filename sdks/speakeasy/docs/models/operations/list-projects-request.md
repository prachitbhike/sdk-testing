# ListProjectsRequest

## Example Usage

```typescript
import { ListProjectsRequest } from "openapi/models/operations";

let value: ListProjectsRequest = {
  orgId: "bd62b109-2070-41cc-a687-f79576058745",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `orgId`                                    | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `cursor`                                   | *string*                                   | :heavy_minus_sign:                         | Opaque cursor for cursor-based pagination. |
| `limit`                                    | *number*                                   | :heavy_minus_sign:                         | N/A                                        |