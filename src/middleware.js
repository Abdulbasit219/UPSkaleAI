import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If token (user) exists and visiting sign-in/sign-up/verify, redirect to dashboard or home
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify"))
  ) {
    if (token.role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (token.role === "Company") {
      return NextResponse.redirect(new URL("/company/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin Route Protection
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // Check if user is admin (using role or isAdmin flag)
    if (token.role !== "Admin" && !token.isAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Company Route Protection - Only Company users can access
  if (url.pathname.startsWith("/company")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (token.role !== "Company") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Job Seeker Dashboard Protection - Only Job Seekers can access
  if (url.pathname.startsWith("/dashboardd")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (token.role !== "Job Seeker") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/signup",
    "/",
    "/verify/:path*",
    "/admin/:path*",
    "/company/:path*",
    "/dashboardd/:path*",
  ],
};
