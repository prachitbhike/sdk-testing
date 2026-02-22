# ListMembersRequest

## Example Usage

```typescript
import { ListMembersRequest } from "openapi/models/operations";

let value: ListMembersRequest = {
  orgId: "03f628fa-2a3b-4d24-aa01-07e13ba2a402",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `orgId`                                            | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `cursor`                                           | *string*                                           | :heavy_minus_sign:                                 | Opaque cursor for cursor-based pagination.         |
| `limit`                                            | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `role`                                             | [operations.Role](../../models/operations/role.md) | :heavy_minus_sign:                                 | N/A                                                |