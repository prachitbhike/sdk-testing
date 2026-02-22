# ColumnSchema

## Example Usage

```typescript
import { ColumnSchema } from "openapi/models";

let value: ColumnSchema = {
  name: "<value>",
  dtype: "boolean",
  nullable: false,
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `name`                             | *string*                           | :heavy_check_mark:                 | N/A                                |
| `dtype`                            | [models.Dtype](../models/dtype.md) | :heavy_check_mark:                 | N/A                                |
| `nullable`                         | *boolean*                          | :heavy_check_mark:                 | N/A                                |