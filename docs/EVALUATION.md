# Chronocast SDK Generator Evaluation

Cross-comparison of **Stainless**, **Fern**, and **Speakeasy** using the Chronocast predictive analytics API.

## How to Use This Scorecard

Run each generator against `spec/chronocast.openapi.yaml`, then exercise the generated
SDKs with the test scripts in `tests/`. Score each dimension 1-5:

| Score | Meaning |
|-------|---------|
| 1 | Broken / not supported |
| 2 | Works but painful -- bad ergonomics or missing pieces |
| 3 | Functional -- gets the job done with minor issues |
| 4 | Good -- clean API, minor polish needed |
| 5 | Excellent -- delightful DX, nothing to improve |

---

## Test Results Summary

| Platform | Tests Passed | Score | Notes |
|---|:-:|---|---|
| **Stainless** | **33/33 (100%)** | All pass | Only SDK with auto-pagination |
| **Fern** | **32/33 (97%)** | 1 skip | No auto-pagination |
| **Speakeasy** | **32/33 (97%)** | 1 skip | No auto-pagination |

---

## Quantitative Comparison

| Metric | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|
| Source files | 43 | 394 | 185 |
| Lines of code (src) | 5,174 | 13,299 | 18,395 |
| Exported types/interfaces | 218 | 413 | 298 |
| Resource classes | 10 | 10 | 11 |
| Error classes | 13 | 6 | 11 |
| Generated tests | 15 files (1,847 lines) | 0 | 0 |
| Runtime dependencies | 7 | 0 (self-contained) | 1 (zod) |
| Dev dependencies | 16 | 0 | 6 |
| README quality | 342 lines, comprehensive | None generated | 646 lines, comprehensive |
| API reference doc | api.md (149 lines) | None | Per-resource docs in docs/sdks/ |
| Package size (excl node_modules) | ~300 KB | 1.7 MB | ~2 MB |
| TypeScript strictness | Maximum (17 flags) | N/A (no tsconfig) | Maximum (all strict flags) |
| Module format | CJS + ESM dual | ESM-first (.js imports) | ESM + CJS via tshy |
| Serialization approach | None (native JSON) | Custom schema system (126 files) | Zod schemas (139 z.object defs) |

---

## 1. Spec Ingestion

Did the generator consume the full OpenAPI 3.1 spec without errors?

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Accepts OpenAPI 3.1 without errors | 5 | 3 | 4 | Fern required `_type` rename and config fixes; Speakeasy required `exclusiveMinimum` fix |
| Handles all `$ref` references correctly | 5 | 5 | 4 | Speakeasy warned about missing webhook_id param |
| Handles `allOf` composition (pagination wrappers) | 5 | 5 | 5 | All three handle this cleanly |
| Handles `oneOf` with discriminator | 5 | 4 | 3 | Fern rejects `_`-prefixed discriminators; Speakeasy ignores discriminator mapping when property missing on parent |
| Handles `const` values on discriminator fields | 5 | 4 | 3 | Speakeasy emits warning about discriminator validation failure |
| Handles recursive schema (EnsembleAlgorithm) | 5 | 5 | 3 | Speakeasy warns "Algorithm not registered properly" |
| Handles `nullable` fields | 5 | 5 | 5 | |
| Handles `additionalProperties` (metadata maps) | 5 | 5 | 5 | |
| Handles `format: binary` (file upload/download) | 5 | 5 | 5 | |
| Handles multiple content types (JSON + SSE) | 4 | 4 | 4 | All require adapter work for SSE streaming |
| Handles inline schemas (PATCH bodies) | 5 | 5 | 5 | |
| **Subtotal** | **54/55** | **50/55** | **46/55** | |

---

## 2. Type Generation

Quality and correctness of generated types/interfaces.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Discriminated unions are real tagged unions | 5 | 5 | 4 | Speakeasy uses separate types per variant but discriminator mapping is weaker |
| Enum types are type-safe | 5 | 5 | 4 | Speakeasy uses OpenEnum allowing arbitrary strings alongside known values |
| Nested object types properly extracted | 5 | 5 | 5 | All extract ColumnSchema, ConfidenceInterval, etc. |
| Nullable fields use proper idioms | 5 | 5 | 5 | `T \| null` patterns used correctly |
| `additionalProperties` maps typed correctly | 5 | 5 | 5 | |
| Date-time fields typed | 4 | 4 | 5 | Speakeasy has RFCDate helper; Stainless and Fern use string |
| UUID fields typed/validated | 3 | 3 | 3 | All use string type for UUIDs |
| Recursive types compile without issues | 5 | 5 | 4 | Speakeasy has registration warning |
| Inline request body types named sensibly | 5 | 4 | 4 | Stainless uses OrganizationUpdateParams; Fern/Speakeasy use longer names |
| **Subtotal** | **42/45** | **41/45** | **39/45** | |

---

## 3. Resource Organization

How methods are grouped and named in the generated SDK.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Logical resource grouping | 5 | 3 | 3 | Stainless: nested `client.organizations.projects.datasets`; Fern/Speakeasy: flat `client.datasets` |
| Method names follow language conventions | 5 | 4 | 4 | Stainless: `create/retrieve/update/delete/list`; Fern: `createOrganization/getOrganization`; Speakeasy: same as Fern |
| Deep nesting handled well (4-level paths) | 5 | 3 | 3 | Fern/Speakeasy flatten everything to single level |
| Operation on sub-resource doesn't require re-specifying parent IDs | 3 | 3 | 3 | All require passing orgId/projectId on each call |
| Singleton actions named well | 5 | 4 | 4 | Stainless: `train`, `invite`, `verifySignature`; others use `trainModel`, `inviteMember` |
| Tags/operationIds respected in naming | 5 | 5 | 5 | All respect operationIds |
| **Subtotal** | **28/30** | **22/30** | **22/30** | |

---

## 4. Pagination

Auto-pagination support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Cursor-based auto-pagination (async iterator) | 5 | 1 | 1 | **Only Stainless** provides auto-pagination |
| Offset-based pagination support | 5 | 4 | 4 | All handle the raw request/response; Stainless also auto-paginates |
| `.hasMore()` / `.nextPage()` helpers | 5 | 1 | 1 | Stainless has `hasNextPage()`, `getNextPage()`, `iterPages()` |
| Raw page access (for manual control) | 5 | 5 | 5 | All return full page objects |
| Both pagination styles coexist | 5 | 4 | 4 | All handle both cursor + offset in spec |
| **Subtotal** | **25/25** | **15/25** | **15/25** | |

---

## 5. Streaming (SSE)

Server-Sent Events support for the prediction endpoint.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| SSE response parsed into typed events | 3 | 3 | 4 | Speakeasy has `EventStream<T>` type; Stainless/Fern return JSON response (need adapter) |
| Async iterator / stream interface | 3 | 3 | 4 | Speakeasy's EventStream implements AsyncIterable |
| Discriminated event types | 4 | 4 | 4 | All generate discriminated types for stream events |
| Graceful handling of stream errors | 3 | 3 | 4 | Speakeasy has dedicated error stream handling |
| Choose between streaming/non-streaming at call site | 5 | 5 | 5 | All use `streaming` body flag |
| **Subtotal** | **18/25** | **18/25** | **21/25** | |

---

## 6. File Upload & Download

Multipart upload and binary download support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Multipart file upload with typed fields | 5 | 4 | 4 | Stainless: `Core.multipartFormRequestOptions`; all work correctly |
| Accepts File / Buffer / ReadableStream | 5 | 4 | 4 | Stainless has `Uploadable` type accepting all; `toFile` helper |
| Binary download returns stream or buffer | 5 | 4 | 4 | Stainless returns raw `Response`; others return ArrayBuffer |
| Content-Type handling correct | 5 | 5 | 5 | |
| **Subtotal** | **20/20** | **17/20** | **17/20** | |

---

## 7. Async Operations

Long-running operation support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Polling helper (`.poll()` / `.waitForCompletion()`) | 2 | 2 | 2 | None generate built-in polling helpers |
| Typed operation status enum | 5 | 5 | 5 | All type the status field as a union |
| Cancel operation support | 5 | 5 | 5 | All generate `cancel()` method |
| Progress callback / event | 1 | 1 | 1 | None provide progress events |
| **Subtotal** | **13/20** | **13/20** | **13/20** | |

---

## 8. Error Handling

Typed errors and retry behavior.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Typed error classes per HTTP status | 5 | 4 | 4 | Stainless: 8 status classes (400-500+); Fern: 4 (400,401,404,429); Speakeasy: ApiError + SDKError |
| Error body parsed into ApiError schema | 5 | 5 | 5 | |
| Field-level validation errors accessible | 5 | 4 | 5 | Speakeasy's `SDKValidationError` has `.pretty()` |
| Rate limit errors include retry-after info | 4 | 4 | 4 | All retry on 429 with backoff |
| Auto-retry on 429 with backoff | 5 | 5 | 5 | All implement retry with exponential backoff |
| Auto-retry on 5xx with backoff | 5 | 5 | 5 | |
| Idempotency key passed through correctly | 5 | 4 | 4 | Stainless: `requestOptions.idempotencyKey` (auto-generates if not set); Fern/Speakeasy: manual header |
| **Subtotal** | **34/35** | **31/35** | **32/35** | |

---

## 9. Authentication

Multiple auth scheme support.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| API key auth (header) at client level | 5 | 5 | 5 | |
| Bearer token auth supported | 5 | 4 | 4 | Stainless: dual auth in constructor; others: single scheme |
| Per-operation security override | 3 | 3 | 3 | None provide per-operation overrides cleanly |
| OAuth2 client credentials flow | 2 | 2 | 2 | All declare it in types but none implement the token exchange |
| **Subtotal** | **15/20** | **14/20** | **14/20** | |

---

## 10. Documentation & DX

Generated docs, README, and overall developer experience.

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Generated README with install + quickstart | 5 | 1 | 4 | Fern generates no README; Speakeasy has placeholder package name |
| Per-method JSDoc / docstrings | 4 | 5 | 3 | Fern has `@throws` + `@example` on every method; Stainless has `/** description */` |
| Code examples in README | 5 | 1 | 5 | Speakeasy has comprehensive examples; Fern has none |
| IDE autocomplete works well | 5 | 5 | 5 | All provide full TypeScript types |
| Package is tree-shakeable | 4 | 3 | 5 | Speakeasy provides standalone functions in `funcs/` for tree-shaking |
| Generated code is readable | 5 | 3 | 3 | Stainless: 5K lines, clean; Fern: 13K lines with heavy serialization layer; Speakeasy: 18K lines with Zod schemas |
| **Subtotal** | **28/30** | **18/30** | **25/30** | |

---

## 11. Customization & Escape Hatches

How much control do you have over the generated output?

| Criterion | Stainless | Fern | Speakeasy | Notes |
|---|:-:|:-:|:-:|---|
| Rename types/methods via config | 4 | 4 | 4 | All support config-level overrides |
| Add custom methods/helpers | 4 | 3 | 3 | Stainless has `client.get/post/patch` for undocumented endpoints |
| Override serialization behavior | 3 | 4 | 5 | Speakeasy's Zod layer is most configurable; Fern has full serde layer |
| Custom request/response hooks | 4 | 3 | 5 | Speakeasy has explicit `SDKHooks` system |
| Extend generated client class | 4 | 3 | 3 | Stainless client extends `APIClient` cleanly |
| **Subtotal** | **19/25** | **17/25** | **20/25** | |

---

## Summary

| Category | Weight | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|:-:|
| Spec Ingestion | 10% | **54/55** | 50/55 | 46/55 |
| Type Generation | 15% | **42/45** | 41/45 | 39/45 |
| Resource Organization | 10% | **28/30** | 22/30 | 22/30 |
| Pagination | 10% | **25/25** | 15/25 | 15/25 |
| Streaming (SSE) | 10% | 18/25 | 18/25 | **21/25** |
| File Upload/Download | 5% | **20/20** | 17/20 | 17/20 |
| Async Operations | 10% | 13/20 | 13/20 | 13/20 |
| Error Handling | 10% | **34/35** | 31/35 | 32/35 |
| Authentication | 5% | **15/20** | 14/20 | 14/20 |
| Documentation & DX | 10% | **28/30** | 18/30 | 25/30 |
| Customization | 5% | 19/25 | 17/25 | **20/25** |
| **Raw Total** | | **296/330** | **256/330** | **264/330** |
| **Percentage** | | **89.7%** | **77.6%** | **80.0%** |

### Weighted Scores

| Category | Weight | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|:-:|
| Spec Ingestion (10%) | | 9.8 | 9.1 | 8.4 |
| Type Generation (15%) | | 14.0 | 13.7 | 13.0 |
| Resource Organization (10%) | | 9.3 | 7.3 | 7.3 |
| Pagination (10%) | | 10.0 | 6.0 | 6.0 |
| Streaming (10%) | | 7.2 | 7.2 | 8.4 |
| File Upload/Download (5%) | | 5.0 | 4.3 | 4.3 |
| Async Operations (10%) | | 6.5 | 6.5 | 6.5 |
| Error Handling (10%) | | 9.7 | 8.9 | 9.1 |
| Authentication (5%) | | 3.8 | 3.5 | 3.5 |
| Documentation & DX (10%) | | 9.3 | 6.0 | 8.3 |
| Customization (5%) | | 3.8 | 3.4 | 4.0 |
| **Weighted Total** | **100%** | **88.4** | **75.9** | **78.8** |

---

## Qualitative Notes

### Stainless
_Strengths:_
- **Best-in-class resource organization.** Nested resource accessors (`client.organizations.projects.datasets.upload(...)`) mirror the API hierarchy exactly. This is the most intuitive pattern -- you never wonder where a method lives.
- **Auto-pagination is a killer feature.** `for await (const org of client.organizations.list())` just works. Fern and Speakeasy don't generate this at all.
- **Most compact output.** 5,174 lines of source code vs 13K-18K for competitors. No serialization layer bloat -- the SDK trusts the API's JSON and TypeScript's type system.
- **Generated tests.** 15 test files with 1,847 lines covering every resource. Neither competitor generates any tests.
- **Automatic idempotency.** Generates a UUID4 idempotency key for every non-GET request automatically. Fern and Speakeasy leave this entirely to the developer.
- **API reference doc.** The generated `api.md` provides a clean per-resource method reference with types and HTTP mappings.
- **Dual auth.** Supports both API key and Bearer token simultaneously in the constructor.
- **Cross-runtime support.** Documented support for Node.js, Deno, Bun, Cloudflare Workers, and browsers.

_Weaknesses:_
- **SSE streaming not natively surfaced.** Despite having `streaming` config in `stainless.yml`, the generated SDK returns a JSON response even when `streaming: true` is passed. The adapter had to fall back to raw fetch for SSE.
- **Cloud-based generation.** The SDK is built on Stainless's servers, committed to a GitHub repo (`stainless-sdks/chronocast-eval-node`), and must be cloned. There's no local generation like Fern/Speakeasy offer.
- **CLI requires interactive TTY.** `stl init` and `stl preview` use a terminal UI that can't run in CI or sandboxed environments. Project creation had to be done via the REST API directly.
- **Client class named `Wndrco`.** The client class takes its name from the organization, not the API/project name. This is confusing -- `import Wndrco from 'chronocast'` is not obvious.
- **Empty body Content-Type issue.** The SDK sends `Content-Type: application/json` on POST/DELETE requests with no body, which can cause strict servers to reject the request with 400.
- **No polling helpers.** Despite the spec having async operations, no `.poll()` or `.waitForCompletion()` helpers are generated.

_Bugs / Issues:_
- Pagination config schema expects an array of objects with `name` field, not an object keyed by name (contrary to some documentation examples)
- `stl projects create` requires `targets` (plural), not `target` -- undocumented distinction
- Project names must be globally unique across all Stainless users

### Fern
_Strengths:_
- **Zero runtime dependencies.** The SDK is entirely self-contained with its own HTTP client, schema system, and runtime detection. No external packages needed.
- **Comprehensive serialization layer.** 126 schema files provide bidirectional parse/serialize with explicit wire format types. This is the most robust approach for handling API changes and edge cases.
- **Rich JSDoc annotations.** Every public method has `@param`, `@throws`, and `@example` tags -- best-in-class for IDE intellisense.
- **Retry logic with header awareness.** Respects `Retry-After` and `X-RateLimit-Reset` headers for smart backoff.
- **Clean error dispatch.** Each client method has a switch statement that maps status codes to typed error classes with clear fallthrough to generic errors.

_Weaknesses:_
- **No README generated.** The SDK ships with zero documentation -- no installation guide, no quickstart, no code examples. Developers must read the source code.
- **No tests generated.** Zero test files, unlike Stainless which generates comprehensive test coverage.
- **Flat resource structure.** All resources at one level (`client.datasets`, `client.models`, `client.alerts`) rather than nested. This loses the hierarchical relationship between organizations, projects, and their sub-resources.
- **Verbose method names.** `createOrganization`, `getOrganization`, `listOrganizations` instead of simply `create`, `get`, `list` on a namespaced resource.
- **Massive code output.** 394 files, 13,299 lines -- ~2.5x the Stainless output. The serialization layer alone is 126 files. Many are tiny barrel re-exports (100 index.ts files).
- **No auto-pagination.** List endpoints return raw page objects with no iteration helpers.
- **No package.json or tsconfig.** The output is raw TypeScript files, not a usable npm package. Integration requires additional setup.
- **Spec validation strictness.** Rejected `_type` as a discriminator field name and required config changes (`api.path` deprecated, version `0.x.x` invalid).

_Bugs / Issues:_
- `_type` discriminator rejected (underscore prefix not allowed)
- `api.path` config format deprecated with no clear migration path in error message
- Version `0.x.x` rejected for remote generation -- needed `fern generator upgrade` to auto-fix
- Duplicate YAML key in config caused silent parse issues

### Speakeasy
_Strengths:_
- **Best SSE streaming support.** `EventStream<T>` implementing `AsyncIterable` is the cleanest streaming abstraction. Proper typed event discrimination with dedicated error handling.
- **Zod-based runtime validation.** Every request is validated before sending, every response is validated before returning. `SDKValidationError.pretty()` gives human-readable error messages. This catches bugs at the SDK boundary.
- **Tree-shakeable standalone functions.** 38 individual function files in `funcs/` allow importing just the operations you need without the full SDK class hierarchy.
- **Comprehensive README.** 646 lines with examples for every use case -- streaming, file uploads, retries, error handling, custom HTTP client, debugging.
- **SDK hooks system.** `SDKHooks` provides lifecycle hooks for request/response interception, more extensible than alternatives.
- **Per-resource documentation.** Generated docs under `docs/sdks/` for each resource group.
- **Smart enum handling.** `OpenEnum<T>` type allows known values plus arbitrary strings, providing type safety without breaking on unknown server values.

_Weaknesses:_
- **Largest code output.** 185 files, 18,395 lines -- ~3.5x the Stainless output. Dual Zod schemas (inbound + outbound) for every type add significant bulk.
- **Flat resource structure.** Same as Fern -- `sdk.organizations`, `sdk.datasets`, `sdk.models` rather than nested hierarchy.
- **Single request object pattern.** Every method takes one object: `sdk.organizations.createOrganization({ idempotencyKey, body: { name, slug } })`. The extra `body` nesting feels verbose compared to Stainless's `client.organizations.create({ name, slug })`.
- **Response wrapping.** Responses are wrapped in `{ headers, result }` which adds an extra unwrapping step for consumers.
- **Placeholder package name.** Generated as `"openapi"` -- the package name is not derived from the spec. README contains `<UNSET>` placeholders.
- **No auto-pagination.** Suggests `x-speakeasy-pagination` extension in validation hints but doesn't generate pagination helpers from standard OpenAPI patterns.
- **No generated tests.** Like Fern, zero test coverage in the output.
- **Discriminator issues.** Warning about `PredictionResult` not having the discriminator property, and `Algorithm` type "not registered properly". These suggest fragility with complex discriminated union patterns.

_Bugs / Issues:_
- `exclusiveMinimum: true` (OAS 3.0 boolean) rejected -- needed conversion to `exclusiveMinimum: 0` (OAS 3.1 number)
- Missing `webhook_id` path parameter not caught until generation
- SSE events required wrapping all fields in `data` object (Speakeasy expects only `event` + `data` fields)
- Duplicate enum schemas not consolidated (generates duplicate types for reused enums)

---

## SDK Architecture Comparison

```
STAINLESS (5K lines)              FERN (13K lines)                 SPEAKEASY (18K lines)
========================          ========================         ========================
index.ts (client class)           Client.ts (root)                 sdk/sdk.ts (root)
  +-- core.ts (APIClient)           +-- BaseClient.ts                +-- lib/sdks.ts (ClientSDK)
  +-- error.ts                      +-- errors/                      +-- models/errors/
  +-- uploads.ts                    +-- core/ (105 files)             +-- lib/ (16 files)
  +-- resources/ (10 classes)       |   +-- fetcher/                  +-- funcs/ (38 functions)
       nested hierarchy             |   +-- schemas/                  +-- sdk/ (9 classes)
                                    +-- api/                          +-- models/ (53 types)
                                    |   +-- types/ (62 files)         +-- models/operations/
                                    |   +-- resources/ (9 dirs)       +-- types/ (14 utility)
                                    +-- serialization/ (126 files)    +-- hooks/
                                         mirrors api/ 1:1
```

| Architecture Decision | Stainless | Fern | Speakeasy |
|---|---|---|---|
| Resource nesting | Hierarchical | Flat | Flat |
| Serialization | Trust JSON | Custom schema layer | Zod runtime validation |
| Module format | CJS + ESM | ESM-first | ESM + CJS (tshy) |
| Code generation target | Cloud (GitHub repo) | Local | Local |
| File upload approach | `Uploadable` union type | FormData wrapper | Custom file handling |
| Error hierarchy depth | 3 levels (13 classes) | 2 levels (6 classes) | 2 hierarchies (11 classes) |
| Idempotency | Automatic (UUID4) | Manual (header) | Manual (header) |
| Testing | Generated (15 files) | None | None |

---

## Recommendation

**Stainless is the clear winner for developer experience.** It scored highest across 9 of 11 evaluation categories, producing the most compact, readable, and ergonomic SDK output. The nested resource pattern, auto-pagination, automatic idempotency, and generated test suite set it apart. At 5K lines vs 13-18K for competitors, it achieves more with significantly less code.

**However, Stainless has notable operational friction:**
- Cloud-only generation (no local `generate` command)
- CLI requires interactive TTY for core workflows
- Project/org naming constraints can be surprising
- SSE streaming needs improvement to match Speakeasy's native EventStream support

**Speakeasy is the runner-up**, excelling in streaming (best SSE support), runtime validation (Zod), extensibility (hooks + tree-shaking), and documentation. It's the most defensive SDK -- validating both inputs and outputs at runtime. The trade-off is code volume (18K lines) and a more verbose API surface.

**Fern produces the most self-contained output** with zero runtime dependencies and a comprehensive serialization layer. However, the lack of README, tests, auto-pagination, and the flat resource structure put it behind. The serialization layer adds significant code volume without proportional DX benefit for most use cases.

### Bottom Line

| If you prioritize... | Choose |
|---|---|
| Developer experience & ergonomics | **Stainless** |
| Runtime type safety & validation | **Speakeasy** |
| Zero dependencies & self-contained output | **Fern** |
| SSE streaming quality | **Speakeasy** |
| Auto-pagination | **Stainless** (only option) |
| Local generation workflow | **Fern** or **Speakeasy** |
| Generated test coverage | **Stainless** (only option) |
