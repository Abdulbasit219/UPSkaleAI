import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};

export async function middleware(request) {

  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user is logged in and tries to access sign-in/sign-up → redirect to /home
  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in and tries to access dashboard → redirect to sign-in
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Otherwise, allow request to continue
  return NextResponse.next();
}
