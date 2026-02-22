# Direction

## Example Usage

```typescript
import { Direction } from "openapi/models";

let value: Direction = "either";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"increasing" | "decreasing" | "either" | Unrecognized<string>
```