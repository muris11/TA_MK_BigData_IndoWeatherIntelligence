import { NextResponse } from "next/server";
import { asNumberPayload, fallbackCluster, nowIso, proxyToPython } from "@/lib/server/api-fallback";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const proxied = await proxyToPython("/api/predict-cluster", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (proxied) return proxied;

  const result = fallbackCluster(asNumberPayload(body));

  return NextResponse.json({
    status: "success",
    ...result,
    timestamp: nowIso(),
    fallback: true,
  });
}
