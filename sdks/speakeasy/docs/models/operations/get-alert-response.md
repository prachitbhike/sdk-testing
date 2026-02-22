# GetAlertResponse

## Example Usage

```typescript
import { GetAlertResponse } from "openapi/models/operations";

let value: GetAlertResponse = {
  headers: {
    "key": [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    "key1": [
      "<value 1>",
    ],
    "key2": [],
  },
  result: {
    id: "607d36a8-9e38-4096-8183-be1556e797db",
    projectId: "2c689913-8c22-4aa7-b714-84e0a4ce68c9",
    name: "<value>",
    modelId: "df102ab5-dc5c-44f8-b3df-5f13156664cd",
    condition: {
      type: "threshold",
      metric: "<value>",
      operator: "gte",
      value: 9948.9,
      durationMinutes: 827714,
    },
    channels: [],
    enabled: false,
    createdAt: new Date("2026-09-29T02:36:42.500Z"),
  },
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `headers`                             | Record<string, *string*[]>            | :heavy_check_mark:                    | N/A                                   |
| `result`                              | [models.Alert](../../models/alert.md) | :heavy_check_mark:                    | N/A                                   |