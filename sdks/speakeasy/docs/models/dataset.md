# Dataset

## Example Usage

```typescript
import { Dataset } from "openapi/models";

let value: Dataset = {
  id: "c9b01052-9db6-43f6-90ab-e3cddebf25ac",
  projectId: "51808c71-c5eb-417e-a30a-913d406787ca",
  name: "<value>",
  format: "parquet",
  sizeBytes: 557121,
  status: "uploading",
  createdAt: new Date("2026-12-06T19:43:14.330Z"),
  source: {
    type: "webhook_ingest",
    endpointUrl: "https://silky-scale.info/",
    secret: "<value>",
  },
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `projectId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `name`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `format`                                                                                      | [models.Format](../models/format.md)                                                          | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `rowCount`                                                                                    | *number*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `columns`                                                                                     | [models.ColumnSchema](../models/column-schema.md)[]                                           | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `sizeBytes`                                                                                   | *number*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `status`                                                                                      | [models.DatasetStatus](../models/dataset-status.md)                                           | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `source`                                                                                      | *models.DataSource*                                                                           | :heavy_check_mark:                                                                            | N/A                                                                                           |