# ListMembersResponse

Paginated list of members

## Example Usage

```typescript
import { ListMembersResponse } from "openapi/models/operations";

let value: ListMembersResponse = {
  hasMore: true,
  nextCursor: "<value>",
  data: [],
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `hasMore`                                 | *boolean*                                 | :heavy_check_mark:                        | N/A                                       |
| `nextCursor`                              | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `data`                                    | [models.Member](../../models/member.md)[] | :heavy_check_mark:                        | N/A                                       |