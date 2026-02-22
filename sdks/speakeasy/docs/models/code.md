# Code

## Example Usage

```typescript
import { Code } from "openapi/models";

let value: Code = "required";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"required" | "invalid_format" | "out_of_range" | "too_long" | "too_short" | "unique_violation" | Unrecognized<string>
```