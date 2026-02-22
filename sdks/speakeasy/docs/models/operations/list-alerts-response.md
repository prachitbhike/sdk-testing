# ListAlertsResponse

Paginated list of alerts

## Example Usage

```typescript
import { ListAlertsResponse } from "openapi/models/operations";

let value: ListAlertsResponse = {
  hasMore: false,
  nextCursor: null,
  data: [],
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `hasMore`                               | *boolean*                               | :heavy_check_mark:                      | N/A                                     |
| `nextCursor`                            | *string*                                | :heavy_check_mark:                      | N/A                                     |
| `data`                                  | [models.Alert](../../models/alert.md)[] | :heavy_check_mark:                      | N/A                                     |