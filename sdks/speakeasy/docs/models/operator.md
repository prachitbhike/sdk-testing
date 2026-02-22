# Operator

## Example Usage

```typescript
import { Operator } from "openapi/models";

let value: Operator = "lt";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"gt" | "gte" | "lt" | "lte" | "eq" | Unrecognized<string>
```