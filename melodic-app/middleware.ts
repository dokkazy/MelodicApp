import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminLinks, links } from "./configs/routes";
import { UserRole } from "./schemaValidations/auth.schema";

const privatePath = [
  links.profile.href,

  // adminLinks.admin.href,
  // adminLinks.user.href,
  // adminLinks.product.href,
  // adminLinks.order.href,
  // adminLinks.brand.href,
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const sessionToken = request.cookies.get("sessionToken");
  const role = request.cookies.get("role");

  if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL(links.home.href, request.url));
  }
  if (
    sessionToken &&
    role?.value === UserRole.User &&
    Object.values(adminLinks).some((adminLink) =>
      pathname.startsWith(adminLink.href),
    )
  ) {
    return NextResponse.redirect(new URL(links.home.href, request.url));
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    links.profile.href,
    links.orders.href,
    adminLinks.admin.href,
    adminLinks.user.href,
    adminLinks.product.href,
    adminLinks.order.href,
    adminLinks.brand.href,
  ],
};
