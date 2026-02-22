# ListModelsResponse

Paginated list of models

## Example Usage

```typescript
import { ListModelsResponse } from "openapi/models/operations";

let value: ListModelsResponse = {
  hasMore: false,
  nextCursor: "<value>",
  data: [],
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `hasMore`                                                | *boolean*                                                | :heavy_check_mark:                                       | N/A                                                      |
| `nextCursor`                                             | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `data`                                                   | [models.ForecastModel](../../models/forecast-model.md)[] | :heavy_check_mark:                                       | N/A                                                      |