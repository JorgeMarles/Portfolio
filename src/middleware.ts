import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("portfolio_admin");

  // If no session cookie exists, redirect to login
  if (!sessionCookie) {
    console.log("[MIDDLEWARE] No session cookie, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  console.log("[MIDDLEWARE] Session cookie found");
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/((?!login|api).*)",
};
