# UploadDatasetRequest

## Example Usage

```typescript
import { UploadDatasetRequest } from "openapi/models/operations";

// No examples available for this model
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `orgId`                                                                                       | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `projectId`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `idempotencyKey`                                                                              | *string*                                                                                      | :heavy_minus_sign:                                                                            | Prevents duplicate operations when retrying requests.                                         |
| `body`                                                                                        | [operations.UploadDatasetRequestBody](../../models/operations/upload-dataset-request-body.md) | :heavy_check_mark:                                                                            | N/A                                                                                           |