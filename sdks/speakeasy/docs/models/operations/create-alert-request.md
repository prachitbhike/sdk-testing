# CreateAlertRequest

## Example Usage

```typescript
import { CreateAlertRequest } from "openapi/models/operations";

let value: CreateAlertRequest = {
  orgId: "1733ae9e-4359-4c32-93dc-d9d9361b03e4",
  projectId: "b34782fb-6b57-4082-bb8f-fd517b22eebc",
  body: {
    name: "<value>",
    modelId: "89f46abd-0153-456e-8d79-e3b7bc3bbd49",
    condition: {
      type: "threshold",
      metric: "<value>",
      operator: "gt",
      value: 501.87,
      durationMinutes: 845576,
    },
    channels: [
      {
        type: "webhook",
        url: "https://boring-joy.biz",
      },
    ],
  },
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `orgId`                                               | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `projectId`                                           | *string*                                              | :heavy_check_mark:                                    | N/A                                                   |
| `idempotencyKey`                                      | *string*                                              | :heavy_minus_sign:                                    | Prevents duplicate operations when retrying requests. |
| `body`                                                | [models.AlertCreate](../../models/alert-create.md)    | :heavy_check_mark:                                    | N/A                                                   |