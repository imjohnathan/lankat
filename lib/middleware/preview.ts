import { auth } from "@/lib/auth";
import { parse } from "@/lib/utils";
import { NextResponse } from "next/server";

export const PreviewMiddleware = auth((req) => {
  if (!req.auth)
    return NextResponse.json({ error: "please login." }, { status: 403 });
  const { user } = req.auth;
  const isMocking = req.nextUrl.searchParams.has("mocking");
  if (!user.url_key && !isMocking)
    return NextResponse.json(
      { error: "please set url_key first." },
      { status: 400 },
    );
  return NextResponse.rewrite(new URL(`/u/${user.url_key}/preview`, req.url));
});

export const CheckUserMiddleware = auth((req) => {
  const { path } = parse(req);
  if (!req.auth) return NextResponse.redirect(new URL("/", req.url));
  const isHello = path.includes("hello");
  if (req.auth && req.auth?.user && !req.auth?.user?.url_key && !isHello)
    return NextResponse.redirect(new URL("/admin/hello", req.url));
  return NextResponse.next();
});
