import LinkMiddleware from "@/lib/middleware/link";
import {
  CheckUserMiddleware,
  PreviewMiddleware,
} from "@/lib/middleware/preview";
import UserMiddleware from "@/lib/middleware/userpage";
import { parse } from "@/lib/utils";
import { NextFetchEvent, NextRequest } from "next/server";
// export { auth as middleware } from "@/lib/auth";

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

  const {
    nextUrl: { search },
  } = req;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (fullKey === "admin/preview") {
    return PreviewMiddleware(req, { params });
  }

  if (key === "s") {
    return LinkMiddleware(req, ev);
  }

  if (key === "u") {
    return UserMiddleware(req, ev);
  }

  if (
    key === "admin" &&
    !path.includes("hello") &&
    !req.headers.has("Next-Router-Prefetch")
  ) {
    //check if user have key
    return CheckUserMiddleware(req, { params });
  }
}
