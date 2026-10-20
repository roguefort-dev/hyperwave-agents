export class HyperwaveApiError extends Error {
  constructor(status, payload, retryAfter) {
    const error = payload?.error;
    super(error?.message ?? `Hyperwave returned HTTP ${status}.`);
    this.name = "HyperwaveApiError";
    this.status = status;
    this.code = error?.code ?? "HTTP_ERROR";
    this.hint = error?.hint;
    this.retryAfter = retryAfter;
  }
}

/** Transport can be injected for offline tests; this client never sends credentials. */
export class HyperwaveClient {
  constructor({
    baseUrl = "https://www.hyperwave.app",
    fetch: transport = globalThis.fetch,
    timeoutMs = 30000,
  } = {}) {
    this.baseUrl = baseUrl;
    this.transport = transport;
    this.timeoutMs = timeoutMs;
  }
  async call(operation, args = {}, { signal } = {}) {
    if (!/^[a-z][a-z0-9_]*$/.test(operation))
      throw new TypeError("Use an operation name from /openapi.json.");
    const timeout = AbortSignal.timeout(this.timeoutMs);
    const response = await this.transport(
      new URL(`/api/v1/agent/${operation}`, this.baseUrl),
      {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json", "API-Version": "1" },
        body: JSON.stringify(args),
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      },
    );
    const payload = await response.json().catch(() => null);
    if (!response.ok)
      throw new HyperwaveApiError(
        response.status,
        payload,
        response.headers.get("retry-after"),
      );
    if (!payload || typeof payload !== "object")
      throw new Error("Hyperwave returned an invalid JSON response.");
    return payload;
  }
  batch(operations, options) {
    return this.call("batch", { operations }, options);
  }
}
