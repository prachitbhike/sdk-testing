# Dtype

## Example Usage

```typescript
import { Dtype } from "openapi/models";

let value: Dtype = "int64";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"float64" | "int64" | "string" | "datetime" | "boolean" | Unrecognized<string>
```