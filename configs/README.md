# Chronocast SDK Generator Configurations

This directory contains configuration files for three SDK generator platforms,
all targeting the same OpenAPI specification at `../spec/chronocast.openapi.yaml`.

Each generator produces TypeScript and Python client SDKs from the spec.

---

## 1. Stainless

**Directory:** `stainless/`

Stainless generates idiomatic, hand-polished-quality SDKs with built-in
pagination, streaming, and retry support.

### Prerequisites

```bash
npm install -g stainless
```

### Generate SDKs

```bash
# From the configs/stainless/ directory:
cd configs/stainless

# Generate the TypeScript SDK
stainless generate --target node --config stainless.yml

# Generate the Python SDK
stainless generate --target python --config stainless.yml
```

### Configuration Reference

- `stainless.yml` -- Main configuration defining resources, pagination schemes,
  streaming support, environments, and target language settings.

### Key Features Configured

- Cursor-based pagination (`CursorPage`) and offset-based pagination (`OffsetPage`)
- SSE streaming for the prediction endpoint (`streaming: true` request flag)
- Hierarchical resource structure (organizations > projects > datasets/models/alerts)
- Idempotency header support (`Idempotency-Key`)
- Multiple auth schemes (API key and Bearer token)

---

## 2. Fern

**Directory:** `fern/`

Fern generates type-safe SDKs with automatic request/response validation
and ergonomic client interfaces.

### Prerequisites

```bash
npm install -g fern-api
```

### Generate SDKs Locally

```bash
# From the configs/fern/ directory:
cd configs/fern

# Generate both TypeScript and Python SDKs locally
fern generate --group local

# Generate only TypeScript
fern generate --group local --generator fernapi/fern-typescript-node-sdk
```

### Publish SDKs

```bash
# Publish the TypeScript SDK to npm
# Requires NPM_TOKEN environment variable
fern generate --group publish-npm

# Publish the Python SDK to PyPI
# Requires PYPI_TOKEN environment variable
fern generate --group publish-pypi
```

### Configuration Reference

- `fern.config.json` -- Workspace-level configuration (organization name, version).
- `generators.yml` -- Generator configuration defining SDK targets, output
  locations, and publish settings.

### Key Features Configured

- OpenAPI spec input (no Fern Definition conversion needed)
- Local generation output to `../../sdks/typescript` and `../../sdks/python`
- npm publishing for `@chronocast/sdk`
- PyPI publishing for `chronocast`
- GitHub repository integration (placeholder repos)

---

## 3. Speakeasy

**Directory:** `speakeasy/`

Speakeasy generates production-ready SDKs with automatic retries, pagination
helpers, and comprehensive error handling.

### Prerequisites

```bash
# Install the Speakeasy CLI
brew install speakeasy-api/homebrew-tap/speakeasy

# Or via npm
npm install -g @speakeasy-api/speakeasy
```

### Generate SDKs

```bash
# From the configs/speakeasy/ directory:
cd configs/speakeasy

# Run the full workflow (generates all configured targets)
speakeasy run

# Generate only the TypeScript SDK
speakeasy generate sdk --lang typescript --out ../../sdks/typescript

# Generate only the Python SDK
speakeasy generate sdk --lang python --out ../../sdks/python
```

### Configuration Reference

- `gen.yaml` -- Main generation configuration defining SDK class name, target
  language settings, package names, and code style options.
- `.speakeasy/workflow.yaml` -- Workflow configuration defining OpenAPI source
  inputs and SDK output targets.
- `.speakeasy/gen.yaml` -- Generation metadata (managed by Speakeasy CLI).

### Key Features Configured

- Dual target generation (TypeScript and Python)
- Flat response format for ergonomic API access
- Union-based enums for TypeScript
- Automatic code sample generation
- npm and PyPI publishing configuration

---

## Directory Structure

```
configs/
  README.md                          # This file
  stainless/
    stainless.yml                    # Stainless SDK config
  fern/
    fern.config.json                 # Fern workspace config
    generators.yml                   # Fern generator targets
  speakeasy/
    gen.yaml                         # Speakeasy generation config
    .speakeasy/
      workflow.yaml                  # Speakeasy workflow (sources + targets)
      gen.yaml                       # Speakeasy generation metadata
```

## Environment Variables

| Variable              | Used By              | Purpose                          |
|-----------------------|----------------------|----------------------------------|
| `CHRONOCAST_API_KEY`  | Stainless            | Default API key for generated SDK|
| `NPM_TOKEN`          | Fern, Speakeasy      | npm publish authentication       |
| `PYPI_TOKEN`         | Fern, Speakeasy      | PyPI publish authentication      |

## OpenAPI Spec

All three generators consume the same OpenAPI 3.1 specification located at:

```
../spec/chronocast.openapi.yaml
```

The spec defines the Chronocast predictive analytics platform API with
resources for Organizations, Members, Projects, Datasets, Models, Predictions,
Alerts, Operations, and Webhooks.
