# Chronocast — SDK Generator Cross-Comparison

A realistic predictive analytics API designed to stress-test SDK generators.
Compares **Stainless**, **Fern**, and **Speakeasy** across every pattern that
matters for production SDKs.

## Project Structure

```
spec/                          OpenAPI 3.1 spec (single source of truth)
server/                        Fastify mock server implementing all endpoints
configs/
  stainless/                   Stainless generator config
  fern/                        Fern generator config
  speakeasy/                   Speakeasy generator config
tests/
  test-runner.js               Cross-platform test harness
  adapters/                    Per-SDK adapters (uniform interface)
    raw-fetch.js               Reference adapter using raw fetch
    stainless.js               → created after generating SDK
    fern.js                    → created after generating SDK
    speakeasy.js               → created after generating SDK
docs/
  EVALUATION.md                Scoring rubric and comparison matrix
```

## Quick Start

### 1. Start the mock server

```bash
cd server && npm install && cd ..
npm run server
# → http://localhost:3737/v1
```

### 2. Verify with raw fetch tests

```bash
cd tests && npm install && cd ..
npm run test:raw
```

### 3. Generate SDKs

See `configs/README.md` for per-platform instructions.

### 4. Run SDK tests

```bash
npm run test:stainless
npm run test:fern
npm run test:speakeasy
# or all at once:
npm run test:all
```

## API Patterns Tested

| Pattern | Endpoint(s) | What It Tests |
|---|---|---|
| CRUD | Organizations, Projects, Models, Alerts | Basic resource operations |
| Cursor pagination | All list endpoints | Auto-pagination helpers |
| Offset pagination | Alert history | Alternative pagination style |
| Discriminated unions (`oneOf`) | DataSource, Algorithm, AlertCondition, NotificationChannel, PredictionStreamEvent | Tagged union type generation |
| Recursive types | EnsembleAlgorithm → Algorithm[] | Recursive schema handling |
| `allOf` composition | Pagination wrappers, BatchPredictionRequest | Schema composition |
| File upload (multipart) | Dataset upload | Multipart form handling |
| File download (binary) | Dataset download | Binary response handling |
| SSE streaming | Prediction (streaming mode) | Server-Sent Events support |
| Async operations | Model training → poll operation | Long-running operation patterns |
| Batch operations | Batch predictions | Array request/response with mixed results |
| Multiple auth schemes | API key (default), Bearer (webhooks), OAuth2 | Auth configuration |
| Idempotency keys | All POST endpoints | Header passthrough |
| Typed errors | 400, 401, 404, 429 | Error class generation |
| Field validation errors | Create with invalid data | Nested error details |
| Webhook verification | Verify signature endpoint | Crypto helper generation |
| Rate limit headers | All responses | Header parsing |
| Nullable fields | Various (description, metrics, etc.) | Optional type handling |
| Enum types | plan, status, role, operator, etc. | Enum generation |
| `additionalProperties` maps | metadata, headers, input_overrides | Dynamic key types |
| Deep nesting (4 levels) | org → project → dataset/model → sub-resource | Resource hierarchy |

## Evaluation

See `docs/EVALUATION.md` for the full scoring rubric.
