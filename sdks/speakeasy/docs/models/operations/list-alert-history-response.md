# ListAlertHistoryResponse

Paginated alert event history (offset-based)

## Example Usage

```typescript
import { ListAlertHistoryResponse } from "openapi/models/operations";

let value: ListAlertHistoryResponse = {
  total: 305950,
  offset: 499958,
  limit: 312181,
  data: [],
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `total`                                            | *number*                                           | :heavy_check_mark:                                 | N/A                                                |
| `offset`                                           | *number*                                           | :heavy_check_mark:                                 | N/A                                                |
| `limit`                                            | *number*                                           | :heavy_check_mark:                                 | N/A                                                |
| `data`                                             | [models.AlertEvent](../../models/alert-event.md)[] | :heavy_check_mark:                                 | N/A                                                |