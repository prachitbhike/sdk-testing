# Architecture

## Example Usage

```typescript
import { Architecture } from "openapi/models";

let value: Architecture = "lstm";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"lstm" | "transformer" | "tcn" | Unrecognized<string>
```