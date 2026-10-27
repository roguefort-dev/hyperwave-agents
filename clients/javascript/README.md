# Hyperwave public API client and CLI

Official, dependency-free client for the anonymous Hyperwave API. No account or API key is required. Install the downloadable package:

```sh
npm install https://www.hyperwave.app/downloads/hyperwave-public-api-1.1.0.tgz
npx hyperwave calculate_frame_size '{"samplesPerFrame":2048,"frameCount":256,"sampleRate":48000}'
```

```js
import { HyperwaveClient } from "@hyperwave/public-api";
const client = new HyperwaveClient();
const page = await client.call("list_export_targets", { limit: 10 });
const next = page.next_cursor
  ? await client.call("list_export_targets", {
      limit: 10,
      cursor: page.next_cursor,
    })
  : null;
const results = await client.batch([
  {
    id: "pcm",
    operation: "describe_wav_encoding",
    arguments: { format: "pcm16" },
  },
]);
```

Inputs and outputs are defined in [OpenAPI](https://www.hyperwave.app/openapi.json). Reuse `next_cursor` only with the same operation and filters. Requests time out after 30 seconds; `fetch`, `baseUrl`, and `timeoutMs` are injectable. HTTP failures throw `HyperwaveApiError` with `status`, `code`, `hint`, and `retryAfter`. The client does not retry automatically. Honor `Retry-After` on 429. Public utilities are read-only and idempotent; batch results must be checked individually. The same call method supports create_session, read_session, edit_session and other session tools. Session mutations require a private workspace token and revision; reread after conflicts or uncertain responses before retrying.

The CLI accepts JSON as its second argument or on stdin. It writes results to stdout and structured failures to stderr with a nonzero exit code. `--base-url=` supports local verification. Temporary sessions support bounded server rendering and collaborative browser editing. Cloud account-library operations are outside this API.

This package is downloadable directly from Hyperwave; publication in the npm registry is a separate step and is not claimed.
