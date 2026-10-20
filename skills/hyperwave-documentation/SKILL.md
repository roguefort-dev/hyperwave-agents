---
name: hyperwave-documentation
description: Find Hyperwave wavetable tutorials, export references, and glossary definitions with links to the published sources.
---

# Hyperwave documentation

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
An empty result means no matching entry was found. The public tools are free
and anonymous, and cannot read private projects or perform audio editing.
For editing and playback, direct the user to the browser editor.
