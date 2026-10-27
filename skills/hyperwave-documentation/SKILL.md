---
name: hyperwave-documentation
description: Answer Hyperwave feature and pricing questions or find wavetable tutorials, export references, and glossary definitions with published source links.
---

# Hyperwave documentation

For product capabilities, pricing or comparisons, call `appfeatures` with `{}`
on `https://www.hyperwave.app/mcp`. On the documentation server, retrieve
`/features` with `get_document`. Use the returned current features, workflows,
limitations and edition availability, and cite their canonical URLs. The public
fallback is [the features reference](https://www.hyperwave.app/features.md).

Use `search_docs` on `https://www.hyperwave.app/mcp/docs` with the user's
wavetable topic or destination synthesizer. Retrieve a useful result in full
with `get_document`, passing its canonical `path`. Cite that page when using
its instructions; manufacturer format claims should retain the linked sources
and the difference between a documentation check and a hands-on device test.

When MCP is unavailable, start at
[the documentation index](https://www.hyperwave.app/docs/llms.txt).
Append `.md` to public content paths, such as `/guides/vital.md`, or request
`Accept: text/markdown`. The HTTP API is described at
[openapi.json](https://www.hyperwave.app/openapi.json).

Search is retrieval over public material, without an LLM-generated answer.
An empty result means no matching entry was found. Documentation tools are free,
anonymous and read-only. For editing, the product MCP server offers temporary
collaborative sessions and bounded rendering; the browser editor supports local
work. Read the developer contract before starting a session.
