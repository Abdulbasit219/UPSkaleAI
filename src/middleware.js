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
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/code-twin") ||
      url.pathname.startsWith("/jobsearch/apply/") ||
      url.pathname.startsWith("/jobsearch/interview/") ||
      url.pathname.startsWith("/chat") ||
      url.pathname.startsWith("/resume-checker") ||
      url.pathname.startsWith("/career-path") ||
      url.pathname.startsWith("/learning")
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
          new URL("/company/dashboard", request.url),
        );
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
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
    if (url.pathname.startsWith("/dashboard") && token.role !== "Job Seeker") {
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
    "/dashboard/:path*",
    "/profile/:path*",
    "/code-twin",
    "/jobsearch/apply/:path*",
    "/jobsearch/interview/:path*",
    "/chat",
    "/resume-checker",
    "/career-path",
    "/learning",
  ],
};
