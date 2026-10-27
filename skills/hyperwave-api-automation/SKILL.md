---
name: hyperwave-api-automation
description: Script Hyperwave's anonymous public API with the CLI or JavaScript/Python clients, including pagination, batch calls, and retry handling.
---

# Hyperwave API automation

Use this workflow when building a script or integration against Hyperwave's
public HTTP tools. Read the current operation inputs and outputs in
[OpenAPI](https://www.hyperwave.app/openapi.json); the canonical prefix is
`/api/v1/agent`. Documentation and format utilities require no credentials or
browser cookies. Temporary collaborative workspaces use the private token
returned by `create_session`; they never use the user's account cookies.

For collaborative sound design:

1. Call `create_session` and give its `editorUrl` to the user. Keep the session
   token private and out of logs. The workspace expires after 24 hours; normal
   Save as preset keeps a permanent copy without closing collaboration.
2. Use `describe_nodes` to discover types, defaults, numeric controls, and graph
   sources. `read_session` supplies the actual graph ids and revision.
3. Submit atomic `edit_session` changes with that `baseRevision`. Paths use
   stable node ids; connections are addressed as `targetNodeId:targetInputKey`.
   Create nodes from the supplied templates. Independent edits merge; on 409,
   reread and reconcile the conflicting fields with the user's changes.
4. Use `checkpoint_session` before experiments. Shared versions can be restored
   through `restore_session` or the editor history. `wait_for_changes` waits up
   to 20 seconds for user edits; use bounded waits while actively collaborating.
5. `render_session` requires the exact revision and returns preview, WAV, and
   preset links valid for five minutes. Rendering uses Hyperwave's actual WASM
   engine. Respect render limits; open the editor for larger work.

After an uncertain mutation response, reread the session before retrying. Do
not blindly replay edits, overwrite user changes, or close a session until the
user asks. Session project storage is separate from analytics; do not send chat
transcripts or prompts as session metadata.

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
and any unresolved per-operation errors. Session tools edit only their temporary
workspace. Access to account libraries and unrelated local projects stays in
the normal browser workflows.
