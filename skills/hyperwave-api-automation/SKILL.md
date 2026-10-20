---
name: hyperwave-api-automation
description: Script Hyperwave's anonymous public API with the CLI or JavaScript/Python clients, including pagination, batch calls, and retry handling.
---

# Hyperwave API automation

Use this workflow when building a script or integration against Hyperwave's
public HTTP tools. Read the current operation inputs and outputs in
[OpenAPI](https://www.hyperwave.app/openapi.json); the canonical prefix is
`/api/v1/agent`. All operations retrieve public information or calculate numbers.
Call them over HTTPS without credentials or browser cookies.

Choose the user's preferred language or shell. Official JavaScript/TypeScript
and Python clients and the Node CLI are available from the
[developer documentation](https://www.hyperwave.app/docs/developers), with sources
in this repository's `clients/` directories. These clients expose structured
HTTP errors and accept injectable transports for offline verification.

For independent requests, send one bounded batch. Preserve each operation's
unique ID and check every result's status before using its data:

```sh
curl https://www.hyperwave.app/api/v1/agent/batch \
  -H 'Content-Type: application/json' \
  -d '{"operations":[{"id":"targets","operation":"list_export_targets","arguments":{"limit":5}},{"id":"encoding","operation":"describe_wav_encoding","arguments":{"format":"pcm16"}}]}'
```

A batch accepts 1–20 operations. An HTTP 200 envelope can contain failed
individual calls; retain each error's code, message, and hint. Correct 400 inputs
against the schema, handle 404 as missing public content, and honor `Retry-After`
on 429 before a bounded retry. Avoid retry loops without a delay or stopping bound.

For `search_docs` or `list_export_targets`, continue with `next_cursor` until
`has_more` is false when the user needs the full result set. Keep the same query
and filters between pages; a cursor from another request shape is invalid.
Preserve source URLs and distinguish an empty result from a failed request.

Finish with a reproducible command or script, the actual successful results,
and any unresolved per-operation errors. Keep audio processing, project editing,
and cloud-account actions in their supported browser workflows; this API only
exposes the public operations listed in OpenAPI.
