# ListProjectsResponse

Paginated list of projects

## Example Usage

```typescript
import { ListProjectsResponse } from "openapi/models/operations";

let value: ListProjectsResponse = {
  hasMore: true,
  nextCursor: null,
  data: [],
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `hasMore`                                   | *boolean*                                   | :heavy_check_mark:                          | N/A                                         |
| `nextCursor`                                | *string*                                    | :heavy_check_mark:                          | N/A                                         |
| `data`                                      | [models.Project](../../models/project.md)[] | :heavy_check_mark:                          | N/A                                         |