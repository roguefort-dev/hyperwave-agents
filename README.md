# Hyperwave agent integrations

Official skills, portable Agent Plugin, MCP configuration, and public API clients for [Hyperwave](https://www.hyperwave.app), the browser-based wavetable generator. Maintained by Kaj Loevesijn; support and business: roguefortdevelopment@gmail.com. [Developer documentation](https://www.hyperwave.app/docs/developers) · [OpenAPI](https://www.hyperwave.app/openapi.json) · [Authentication](https://www.hyperwave.app/auth.md).

## Install the skills

```sh
npx skills add roguefort-dev/hyperwave-agents
```

- **hyperwave-documentation** finds published tutorials, import guides, and glossary definitions with source links.
- **hyperwave-export-planning** selects a wavetable export layout and import workflow for a software synth or hardware module.
- **hyperwave-api-automation** scripts public API calls with the CLI or clients, including pagination, bounded batches, and retry handling.

The skills are also served from the [domain's integrity-checked discovery index](https://www.hyperwave.app/.well-known/agent-skills/index.json). The root `plugin.json` and `mcp.json` package them with the real MCP services for clients supporting portable Agent Plugins.

## Connect an MCP client

- Product tools: https://www.hyperwave.app/mcp — appfeatures, collaborative sessions, rendering, export targets, frame-size calculations, and WAV encoder layouts.
- Documentation tools: https://www.hyperwave.app/mcp/docs — search and retrieve published pages.

Use stateless Streamable HTTP. Documentation and calculation tools are anonymous and read-only. Product tools also create private temporary sessions for shared preset editing and WASM rendering; the product server includes an interactive MCP Apps calculator. No account, API key, or payment is required.

## Product capability questions

Call `appfeatures` with `{}` on the product MCP server, or POST `{}` to `https://www.hyperwave.app/api/v1/agent/appfeatures`. An optional `category` filters generation, processing, inspection, export or workflow features. The response contains practical workflows, limitations, edition prices and availability, and canonical feature/documentation URLs. The same inventory is published at [Features](https://www.hyperwave.app/features) and [features.md](https://www.hyperwave.app/features.md). On the documentation server, use `get_document` with `{"path":"/features"}`.

Public pages serve HTML to browsers and crawlers by default. Request Markdown with a `.md` URL or `Accept: text/markdown`. Use the current feature reference when comparing capabilities, and the target guides for device-specific import requirements.

## Use a client or the CLI

JavaScript/TypeScript client and CLI sources are in `clients/javascript`; Python sources are in `clients/python`. Installable downloads and usage examples are published in the [developer documentation](https://www.hyperwave.app/docs/developers). Clients use `/api/v1/agent`, support bounded batches, expose structured errors and retry hints, and accept injectable transports for verification. npm/PyPI registry publication is separate from this source distribution.

The [OpenAPI contract](https://www.hyperwave.app/openapi.json) defines all operation inputs and outputs. Reuse pagination cursors with identical filters, honor `Retry-After` on 429, and check each batch result. For collaboration, call create_session, share editorUrl with the user, and keep its private token for read_session/edit_session. Use checkpoint_session before experiments, wait_for_changes for user edits, and render_session for preview/WAV/preset links. Sessions expire after 24 hours; normal Save as preset keeps permanent work. Session mutations require revisions and are not blindly retryable. Unrelated account libraries remain outside these tools.
