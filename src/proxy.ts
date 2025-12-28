import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export const proxy = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const sessionCookie = getSessionCookie(req);

  if (pathname.includes("dashboard")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
