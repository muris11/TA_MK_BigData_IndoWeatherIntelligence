import { NextResponse } from "next/server";
import { proxyToPython } from "@/lib/server/api-fallback";
import metrics from "@/public/data/metrics.json";

export const runtime = "nodejs";

export async function GET() {
  const proxied = await proxyToPython("/api/metrics");
  if (proxied) return proxied;

  return NextResponse.json(metrics);
}
