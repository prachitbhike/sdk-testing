# Algorithm


## Supported Types

### `models.ArimaAlgorithm`

```typescript
const value: models.ArimaAlgorithm = {
  type: "arima",
  orderP: 287529,
  orderD: 672667,
  orderQ: 543437,
};
```

### `models.NeuralAlgorithm`

```typescript
const value: models.NeuralAlgorithm = {
  type: "neural",
  architecture: "tcn",
  layers: 797243,
  hiddenSize: 430059,
};
```

### `models.EnsembleAlgorithm1`

```typescript
const value: models.EnsembleAlgorithm1 = {
  type: "ensemble",
  subAlgorithms: [],
  combinationMethod: "weighted",
};
```

