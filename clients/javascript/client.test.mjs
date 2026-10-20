import { test } from "node:test";
import assert from "node:assert/strict";
import { HyperwaveClient, HyperwaveApiError } from "./index.mjs";

test("client uses the versioned anonymous transport and preserves batch IDs", async () => {
  const calls = [];
  const client = new HyperwaveClient({
    baseUrl: "https://example.test",
    fetch: async (url, init) => {
      calls.push({ url: String(url), ...init });
      return Response.json({
        results: [{ id: "layout", status: 200, data: { formatTag: 1 } }],
      });
    },
  });
  const operations = [
    {
      id: "layout",
      operation: "describe_wav_encoding",
      arguments: { format: "pcm16" },
    },
  ];
  const result = await client.batch(operations);
  assert.equal(result.results[0].id, "layout");
  assert.equal(calls[0].url, "https://example.test/api/v1/agent/batch");
  assert.equal(calls[0].credentials, "omit");
  assert.deepEqual(JSON.parse(calls[0].body), { operations });
  assert.equal(calls[0].headers["API-Version"], "1");
});
for (const status of [400, 404, 429, 500])
  test(`client preserves actionable HTTP ${status} failures`, async () => {
    const client = new HyperwaveClient({
      fetch: async () =>
        Response.json(
          {
            error: {
              code: "EXAMPLE",
              message: "Example failure",
              hint: "Correct the input",
            },
          },
          { status, headers: { "Retry-After": "10" } },
        ),
    });
    await assert.rejects(
      client.call("search_docs", { query: "Vital" }),
      (error) =>
        error instanceof HyperwaveApiError &&
        error.status === status &&
        error.code === "EXAMPLE" &&
        error.retryAfter === "10",
    );
  });
