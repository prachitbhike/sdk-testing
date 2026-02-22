# SDK Generators in the Age of LLM-Native Coding

An analysis of **Stainless**, **Fern**, and **Speakeasy** through the lens of AI-assisted
development — where the primary consumer of SDK code is increasingly a language model,
not a human reading documentation.

This report builds on the findings in [EVALUATION.md](./EVALUATION.md) and reframes them
around the properties that determine how effectively an LLM can use, understand, and debug
a generated SDK.

---

## Why LLM-Native Coding Changes the Evaluation

Traditional SDK evaluation weights documentation, IDE autocomplete, and visual code
readability. When an LLM is writing the code, a different set of properties dominate:

| Traditional Priority | LLM-Native Priority |
|---|---|
| Comprehensive README | Compact code that fits in context |
| Visual code readability | Predictable, convention-following API surface |
| IDE autocomplete | Safe defaults that prevent silent bugs |
| JSDoc annotations | Working examples (tests) as few-shot prompts |
| Tree-shaking for bundle size | Clear error messages for self-correction loops |

The shift is fundamental: LLMs don't browse documentation, hover over types in an IDE,
or skim a README. They work from patterns in training data, from code they can pull into
context, and from error messages they receive when something fails.

---

## Evaluation Criteria

### 1. Context Window Efficiency

LLMs reason better when they can hold more of the relevant SDK in their working context.
Every additional file or line of code competes for space with the user's application code,
the conversation history, and the task instructions.

| Metric | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|
| Source files | **43** | 394 | 185 |
| Lines of code | **5,174** | 13,299 | 18,395 |
| Exported types/interfaces | **218** | 413 | 298 |
| Serialization layer files | **0** | 126 | 139 (Zod) |
| Package size (excl node_modules) | **~300 KB** | 1.7 MB | ~2 MB |

**Stainless is 2.5–3.5x more compact than the competition.** An LLM agent can realistically
hold the entire Stainless SDK in context alongside application code. With Fern or Speakeasy,
the agent works with fragments, increasing the risk of hallucinated method signatures,
incorrect parameter types, and missed patterns.

Fern's 126-file serialization layer and Speakeasy's 139 Zod schema definitions are
particularly costly: they're internal machinery that an LLM might attempt to understand,
reference, or modify — burning context on code that has no bearing on SDK usage.

**Score: Stainless 5, Fern 2, Speakeasy 3**

---

### 2. API Surface Predictability

LLMs generate tokens probabilistically. The patterns most heavily represented in training
data are the patterns an LLM is most likely to produce correctly without examples. This
creates a strong advantage for SDKs that follow the dominant conventions established by
widely-used libraries.

#### Method naming and resource access

| Pattern | Stainless | Fern | Speakeasy |
|---|---|---|---|
| Create | `client.organizations.create()` | `client.createOrganization()` | `sdk.organizations.createOrganization()` |
| Retrieve | `client.organizations.retrieve(id)` | `client.getOrganization(id)` | `sdk.organizations.getOrganization({ orgId })` |
| List | `client.organizations.list()` | `client.listOrganizations()` | `sdk.organizations.listOrganizations()` |
| Nested | `client.organizations.projects.datasets.upload()` | `client.datasets.uploadDataset()` | `sdk.datasets.uploadDataset()` |

Stainless follows the exact pattern used by the **OpenAI**, **Anthropic**, and **Stripe**
SDKs — three of the most heavily represented API clients in LLM training data (all generated
by Stainless). An LLM that has seen `openai.chat.completions.create()` will correctly
predict `client.organizations.create()` without any examples.

Fern and Speakeasy use verb-noun method names (`createOrganization`, `getOrganization`)
that are common in Java-style SDKs but less prevalent in the TypeScript/Python ecosystem
that dominates modern LLM training corpora. The flat resource layout also requires the LLM
to already know which top-level namespace a method lives under — with Stainless, the nested
hierarchy makes the path inferrable from the API structure.

#### Parameter passing

| SDK | Call pattern |
|---|---|
| Stainless | `client.organizations.create({ name, slug })` |
| Fern | `client.createOrganization({ name, slug })` |
| Speakeasy | `sdk.organizations.createOrganization({ body: { name, slug } })` |

Speakeasy's extra `body` nesting is a common source of LLM errors. Models frequently
"forget" the wrapper and pass parameters directly, producing a type error that requires
a correction round-trip.

#### Response access

| SDK | Response pattern |
|---|---|
| Stainless | `const org = await client.organizations.create(...)` |
| Fern | `const org = await client.createOrganization(...)` |
| Speakeasy | `const { result } = await sdk.organizations.createOrganization(...)` |

Speakeasy's response wrapping (`{ headers, result }`) adds another unwrapping step that
LLMs frequently omit.

**Score: Stainless 5, Fern 3, Speakeasy 2**

---

### 3. Safe Defaults (Pit of Success)

LLMs don't read changelogs, best-practice guides, or migration notes. They write what
seems correct and move on. SDKs that do the right thing by default prevent entire
categories of silent bugs in LLM-generated code.

| Safe Default | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|
| Auto-pagination (async iterator) | **Yes** | No | No |
| Automatic idempotency keys | **Yes** (UUID4) | No (manual header) | No (manual header) |
| Retry with backoff (default on) | Yes | Yes | Yes |
| Dual auth in constructor | **Yes** | No (single scheme) | No (single scheme) |

**Auto-pagination** is the most impactful. An LLM will write:

```typescript
for await (const org of client.organizations.list()) {
  console.log(org.name);
}
```

With Stainless, this iterates through all pages automatically. With Fern or Speakeasy,
this code doesn't compile — the LLM must know to implement manual cursor tracking with
a while loop, `hasMore` checks, and cursor forwarding. Most LLMs won't do this unprompted.

**Automatic idempotency** is similarly invisible but critical. Every Stainless POST request
gets a UUID4 idempotency key. An LLM writing retry logic or error handling code with
Fern/Speakeasy will silently create duplicate resources on retries unless it knows to set
the header manually.

**Score: Stainless 5, Fern 2, Speakeasy 2**

---

### 4. Few-Shot Examples (Generated Tests)

LLMs perform dramatically better with examples. When an LLM agent needs to use an SDK,
the first thing it typically does is search for usage patterns — tests, examples, or
README snippets.

| Metric | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|
| Generated test files | **15** | 0 | 0 |
| Test lines of code | **1,847** | 0 | 0 |
| README with code examples | Yes (342 lines) | No README | Yes (646 lines) |
| API reference doc | Yes (api.md) | None | Per-resource docs |

Stainless's 15 generated test files are essentially a complete set of few-shot examples
showing the correct calling convention for every resource and method. An LLM agent can
read a single test file and immediately know how to construct requests, handle responses,
and manage pagination for that resource.

Fern generates no README and no tests — an LLM has nothing to reference except the source
code itself, which at 394 files is too large to effectively search.

Speakeasy's 646-line README is useful, but a README is a single document covering all
use cases at a high level. Test files provide granular, per-resource, copy-pasteable
patterns that are more directly useful as few-shot prompts.

**Score: Stainless 5, Fern 1, Speakeasy 3**

---

### 5. Error Feedback for Self-Correction

When LLM-generated code fails, the quality of the error message determines whether the
LLM can self-correct in one iteration or enters a debugging spiral.

| Error Property | Stainless | Fern | Speakeasy |
|---|---|---|---|
| Typed error classes | 13 classes (8 HTTP status) | 6 classes (4 HTTP status) | 11 classes (2 hierarchies) |
| Granular status mapping | 400, 401, 403, 404, 409, 422, 429, 5xx | 400, 401, 404, 429 | Generic ApiError + SDKError |
| Request validation | Server-side only | Server-side only | **Client-side Zod validation** |
| Validation error formatting | API-dependent | API-dependent | **`SDKValidationError.pretty()`** |
| Idempotency on retry | Automatic | Manual | Manual |

**Speakeasy has the strongest error feedback.** Its Zod runtime validation catches malformed
requests *before* they hit the network, producing error messages like:

```
SDKValidationError: Invalid request parameters
  - name: Required
  - slug: Expected string, received number
```

This is immediately actionable for an LLM. Stainless and Fern send the invalid request to
the server, and the error quality depends entirely on the API's error response format.

However, Stainless's **granular error class hierarchy** (13 classes mapping to specific HTTP
statuses) gives the LLM more structured information to work with in catch blocks. An LLM
can write `catch (e) { if (e instanceof RateLimitError) ... }` and handle specific failure
modes, whereas Speakeasy's flatter hierarchy provides less signal.

**Score: Stainless 4, Fern 3, Speakeasy 5**

---

### 6. Codebase Navigability for LLM Agents

When an LLM agent needs to explore the SDK (to understand a type, trace an error, or find
a method), the file structure and code organization directly impact how many tool calls
are required and how likely the agent is to find what it needs.

| Navigation Factor | Stainless | Fern | Speakeasy |
|---|---|---|---|
| Files to explore | **43** | 394 | 185 |
| Index/barrel files | Few | ~100 index.ts files | Moderate |
| Resource → file mapping | 1:1, clear naming | Many indirection layers | Moderate indirection |
| Internal vs public code ratio | Mostly public API | Heavy internal machinery | Heavy internal machinery |

With Stainless, an LLM agent performing a file search for "dataset" will find
`resources/datasets.ts` and have everything it needs in one file. With Fern, the same
search returns hits across `api/types/`, `api/resources/`, `serialization/types/`,
`serialization/resources/`, and multiple `index.ts` barrel files — the agent must make
several read calls to find the actual method implementation.

**Score: Stainless 5, Fern 2, Speakeasy 3**

---

### 7. Training Data Familiarity

A factor unique to the LLM-native evaluation: how heavily represented is each SDK's
output pattern in existing LLM training data?

Stainless generates the official SDKs for:
- **OpenAI** (the single most-used API in LLM-generated code)
- **Anthropic**
- **Stripe** (the most widely referenced payments SDK)
- **Cloudflare**
- **Lithic**, **Modern Treasury**, and others

This means LLMs have been trained on millions of code samples that follow Stainless's
exact patterns. When a model writes `client.resources.method()` with positional
params and async iterators, it's drawing on deeply-ingrained patterns from these SDKs.

Fern and Speakeasy generate SDKs for various companies, but none with the training-data
dominance of OpenAI or Stripe. Their patterns are present but less reinforced.

**Score: Stainless 5, Fern 3, Speakeasy 3**

---

## Summary Scores

| Criterion | Weight | Stainless | Fern | Speakeasy |
|---|:-:|:-:|:-:|:-:|
| Context Window Efficiency | 25% | **5** | 2 | 3 |
| API Surface Predictability | 20% | **5** | 3 | 2 |
| Safe Defaults | 15% | **5** | 2 | 2 |
| Few-Shot Examples | 15% | **5** | 1 | 3 |
| Error Feedback | 10% | 4 | 3 | **5** |
| Codebase Navigability | 10% | **5** | 2 | 3 |
| Training Data Familiarity | 5% | **5** | 3 | 3 |
| **Weighted Total** | **100%** | **4.90** | **2.20** | **2.70** |

---

## Conclusions

### Stainless is the clear winner for LLM-native development

The combination of compact output (fits in context), convention-following patterns (matches
OpenAI/Stripe/Anthropic training data), safe defaults (auto-pagination, auto-idempotency),
and generated tests (few-shot examples) creates a compounding advantage. Each property
reinforces the others: compact code means more fits in context, which means the LLM can
see the patterns, which means it writes correct code, which means fewer error-correction
loops.

Its weaknesses from the traditional evaluation — cloud-only generation, CLI requiring
interactive TTY, SSE streaming gaps — are operational concerns for the SDK *producer*, not
the SDK *consumer*. An LLM writing application code against the generated SDK is unaffected
by how the SDK was generated.

### Speakeasy is the runner-up, primarily on error feedback

Speakeasy's Zod runtime validation gives LLM agents the best self-correction signal when
they construct invalid requests. The `SDKValidationError.pretty()` output is immediately
actionable. The tree-shakeable standalone functions in `funcs/` also allow an LLM to import
a single operation without understanding the class hierarchy, which can reduce the context
needed for narrow tasks.

However, Speakeasy's 3.5x code volume, verbose calling patterns (`{ body: { ... } }`),
response wrapping, and flat resource layout all work against it. The Zod validation
advantage is offset by the higher probability of the LLM making an error in the first place
due to the less intuitive API surface.

### Fern is the weakest fit for LLM-native coding

No README, no tests, 394 files, verbose method names, and a 126-file serialization layer
that consumes context without aiding SDK usage. The zero-dependency property that is Fern's
strength in traditional evaluation is irrelevant to an LLM — models don't manage
`node_modules` or worry about supply chain security.

### The broader implication

As LLM-native coding becomes the dominant mode of software development, SDK generators
should optimize for:

1. **Minimalism** — every line of generated code must earn its place
2. **Convention** — follow the patterns most represented in training data
3. **Safety** — make the default path the correct path
4. **Examples** — generate tests and usage patterns, not just types and methods
5. **Feedback** — produce actionable error messages that enable single-iteration correction

Stainless currently leads on 1–4. Speakeasy leads on 5. No generator excels at all five
yet, but Stainless is closest to the ideal.
