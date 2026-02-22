# StreamProgressEvent

## Example Usage

```typescript
import { StreamProgressEvent } from "openapi/models";

let value: StreamProgressEvent = {
  event: "progress",
  data: {
    pct: 7742.71,
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `event`                                                                   | *"progress"*                                                              | :heavy_check_mark:                                                        | N/A                                                                       |
| `data`                                                                    | [models.StreamProgressEventData](../models/stream-progress-event-data.md) | :heavy_check_mark:                                                        | N/A                                                                       |