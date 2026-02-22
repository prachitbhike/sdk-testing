# CreateProjectRequest

## Example Usage

```typescript
import { CreateProjectRequest } from "openapi/models/operations";

let value: CreateProjectRequest = {
  orgId: "f2cb3bfb-2af4-45b9-8f43-eb672c56858c",
  body: {
    name: "<value>",
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `orgId`                                                | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `idempotencyKey`                                       | *string*                                               | :heavy_minus_sign:                                     | Prevents duplicate operations when retrying requests.  |
| `body`                                                 | [models.ProjectCreate](../../models/project-create.md) | :heavy_check_mark:                                     | N/A                                                    |