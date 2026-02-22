# GetOrganizationResponse

## Example Usage

```typescript
import { GetOrganizationResponse } from "openapi/models/operations";

let value: GetOrganizationResponse = {
  headers: {
    "key": [
      "<value 1>",
      "<value 2>",
    ],
    "key1": [],
  },
  result: {
    id: "8a3caa80-4e33-4752-a6fc-fecead8ea541",
    name: "<value>",
    slug: "<value>",
    plan: "pro",
    createdAt: new Date("2024-04-01T02:25:41.562Z"),
  },
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `headers`                                           | Record<string, *string*[]>                          | :heavy_check_mark:                                  | N/A                                                 |
| `result`                                            | [models.Organization](../../models/organization.md) | :heavy_check_mark:                                  | N/A                                                 |