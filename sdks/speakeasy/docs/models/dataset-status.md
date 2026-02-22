# DatasetStatus

## Example Usage

```typescript
import { DatasetStatus } from "openapi/models";

let value: DatasetStatus = "failed";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"uploading" | "processing" | "ready" | "failed" | Unrecognized<string>
```