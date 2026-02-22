# GetDatasetResponse

## Example Usage

```typescript
import { GetDatasetResponse } from "openapi/models/operations";

let value: GetDatasetResponse = {
  headers: {},
  result: {
    id: "47a15d16-c5d1-4301-9b69-67bc0a0134d1",
    projectId: "464f1c89-0f49-4e65-aea1-9d150fbbb156",
    name: "<value>",
    format: "parquet",
    sizeBytes: 43862,
    status: "uploading",
    createdAt: new Date("2025-07-27T15:22:38.430Z"),
    source: {
      type: "file_upload",
      filename: "example.file",
      contentType: "<value>",
    },
  },
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `headers`                                 | Record<string, *string*[]>                | :heavy_check_mark:                        | N/A                                       |
| `result`                                  | [models.Dataset](../../models/dataset.md) | :heavy_check_mark:                        | N/A                                       |