# CreateOrganizationRequest

## Example Usage

```typescript
import { CreateOrganizationRequest } from "openapi/models/operations";

let value: CreateOrganizationRequest = {
  body: {
    name: "<value>",
    slug: "<value>",
  },
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `idempotencyKey`                                                 | *string*                                                         | :heavy_minus_sign:                                               | Prevents duplicate operations when retrying requests.            |
| `body`                                                           | [models.OrganizationCreate](../../models/organization-create.md) | :heavy_check_mark:                                               | N/A                                                              |