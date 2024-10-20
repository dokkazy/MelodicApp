import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { links } from "./configs/routes";

const privatePath = [links.profile.href];
const publicPath = [links.login.href, links.register.href];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken");
  if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL(links.login.href, request.url));
  }
  if (publicPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL(links.home.href, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [links.profile.href],
};
