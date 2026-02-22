# AsyncOperation

## Example Usage

```typescript
import { AsyncOperation } from "openapi/models";

let value: AsyncOperation = {
  id: "798504e4-19cf-4600-91b2-60d4fee52833",
  status: "failed",
  createdAt: new Date("2026-02-04T03:39:55.798Z"),
  updatedAt: new Date("2025-04-14T09:40:00.048Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `status`                                                                                      | [models.AsyncOperationStatus](../models/async-operation-status.md)                            | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `resultUrl`                                                                                   | *string*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `error`                                                                                       | [models.OperationError](../models/operation-error.md)                                         | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `progressPct`                                                                                 | *number*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |