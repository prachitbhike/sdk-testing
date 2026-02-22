# Chronocast SDK Generator Evaluation

Cross-comparison of **Stainless**, **Fern**, and **Speakeasy** using the Chronocast predictive analytics API.

## How to Use This Scorecard

Run each generator against `spec/chronocast.openapi.yaml`, then exercise the generated
SDKs with the test scripts in `tests/`. Score each dimension 1-5:

| Score | Meaning |
|-------|---------|
| 1 | Broken / not supported |
| 2 | Works but painful — bad ergonomics or missing pieces |
| 3 | Functional — gets the job done with minor issues |
| 4 | Good — clean API, minor polish needed |
| 5 | Excellent — delightful DX, nothing to improve |

---

## 1. Spec Ingestion

Did the generator consume the full OpenAPI 3.1 spec without errors?

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Accepts OpenAPI 3.1 without errors | | | | |
| Handles all `$ref` references correctly | | | | |
| Handles `allOf` composition (pagination wrappers) | | | | |
| Handles `oneOf` with discriminator (DataSource, Algorithm, AlertCondition, NotificationChannel, PredictionStreamEvent) | | | | |
| Handles `const` values on discriminator fields | | | | |
| Handles recursive schema (EnsembleAlgorithm → Algorithm[]) | | | | |
| Handles `nullable` fields | | | | |
| Handles `additionalProperties` (metadata maps) | | | | |
| Handles `format: binary` (file upload/download) | | | | |
| Handles multiple `content` types on same response (JSON + SSE) | | | | |
| Handles inline schemas (PATCH bodies) | | | | |
| **Subtotal** | /55 | /55 | /55 | |

---

## 2. Type Generation

Quality and correctness of generated types/interfaces.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Discriminated unions are real tagged unions (not just `any`) | | | | DataSource, Algorithm, AlertCondition |
| Enum types are type-safe (not just strings) | | | | plan, status, role, operator, etc. |
| Nested object types are properly extracted | | | | ColumnSchema, ConfidenceInterval |
| Nullable fields use proper language idioms (`T | null`, `Optional[T]`) | | | | |
| `additionalProperties` maps have correct key/value types | | | | metadata, headers, input_overrides |
| Date-time fields use proper date types (or at least typed strings) | | | | |
| UUID fields are typed or validated | | | | |
| Recursive types compile without issues | | | | EnsembleAlgorithm |
| Inline request body types are named sensibly | | | | PATCH org, PATCH alert |
| **Subtotal** | /45 | /45 | /45 | |

---

## 3. Resource Organization

How methods are grouped and named in the generated SDK.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Logical resource grouping (org.projects.datasets.list) | | | | |
| Method names follow language conventions | | | | |
| Deep nesting is handled well (4-level paths) | | | | |
| Operation on sub-resource doesn't require re-specifying parent IDs unnecessarily | | | | |
| Singleton actions named well (train, predict, verify) | | | | |
| Tags/operationIds respected in naming | | | | |
| **Subtotal** | /30 | /30 | /30 | |

---

## 4. Pagination

Auto-pagination support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Cursor-based auto-pagination (async iterator) | | | | All list endpoints |
| Offset-based pagination support | | | | Alert history |
| `.hasMore()` / `.nextPage()` helpers | | | | |
| Raw page access (for manual control) | | | | |
| Both pagination styles coexist in same SDK | | | | |
| **Subtotal** | /25 | /25 | /25 | |

---

## 5. Streaming (SSE)

Server-Sent Events support for the prediction endpoint.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| SSE response parsed into typed events | | | | PredictionStreamEvent |
| Async iterator / stream interface | | | | |
| Discriminated event types (point, progress, done, error) | | | | |
| Graceful handling of stream errors | | | | |
| Can choose between streaming and non-streaming at call site | | | | |
| **Subtotal** | /25 | /25 | /25 | |

---

## 6. File Upload & Download

Multipart upload and binary download support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Multipart file upload with typed fields | | | | uploadDataset |
| Accepts File / Buffer / ReadableStream | | | | |
| Binary download returns stream or buffer | | | | downloadDataset |
| Content-Type handling is correct | | | | |
| **Subtotal** | /20 | /20 | /20 | |

---

## 7. Async Operations

Long-running operation support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Polling helper (`.poll()` or `.waitForCompletion()`) | | | | trainModel |
| Typed operation status enum | | | | |
| Cancel operation support | | | | |
| Progress callback / event | | | | |
| **Subtotal** | /20 | /20 | /20 | |

---

## 8. Error Handling

Typed errors and retry behavior.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Typed error classes per HTTP status | | | | 400, 401, 403, 404, 429, 500 |
| Error body parsed into ApiError schema | | | | |
| Field-level validation errors accessible | | | | FieldError[] |
| Rate limit errors include retry-after info | | | | |
| Auto-retry on 429 with backoff | | | | |
| Auto-retry on 5xx with backoff | | | | |
| Idempotency key passed through correctly | | | | |
| **Subtotal** | /35 | /35 | /35 | |

---

## 9. Authentication

Multiple auth scheme support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| API key auth (header) configured at client level | | | | |
| Bearer token auth supported | | | | Webhook endpoints |
| Per-operation security override works | | | | |
| OAuth2 client credentials flow | | | | |
| **Subtotal** | /20 | /20 | /20 | |

---

## 10. Documentation & DX

Generated docs, README, and overall developer experience.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Generated README with install + quickstart | | | | |
| Per-method JSDoc / docstrings from spec descriptions | | | | |
| Code examples in README | | | | |
| IDE autocomplete works well | | | | |
| Package is tree-shakeable (TS) | | | | |
| Generated code is readable (not wall of generated noise) | | | | |
| **Subtotal** | /30 | /30 | /30 | |

---

## 11. Customization & Escape Hatches

How much control do you have over the generated output?

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Rename types/methods via config | | | | |
| Add custom methods/helpers | | | | |
| Override serialization behavior | | | | |
| Custom request/response hooks | | | | |
| Extend generated client class | | | | |
| **Subtotal** | /25 | /25 | /25 | |

---

## Summary

| Category | Weight | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|:-:|
| Spec Ingestion | 10% | /55 | /55 | /55 |
| Type Generation | 15% | /45 | /45 | /45 |
| Resource Organization | 10% | /30 | /30 | /30 |
| Pagination | 10% | /25 | /25 | /25 |
| Streaming (SSE) | 10% | /25 | /25 | /25 |
| File Upload/Download | 5% | /20 | /20 | /20 |
| Async Operations | 10% | /20 | /20 | /20 |
| Error Handling | 10% | /35 | /35 | /35 |
| Authentication | 5% | /20 | /20 | /20 |
| Documentation & DX | 10% | /30 | /30 | /30 |
| Customization | 5% | /25 | /25 | /25 |
| **Weighted Total** | 100% | | | |

---

## Qualitative Notes

### Stainless
_Strengths:_

_Weaknesses:_

_Bugs / Issues:_

### Fern
_Strengths:_

_Weaknesses:_

_Bugs / Issues:_

### Speakeasy
_Strengths:_

_Weaknesses:_

_Bugs / Issues:_

---

## Recommendation

_TBD after evaluation_
