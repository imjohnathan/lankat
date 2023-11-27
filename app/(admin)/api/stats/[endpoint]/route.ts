import { auth } from "@/lib/auth";
import { getStats } from "@/lib/stats";
import { getSearchParams } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET /api/stats/[endpoint] – get stats for a specific endpoint
export const GET = auth(async (req: any, res: any) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Please Login first" }, { status: 403 });
  }

  const params = res.params;
  const searchParams = getSearchParams(req.url);

  const { endpoint } = params;
  const { domain, key, interval } = searchParams;

  const constructedDomain = domain || req.auth?.id;
  const constructedKey = key || "_root";

  if (!constructedDomain) {
    return NextResponse.json(
      { error: "Missing link domain." },
      { status: 400 },
    );
  }

  if (!constructedKey) {
    return NextResponse.json({ error: "Missing link key." }, { status: 400 });
  }

  const response = await getStats({
    domain: constructedDomain,
    key: constructedKey,
    endpoint,
    interval,
    ...searchParams,
  });
  return NextResponse.json(response);
});
