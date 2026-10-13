import { NextRequest, NextResponse } from "next/server";

// Guards /admin/*. Swap for a Worker-issued JWT check once the backend exists.
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.cookies.get("admin")?.value !== token)
    return NextResponse.redirect(new URL("/admin/login", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
