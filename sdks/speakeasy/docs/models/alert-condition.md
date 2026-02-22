# AlertCondition


## Supported Types

### `models.ThresholdCondition`

```typescript
const value: models.ThresholdCondition = {
  type: "threshold",
  metric: "<value>",
  operator: "gte",
  value: 2414.68,
  durationMinutes: 632948,
};
```

### `models.AnomalyCondition`

```typescript
const value: models.AnomalyCondition = {
  type: "anomaly",
  sensitivity: 1785.28,
};
```

### `models.TrendCondition`

```typescript
const value: models.TrendCondition = {
  type: "trend",
  direction: "either",
  slopeThreshold: 2947.02,
  windowSize: 663938,
};
```

