import { NextResponse } from "next/server";
import { asNumberPayload, fallbackRisk, nowIso, proxyToPython } from "@/lib/server/api-fallback";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const proxied = await proxyToPython("/api/predict-risk", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (proxied) return proxied;

  const result = fallbackRisk(asNumberPayload(body));

  return NextResponse.json({
    status: "success",
    ...result,
    model_used: "next-fallback-rule",
    timestamp: nowIso(),
    fallback: true,
  });
}
