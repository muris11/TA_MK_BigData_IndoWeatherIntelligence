import { NextResponse } from "next/server";
import { riskCopy } from "@/lib/constants";

type NumericPayload = Record<string, number>;

const pythonApiUrl = process.env.PYTHON_API_URL?.replace(/\/$/, "");

export function rainfallCategory(value: number) {
  if (value < 2) return "Aman";
  if (value < 8) return "Waspada";
  return "Tinggi";
}

export function fallbackRainfall(payload: NumericPayload) {
  const score =
    (payload.precipitation_rolling_24h ?? 0) * 0.45 +
    ((payload.relative_humidity_2m ?? 0) / 100) * 2.2 +
    Math.max(0, ((payload.cloud_cover ?? 0) - 40) / 40) * 1.8 +
    Math.max(0, ((payload.temperature_2m ?? 0) - 24) / 12) * 0.8;

  return Number(Math.max(0, score).toFixed(3));
}

export function fallbackRisk(payload: NumericPayload) {
  const prediction = fallbackRainfall(payload);
  const risk_category = rainfallCategory(prediction);
  const confidence = Number(Math.min(0.98, 0.68 + prediction * 0.03).toFixed(3));

  return {
    risk_category,
    confidence,
    recommendation: riskCopy[risk_category].recommendation,
    explanation: riskCopy[risk_category].description,
  };
}

export function fallbackCluster(payload: NumericPayload) {
  const cluster =
    (payload.precipitation_mean ?? 0) > 6
      ? 0
      : (payload.relative_humidity_2m_mean ?? 0) < 80
        ? 3
        : (payload.temperature_2m_mean ?? 0) < 22
          ? 2
          : 1;

  const interpretation =
    cluster === 0
      ? "Wilayah basah dengan curah hujan tinggi."
      : cluster === 1
        ? "Wilayah lembap sedang dengan kondisi relatif stabil."
        : cluster === 2
          ? "Wilayah sejuk basah dengan karakter dataran tinggi."
          : "Wilayah panas dan berangin dengan curah hujan lebih rendah.";

  return { cluster, interpretation };
}

export function asNumberPayload(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => {
      const number = Number(value);
      return [key, Number.isFinite(number) ? number : 0];
    }),
  ) as NumericPayload;
}

export async function proxyToPython(path: string, init?: RequestInit) {
  if (!pythonApiUrl) return null;

  try {
    const response = await fetch(`${pythonApiUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return null;
  }
}

export function nowIso() {
  return new Date().toISOString();
}
