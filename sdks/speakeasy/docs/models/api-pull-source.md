# ApiPullSource

## Example Usage

```typescript
import { ApiPullSource } from "openapi/models";

let value: ApiPullSource = {
  type: "api_pull",
  sourceUrl: "https://acceptable-substitution.biz/",
  scheduleCron: "<value>",
};
```

## Fields

| Field                    | Type                     | Required                 | Description              |
| ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| `type`                   | *"api_pull"*             | :heavy_check_mark:       | N/A                      |
| `sourceUrl`              | *string*                 | :heavy_check_mark:       | N/A                      |
| `scheduleCron`           | *string*                 | :heavy_check_mark:       | N/A                      |
| `headers`                | Record<string, *string*> | :heavy_minus_sign:       | N/A                      |