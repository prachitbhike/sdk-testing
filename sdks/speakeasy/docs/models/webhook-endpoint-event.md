# WebhookEndpointEvent

## Example Usage

```typescript
import { WebhookEndpointEvent } from "openapi/models";

let value: WebhookEndpointEvent = "dataset.ready";
```

## Values

This is an open enum. Unrecognized values will be captured as the `Unrecognized<string>` branded type.

```typescript
"model.training.started" | "model.training.completed" | "model.training.failed" | "prediction.completed" | "alert.triggered" | "alert.resolved" | "dataset.ready" | "dataset.failed" | Unrecognized<string>
```