# ArimaAlgorithm

## Example Usage

```typescript
import { ArimaAlgorithm } from "openapi/models";

let value: ArimaAlgorithm = {
  type: "arima",
  orderP: 287529,
  orderD: 672667,
  orderQ: 543437,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"arima"*          | :heavy_check_mark: | N/A                |
| `orderP`           | *number*           | :heavy_check_mark: | N/A                |
| `orderD`           | *number*           | :heavy_check_mark: | N/A                |
| `orderQ`           | *number*           | :heavy_check_mark: | N/A                |
| `seasonal`         | *boolean*          | :heavy_minus_sign: | N/A                |