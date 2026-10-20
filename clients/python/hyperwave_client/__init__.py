"""Official dependency-free client for Hyperwave's anonymous public API."""
import json
from urllib.error import HTTPError
from urllib.request import Request, urlopen


class HyperwaveApiError(Exception):
    def __init__(self, status, payload, retry_after=None):
        error = payload.get("error", {}) if isinstance(payload, dict) else {}
        super().__init__(error.get("message", f"Hyperwave returned HTTP {status}."))
        self.status = status
        self.code = error.get("code", "HTTP_ERROR")
        self.hint = error.get("hint")
        self.retry_after = retry_after


def _transport(request, timeout):
    try:
        with urlopen(request, timeout=timeout) as response:
            return response.status, response.read(), response.headers
    except HTTPError as error:
        return error.code, error.read(), error.headers


class HyperwaveClient:
    """Inject transport(request, timeout) for offline verification."""
    def __init__(self, base_url="https://www.hyperwave.app", timeout=30, transport=None):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.transport = transport or _transport

    def call(self, operation, arguments=None):
        if not isinstance(operation, str) or not operation or not operation[0].islower() or any(c not in "abcdefghijklmnopqrstuvwxyz0123456789_" for c in operation):
            raise ValueError("Use an operation name from /openapi.json.")
        request = Request(f"{self.base_url}/api/v1/agent/{operation}",
                          data=json.dumps(arguments if arguments is not None else {}).encode("utf-8"),
                          headers={"Content-Type": "application/json", "API-Version": "1"}, method="POST")
        status, raw, headers = self.transport(request, self.timeout)
        try:
            payload = json.loads(raw)
        except (ValueError, UnicodeDecodeError):
            payload = None
        if status < 200 or status >= 300:
            raise HyperwaveApiError(status, payload, headers.get("Retry-After"))
        if not isinstance(payload, dict):
            raise ValueError("Hyperwave returned an invalid JSON response.")
        return payload

    def batch(self, operations):
        return self.call("batch", {"operations": operations})
