import LinkMiddleware from "@/lib/middleware/link";
import PreviewMiddleware from "@/lib/middleware/preview";
import UserMiddleware from "@/lib/middleware/userpage";
import { parse } from "@/lib/utils";
import { NextFetchEvent, NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key, fullKey } = parse(req);

  if (key === "preview") {
    return PreviewMiddleware(req, ev);
  }

  if (key === "s") {
    return LinkMiddleware(req, ev);
  }

  if (key === "u") {
    return UserMiddleware(req, ev);
  }
}
