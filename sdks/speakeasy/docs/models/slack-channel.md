# SlackChannel

## Example Usage

```typescript
import { SlackChannel } from "openapi/models";

let value: SlackChannel = {
  type: "slack",
  channelId: "<id>",
  webhookUrl: "https://unrealistic-angle.info/",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"slack"*          | :heavy_check_mark: | N/A                |
| `channelId`        | *string*           | :heavy_check_mark: | N/A                |
| `webhookUrl`       | *string*           | :heavy_check_mark: | N/A                |