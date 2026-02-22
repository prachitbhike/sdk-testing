# WebhookEndpoint

## Example Usage

```typescript
import { WebhookEndpoint } from "openapi/models";

let value: WebhookEndpoint = {
  id: "fcc5b48a-b855-4706-a154-b6a608acc4a6",
  url: "https://grubby-lava.net/",
  events: [],
  active: true,
  createdAt: new Date("2024-02-13T11:13:23.682Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `url`                                                                                         | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `events`                                                                                      | [models.WebhookEndpointEvent](../models/webhook-endpoint-event.md)[]                          | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `secret`                                                                                      | *string*                                                                                      | :heavy_minus_sign:                                                                            | HMAC-SHA256 signing secret (only returned on creation)                                        |
| `active`                                                                                      | *boolean*                                                                                     | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |