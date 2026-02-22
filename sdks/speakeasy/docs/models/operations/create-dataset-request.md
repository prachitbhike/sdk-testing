# CreateDatasetRequest

## Example Usage

```typescript
import { CreateDatasetRequest } from "openapi/models/operations";

let value: CreateDatasetRequest = {
  orgId: "38bb434f-78bb-4975-a6a4-b55c265b764f",
  projectId: "1ca9a0a3-acc7-46d6-8b0f-af322643c88d",
  body: {
    name: "<value>",
    source: {
      type: "webhook_ingest",
      endpointUrl: "https://irresponsible-willow.biz/",
      secret: "<value>",
    },
  },
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `orgId`                                                | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `projectId`                                            | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |
| `idempotencyKey`                                       | *string*                                               | :heavy_minus_sign:                                     | Prevents duplicate operations when retrying requests.  |
| `body`                                                 | [models.DatasetCreate](../../models/dataset-create.md) | :heavy_check_mark:                                     | N/A                                                    |