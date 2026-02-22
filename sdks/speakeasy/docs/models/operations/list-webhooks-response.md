# ListWebhooksResponse

Paginated list of webhook endpoints

## Example Usage

```typescript
import { ListWebhooksResponse } from "openapi/models/operations";

let value: ListWebhooksResponse = {
  hasMore: true,
  nextCursor: "<value>",
  data: [],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `hasMore`                                                    | *boolean*                                                    | :heavy_check_mark:                                           | N/A                                                          |
| `nextCursor`                                                 | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `data`                                                       | [models.WebhookEndpoint](../../models/webhook-endpoint.md)[] | :heavy_check_mark:                                           | N/A                                                          |