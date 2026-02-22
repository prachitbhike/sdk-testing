# DataSource


## Supported Types

### `models.FileUploadSource`

```typescript
const value: models.FileUploadSource = {
  type: "file_upload",
  filename: "example.file",
  contentType: "<value>",
};
```

### `models.WebhookIngestSource`

```typescript
const value: models.WebhookIngestSource = {
  type: "webhook_ingest",
  endpointUrl: "https://superb-lava.name/",
  secret: "<value>",
};
```

### `models.ApiPullSource`

```typescript
const value: models.ApiPullSource = {
  type: "api_pull",
  sourceUrl: "https://acceptable-substitution.biz/",
  scheduleCron: "<value>",
};
```

