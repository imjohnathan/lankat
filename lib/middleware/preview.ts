import { auth } from "@/lib/auth";
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
  console.log("CheckUserMiddleware req", req);
  console.log("CheckUserMiddleware auth", req.auth);
  if (!req.auth) return NextResponse.redirect(new URL("/", req.url));
  if (req.auth && req.auth?.user && !req.auth?.user?.url_key)
    return NextResponse.redirect(new URL("/admin/hello", req.url));
  return NextResponse.next();
});
