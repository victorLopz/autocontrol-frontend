import { env } from "@/shared/infrastructure/config/env";
import {
  buildDefaultHeaders,
  handleHttpError
} from "@/shared/infrastructure/http/interceptors";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

class HttpClient {
  private readonly baseUrl = env.NEXT_PUBLIC_API_BASE_URL;

  async request<TResponse, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
  ): Promise<TResponse> {
    const { method = "GET", body, headers, cache = "no-store", next } = options;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: buildDefaultHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next
    });

    if (!response.ok) {
      await handleHttpError(response);
    }

    return response.json() as Promise<TResponse>;
  }

  get<TResponse>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) {
    return this.request<TResponse>(endpoint, {
      ...options,
      method: "GET"
    });
  }

  post<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions<TBody>, "method" | "body">
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "POST",
      body
    });
  }

  put<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions<TBody>, "method" | "body">
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "PUT",
      body
    });
  }

  patch<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions<TBody>, "method" | "body">
  ) {
    return this.request<TResponse, TBody>(endpoint, {
      ...options,
      method: "PATCH",
      body
    });
  }

  delete<TResponse>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) {
    return this.request<TResponse>(endpoint, {
      ...options,
      method: "DELETE"
    });
  }
}

export const httpClient = new HttpClient();
