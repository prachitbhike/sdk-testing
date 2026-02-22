# PredictionStreamEvent


## Supported Types

### `models.StreamPointEvent`

```typescript
const value: models.StreamPointEvent = {
  event: "point",
  data: {
    timestamp: new Date("2024-01-04T03:51:10.448Z"),
    value: 4417.04,
  },
};
```

### `models.StreamProgressEvent`

```typescript
const value: models.StreamProgressEvent = {
  event: "progress",
  data: {
    pct: 7742.71,
  },
};
```

### `models.StreamDoneEvent`

```typescript
const value: models.StreamDoneEvent = {
  event: "done",
  data: {
    predictionId: "4066eb9a-5553-40b6-8e48-9e2e7e416690",
  },
};
```

### `models.StreamErrorEvent`

```typescript
const value: models.StreamErrorEvent = {
  event: "error",
  data: {
    code: "<value>",
    message: "<value>",
  },
};
```

