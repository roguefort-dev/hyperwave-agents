---
name: hyperwave-export-planning
description: Plan a Hyperwave wavetable export for a specific software synth or hardware module, including frame layout and import steps.
---

# Hyperwave export planning

Look up the destination with `list_export_targets` on the public MCP server
`https://www.hyperwave.app/mcp`. Each result gives the documented import format,
import steps, caveats, and manufacturer sources. Use its exact slug to filter.
If the destination is absent, describe that evidence gap rather than claiming
compatibility.

Use `calculate_frame_size` to estimate float32 mono WAV samples, bytes, and
duration from `samplesPerFrame`, `frameCount`, and `sampleRate`. Its arithmetic
does not validate a synthesizer's format or render audio. Hardware requiring
PCM or vendor conversion needs the target-specific workflow from the registry.

The user creates, listens to, and exports the table in
[the browser editor](https://www.hyperwave.app/app). The public tools cannot
edit projects or upload audio. They need no account, key, or payment.

For HTTP access, read [the OpenAPI specification](https://www.hyperwave.app/openapi.json)
and POST JSON to `/api/agent/list_export_targets` or `/api/agent/calculate_frame_size`.
Finish with the intended layout, any conversion step, and a link to the target's
source-linked guide. Preserve uncertainty where a device has not been tested.
