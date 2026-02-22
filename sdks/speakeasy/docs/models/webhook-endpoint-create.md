# WebhookEndpointCreate

## Example Usage

```typescript
import { WebhookEndpointCreate } from "openapi/models";

let value: WebhookEndpointCreate = {
  url: "https://naughty-partridge.com",
  events: [
    "alert.triggered",
  ],
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `url`                                                                             | *string*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |
| `events`                                                                          | [models.WebhookEndpointCreateEvent](../models/webhook-endpoint-create-event.md)[] | :heavy_check_mark:                                                                | N/A                                                                               |