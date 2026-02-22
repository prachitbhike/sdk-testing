# FieldError

## Example Usage

```typescript
import { FieldError } from "openapi/models";

let value: FieldError = {
  field: "<value>",
  message: "<value>",
  code: "too_long",
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `field`                          | *string*                         | :heavy_check_mark:               | N/A                              |
| `message`                        | *string*                         | :heavy_check_mark:               | N/A                              |
| `code`                           | [models.Code](../models/code.md) | :heavy_check_mark:               | N/A                              |