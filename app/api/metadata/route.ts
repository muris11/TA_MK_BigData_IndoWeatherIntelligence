import { NextResponse } from "next/server";
import { proxyToPython } from "@/lib/server/api-fallback";
import metadata from "@/model/model_metadata.json";

export const runtime = "nodejs";

export async function GET() {
  const proxied = await proxyToPython("/api/metadata");
  if (proxied) return proxied;

  return NextResponse.json({
    ...metadata,
    model_loaded: false,
    runtime: "next-route-handler",
  });
}
