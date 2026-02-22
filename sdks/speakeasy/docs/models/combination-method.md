# CombinationMethod

## Example Usage

```typescript
import { CombinationMethod } from "openapi/models";

let value: CombinationMethod = "average";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"average" | "weighted" | "stacking" | Unrecognized<string>
```