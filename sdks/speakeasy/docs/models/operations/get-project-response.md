# GetProjectResponse

## Example Usage

```typescript
import { GetProjectResponse } from "openapi/models/operations";

let value: GetProjectResponse = {
  headers: {},
  result: {
    id: "997cd9d0-71ba-4367-bee2-480cec61ff78",
    orgId: "adf489d7-adfd-4fb3-9a7f-b7ec44504ad5",
    name: "<value>",
    createdAt: new Date("2025-10-18T19:42:32.253Z"),
    updatedAt: new Date("2024-01-23T23:33:38.969Z"),
  },
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `headers`                                 | Record<string, *string*[]>                | :heavy_check_mark:                        | N/A                                       |
| `result`                                  | [models.Project](../../models/project.md) | :heavy_check_mark:                        | N/A                                       |