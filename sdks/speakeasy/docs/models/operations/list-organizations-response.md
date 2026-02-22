# ListOrganizationsResponse

## Example Usage

```typescript
import { ListOrganizationsResponse } from "openapi/models/operations";

let value: ListOrganizationsResponse = {
  headers: {},
  result: {
    hasMore: true,
    nextCursor: "<value>",
    data: [
      {
        id: "cc09169c-3233-41c6-8743-47d304cf8444",
        name: "<value>",
        slug: "<value>",
        plan: "pro",
        createdAt: new Date("2025-11-13T02:05:36.844Z"),
      },
    ],
  },
};
```

## Fields

| Field                                                                                                   | Type                                                                                                    | Required                                                                                                | Description                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `headers`                                                                                               | Record<string, *string*[]>                                                                              | :heavy_check_mark:                                                                                      | N/A                                                                                                     |
| `result`                                                                                                | [operations.ListOrganizationsResponseBody](../../models/operations/list-organizations-response-body.md) | :heavy_check_mark:                                                                                      | N/A                                                                                                     |