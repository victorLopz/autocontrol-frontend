import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const PRIVATE_PREFIXES = ["/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = PRIVATE_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"]
};
