import type { AuthSession } from "@//types/auth-session";

export function serializeAuthSession(session: AuthSession): string {
  return JSON.stringify(session);
}

export function parseAuthSession(value?: string): AuthSession | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthSession;
  } catch {
    return null;
  }
}
