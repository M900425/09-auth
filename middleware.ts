import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/sign-in", "/sign-up"];
const PRIVATE_PATHS = ["/profile", "/notes"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  const isPublic = PUBLIC_PATHS.some((path) => url.pathname.startsWith(path));
  const isPrivate = PRIVATE_PATHS.some((path) => url.pathname.startsWith(path));

  if (!token && isPrivate) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (token && isPublic) {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};