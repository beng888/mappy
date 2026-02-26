import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const session = await betterFetch("/api/auth/get-session", {
      baseURL: process.env.BETTER_AUTH_URL || request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!session.data && request.nextUrl.pathname.startsWith("/dashboard")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, still allow access to public routes
    if (!request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }
    // For dashboard, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
