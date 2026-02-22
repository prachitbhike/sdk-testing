# ListAlertsRequest

## Example Usage

```typescript
import { ListAlertsRequest } from "openapi/models/operations";

let value: ListAlertsRequest = {
  orgId: "94bb2b83-649e-4725-b5d4-166dc37b72df",
  projectId: "08947696-b833-4014-b64e-20f72df0d292",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `orgId`                                    | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `projectId`                                | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `cursor`                                   | *string*                                   | :heavy_minus_sign:                         | Opaque cursor for cursor-based pagination. |
| `limit`                                    | *number*                                   | :heavy_minus_sign:                         | N/A                                        |