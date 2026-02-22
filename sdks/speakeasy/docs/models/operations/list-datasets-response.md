# ListDatasetsResponse

Paginated list of datasets

## Example Usage

```typescript
import { ListDatasetsResponse } from "openapi/models/operations";

let value: ListDatasetsResponse = {
  hasMore: true,
  nextCursor: "<value>",
  data: [],
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `hasMore`                                   | *boolean*                                   | :heavy_check_mark:                          | N/A                                         |
| `nextCursor`                                | *string*                                    | :heavy_check_mark:                          | N/A                                         |
| `data`                                      | [models.Dataset](../../models/dataset.md)[] | :heavy_check_mark:                          | N/A                                         |