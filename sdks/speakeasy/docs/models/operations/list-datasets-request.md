# ListDatasetsRequest

## Example Usage

```typescript
import { ListDatasetsRequest } from "openapi/models/operations";

let value: ListDatasetsRequest = {
  orgId: "d61a9245-59c3-4747-af61-5a2e5892eb31",
  projectId: "b8da1289-9168-4372-8417-45790c0cd527",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `orgId`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `projectId`                                                                      | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `cursor`                                                                         | *string*                                                                         | :heavy_minus_sign:                                                               | Opaque cursor for cursor-based pagination.                                       |
| `limit`                                                                          | *number*                                                                         | :heavy_minus_sign:                                                               | N/A                                                                              |
| `status`                                                                         | [operations.ListDatasetsStatus](../../models/operations/list-datasets-status.md) | :heavy_minus_sign:                                                               | N/A                                                                              |