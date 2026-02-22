# WebhookIngestSource

## Example Usage

```typescript
import { WebhookIngestSource } from "openapi/models";

let value: WebhookIngestSource = {
  type: "webhook_ingest",
  endpointUrl: "https://superb-lava.name/",
  secret: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"webhook_ingest"* | :heavy_check_mark: | N/A                |
| `endpointUrl`      | *string*           | :heavy_check_mark: | N/A                |
| `secret`           | *string*           | :heavy_check_mark: | N/A                |