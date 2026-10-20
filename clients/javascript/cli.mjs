#!/usr/bin/env node
import { HyperwaveClient } from "./index.mjs";

const args = process.argv.slice(2);
if (args.includes("--help") || args.length === 0) {
  console.log(
    'Usage: hyperwave <operation> [JSON] [--base-url=https://www.hyperwave.app]\nRead JSON from stdin when omitted. Operation schemas: https://www.hyperwave.app/openapi.json\nExample: hyperwave calculate_frame_size \'{"samplesPerFrame":2048,"frameCount":256,"sampleRate":48000}\'\nNo account or API key is needed. A batch accepts {"operations":[{"id":"example","operation":"list_export_targets","arguments":{}}]}.',
  );
} else {
  try {
    const base = args.find((arg) => arg.startsWith("--base-url="))?.slice(11);
    const positional = args.filter((arg) => !arg.startsWith("--base-url="));
    if (positional.length > 2)
      throw new Error(
        "Expected one operation and one JSON argument; quote JSON as a single shell argument.",
      );
    let input = positional[1];
    if (input === undefined && !process.stdin.isTTY) {
      input = "";
      for await (const chunk of process.stdin) input += chunk;
    }
    const result = await new HyperwaveClient({ baseUrl: base }).call(
      positional[0],
      JSON.parse(input?.trim() || "{}"),
    );
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(
      JSON.stringify({
        error: {
          code: error.code ?? "CLI_ERROR",
          message: error.message,
          hint: error.hint,
          retryAfter: error.retryAfter,
        },
      }),
    );
    process.exitCode = 1;
  }
}
