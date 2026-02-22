# DatasetCreate

## Example Usage

```typescript
import { DatasetCreate } from "openapi/models";

let value: DatasetCreate = {
  name: "<value>",
  source: {
    type: "file_upload",
    filename: "example.file",
    contentType: "<value>",
  },
};
```

## Fields

| Field               | Type                | Required            | Description         |
| ------------------- | ------------------- | ------------------- | ------------------- |
| `name`              | *string*            | :heavy_check_mark:  | N/A                 |
| `source`            | *models.DataSource* | :heavy_check_mark:  | N/A                 |