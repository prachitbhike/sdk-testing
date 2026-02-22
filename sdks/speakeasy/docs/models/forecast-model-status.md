# ForecastModelStatus

## Example Usage

```typescript
import { ForecastModelStatus } from "openapi/models";

let value: ForecastModelStatus = "failed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"draft" | "training" | "trained" | "failed" | "archived" | Unrecognized<string>
```