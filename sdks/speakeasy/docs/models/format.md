# Format

## Example Usage

```typescript
import { Format } from "openapi/models";

let value: Format = "csv";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"csv" | "parquet" | "json" | Unrecognized<string>
```