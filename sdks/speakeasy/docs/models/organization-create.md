# OrganizationCreate

## Example Usage

```typescript
import { OrganizationCreate } from "openapi/models";

let value: OrganizationCreate = {
  name: "<value>",
  slug: "<value>",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `name`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `slug`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `plan`                                                                 | [models.OrganizationCreatePlan](../models/organization-create-plan.md) | :heavy_minus_sign:                                                     | N/A                                                                    |
| `metadata`                                                             | Record<string, *string*>                                               | :heavy_minus_sign:                                                     | N/A                                                                    |