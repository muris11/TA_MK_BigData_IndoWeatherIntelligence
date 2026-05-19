import { NextResponse } from "next/server";
import { proxyToPython } from "@/lib/server/api-fallback";

export const runtime = "nodejs";

export async function GET() {
  const proxied = await proxyToPython("/api/health");
  if (proxied) return proxied;

  return NextResponse.json({
    status: "ok",
    model_loaded: false,
    available_models: ["fallback_rainfall", "fallback_risk", "fallback_cluster"],
    runtime: "next-route-handler",
    note: "Jalankan FastAPI dan set PYTHON_API_URL untuk memakai model_bundle.pkl langsung.",
  });
}
