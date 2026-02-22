# WebhookChannel

## Example Usage

```typescript
import { WebhookChannel } from "openapi/models";

let value: WebhookChannel = {
  type: "webhook",
  url: "https://tiny-smog.org",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"webhook"*        | :heavy_check_mark: | N/A                |
| `url`              | *string*           | :heavy_check_mark: | N/A                |
| `secret`           | *string*           | :heavy_minus_sign: | N/A                |