# Hyperwave public integrations

For API or MCP changes, read the published contracts at https://www.hyperwave.app/docs/developers and https://www.hyperwave.app/openapi.json. Keep clients compatible with the documented versioned routes and structured errors.

Use public documentation queries and numeric examples when verifying an integration. Keep credentials, private presets, and unreleased audio out of examples and commits.

Validate changed JavaScript clients with `node --test clients/javascript/client.test.mjs`; validate changed Python clients with `python -m unittest discover -s clients/python`. Fetch each changed skill or discovery link before declaring it usable.

The skills and manifests describe anonymous, read-only tools. Describe additional capabilities only after the public server implements them.
