import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // 1. Redirect to Sign-in if trying to access protected routes without token
  if (!token) {
    if (
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/company") ||
      url.pathname.startsWith("/dashboardd") ||
      url.pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // 2. Redirect to Dashboard if trying to access Auth routes while logged in
  if (token) {
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify")
    ) {
      if (token.role === "Admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (token.role === "Company") {
        return NextResponse.redirect(
          new URL("/company/dashboard", request.url)
        );
      } else {
        return NextResponse.redirect(new URL("/dashboardd", request.url));
      }
    }

    // 3. Role-Based Access Control
    // Admin Routes
    if (url.pathname.startsWith("/admin") && token.role !== "Admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Company Routes
    if (url.pathname.startsWith("/company") && token.role !== "Company") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Job Seeker Routes
    if (url.pathname.startsWith("/dashboardd") && token.role !== "Job Seeker") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/signup",
    "/verify/:path*",
    "/admin/:path*",
    "/company/:path*",
    "/dashboardd/:path*",
    "/profile/:path*",
  ],
};
