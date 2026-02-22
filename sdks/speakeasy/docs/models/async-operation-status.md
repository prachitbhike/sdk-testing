# AsyncOperationStatus

## Example Usage

```typescript
import { AsyncOperationStatus } from "openapi/models";

let value: AsyncOperationStatus = "pending";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"pending" | "running" | "succeeded" | "failed" | "cancelled" | Unrecognized<string>
```