import { env } from "@/lib/env"
import type { ApiResponse } from "@/types/api"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type ApiOptions = RequestInit & {
  token?: string
  timeoutMs?: number
}

export async function api<T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<ApiResponse<T>> {
  const { token, timeoutMs = 10000, ...fetchOptions } = options ?? {}

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...fetchOptions.headers,
      },
      signal: controller.signal,
      ...fetchOptions,
    })

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      throw new ApiError(
        error?.message ?? `Request failed: ${res.status}`,
        res.status,
      )
    }

    return res.json()
  } catch (err) {
    if (err instanceof ApiError) throw err
    if ((err as Error).name === "AbortError")
      throw new ApiError("Request timed out", 408)
    throw new ApiError("Network error", 0)
  } finally {
    clearTimeout(timeout)
  }
}
