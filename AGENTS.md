# Hyperwave public integrations

For API or MCP changes, read the published contracts at https://www.hyperwave.app/docs/developers and https://www.hyperwave.app/openapi.json. Keep clients compatible with the documented versioned routes and structured errors.

Use public documentation queries and numeric examples when verifying an integration. Keep credentials, private presets, and unreleased audio out of examples and commits.

Validate changed JavaScript clients with `node --test clients/javascript/client.test.mjs`; validate changed Python clients with `python -m unittest discover -s clients/python`. Fetch each changed skill or discovery link before declaring it usable.

Documentation and format utilities are anonymous and read-only. Temporary workspaces require the session token returned by create_session. Keep tokens and private editor links out of examples, logs, analytics, and commits. Session mutations are not automatically retryable: reread after uncertain responses and conflicts. Never overwrite concurrent user edits blindly. Keep batch calls limited to the read-only utility operations.
