import { cookies } from "next/headers";
import { AUTH_SESSION_KEY } from "@//shared/constants/auth.constants";
import { parseAuthSession } from "@//shared/infrastructure/lib/auth-session";

export async function getAuthSession() {
  const cookieStore = await cookies();

  return parseAuthSession(cookieStore.get(AUTH_SESSION_KEY)?.value);
}
