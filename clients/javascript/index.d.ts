export declare class HyperwaveApiError extends Error {
  status: number;
  code: string;
  hint?: string;
  retryAfter: string | null;
}
export type BatchOperation = {
  id: string;
  operation: string;
  arguments: Record<string, unknown>;
};
export type BatchResult = {
  id: string;
  operation: string;
  status: number;
  data?: Record<string, unknown>;
  error?: { code: string; message: string; hint: string };
};
export declare class HyperwaveClient {
  constructor(options?: {
    baseUrl?: string;
    fetch?: typeof fetch;
    timeoutMs?: number;
  });
  call<T = Record<string, unknown>>(
    operation: string,
    args?: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ): Promise<T>;
  batch(
    operations: BatchOperation[],
    options?: { signal?: AbortSignal },
  ): Promise<{ results: BatchResult[] }>;
}
