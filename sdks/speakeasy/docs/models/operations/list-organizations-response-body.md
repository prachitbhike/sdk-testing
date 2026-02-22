# ListOrganizationsResponseBody

Paginated list of organizations

## Example Usage

```typescript
import { ListOrganizationsResponseBody } from "openapi/models/operations";

let value: ListOrganizationsResponseBody = {
  hasMore: false,
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
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `hasMore`                                             | *boolean*                                             | :heavy_check_mark:                                    | N/A                                                   |
| `nextCursor`                                          | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `data`                                                | [models.Organization](../../models/organization.md)[] | :heavy_check_mark:                                    | N/A                                                   |