# StreamDoneEvent

## Example Usage

```typescript
import { StreamDoneEvent } from "openapi/models";

let value: StreamDoneEvent = {
  event: "done",
  data: {
    predictionId: "4066eb9a-5553-40b6-8e48-9e2e7e416690",
  },
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `event`                                                           | *"done"*                                                          | :heavy_check_mark:                                                | N/A                                                               |
| `data`                                                            | [models.StreamDoneEventData](../models/stream-done-event-data.md) | :heavy_check_mark:                                                | N/A                                                               |