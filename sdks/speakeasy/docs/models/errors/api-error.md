# ApiError

Missing or invalid authentication

## Example Usage

```typescript
import { ApiError } from "openapi/models/errors";

// No examples available for this model
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `type`                                             | [models.Type](../../models/type.md)                | :heavy_check_mark:                                 | N/A                                                |
| `message`                                          | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `requestId`                                        | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `details`                                          | [models.FieldError](../../models/field-error.md)[] | :heavy_minus_sign:                                 | N/A                                                |