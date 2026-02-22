# StreamErrorEvent

## Example Usage

```typescript
import { StreamErrorEvent } from "openapi/models";

let value: StreamErrorEvent = {
  event: "error",
  data: {
    code: "<value>",
    message: "<value>",
  },
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `event`                                                             | *"error"*                                                           | :heavy_check_mark:                                                  | N/A                                                                 |
| `data`                                                              | [models.StreamErrorEventData](../models/stream-error-event-data.md) | :heavy_check_mark:                                                  | N/A                                                                 |