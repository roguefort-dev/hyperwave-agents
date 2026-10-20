# Hyperwave Python client

Official dependency-free client, distributed as a wheel from the product domain:

```sh
pip install https://www.hyperwave.app/downloads/hyperwave_client-1.1.0-py3-none-any.whl
```

```python
from hyperwave_client import HyperwaveClient
client = HyperwaveClient()
result = client.call("calculate_frame_size", {"samplesPerFrame": 2048, "frameCount": 256, "sampleRate": 48000})
page = client.call("search_docs", {"query": "Vital", "limit": 5})
if page["next_cursor"]:
    next_page = client.call("search_docs", {"query": "Vital", "limit": 5, "cursor": page["next_cursor"]})
```

Inputs and outputs come from [OpenAPI](https://www.hyperwave.app/openapi.json). All calls are anonymous and read-only. Errors expose `status`, `code`, `hint`, and `retry_after`; respect 429 and do not retry in a tight loop. `client.batch(operations)` sends up to 20 independent calls and returns individual statuses. Transport and timeout are injectable for tests. No automatic retries or account credentials are used. Publication on PyPI is separate and is not claimed.
