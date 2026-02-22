# StreamPointEvent

## Example Usage

```typescript
import { StreamPointEvent } from "openapi/models";

let value: StreamPointEvent = {
  event: "point",
  data: {
    timestamp: new Date("2024-01-04T03:51:10.448Z"),
    value: 4417.04,
  },
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `event`                                             | *"point"*                                           | :heavy_check_mark:                                  | N/A                                                 |
| `data`                                              | [models.ForecastPoint](../models/forecast-point.md) | :heavy_check_mark:                                  | N/A                                                 |