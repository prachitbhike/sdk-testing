# Type

## Example Usage

```typescript
import { Type } from "openapi/models";

let value: Type = "invalid_request";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"invalid_request" | "authentication_error" | "permission_denied" | "not_found" | "rate_limit" | "conflict" | "internal_error" | Unrecognized<string>
```