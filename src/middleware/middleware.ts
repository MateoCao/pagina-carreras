// middleware.ts
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default auth((req: NextRequest) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};