import { NextResponse } from "next/server";
import {
  asNumberPayload,
  fallbackRainfall,
  nowIso,
  proxyToPython,
  rainfallCategory,
} from "@/lib/server/api-fallback";
import { riskCopy } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const proxied = await proxyToPython("/api/predict-rainfall", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (proxied) return proxied;

  const payload = asNumberPayload(body);
  const prediction = fallbackRainfall(payload);
  const category = rainfallCategory(prediction);

  return NextResponse.json({
    status: "success",
    prediction,
    unit: "mm",
    category,
    interpretation:
      category === "Aman"
        ? "Curah hujan rendah dan kondisi relatif stabil."
        : category === "Waspada"
          ? "Curah hujan diprediksi sedang dan perlu pemantauan."
          : "Curah hujan tinggi. Mitigasi banjir dan peringatan dini perlu diprioritaskan.",
    recommendation: riskCopy[category].recommendation,
    model_used: "next-fallback-rule",
    timestamp: nowIso(),
    fallback: true,
  });
}
