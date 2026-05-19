import { NextResponse } from "next/server";
import { getRecommendationRows } from "@/lib/data/get-weather-data";
import { proxyToPython } from "@/lib/server/api-fallback";

export const runtime = "nodejs";

export async function GET() {
  const proxied = await proxyToPython("/api/recommendation");
  if (proxied) return proxied;

  const rows = await getRecommendationRows(50);
  return NextResponse.json({ status: "success", data: rows });
}
