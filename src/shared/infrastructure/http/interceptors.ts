import { cookie } from "@/shared/infrastructure/lib/cookie";

const ACCESS_TOKEN_KEY = "access_token";

export function buildDefaultHeaders(customHeaders?: HeadersInit): HeadersInit {
  const token =
    typeof window !== "undefined" ? cookie.get(ACCESS_TOKEN_KEY) : undefined;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders
  };
}

export async function handleHttpError(response: Response): Promise<never> {
  let errorBody: unknown = null;

  try {
    errorBody = await response.json();
  } catch {
    errorBody = null;
  }

  throw new Error(
    JSON.stringify({
      status: response.status,
      statusText: response.statusText,
      body: errorBody
    })
  );
}
