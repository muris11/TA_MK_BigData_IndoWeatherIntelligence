import type { RainfallPredictionResult, RiskPredictionResult, WeatherPredictionInput } from "@/types/prediction";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
    ? process.env.NEXT_PUBLIC_APP_URL
    : "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function predictRainfall(input: WeatherPredictionInput) {
  return request<RainfallPredictionResult>("/api/predict-rainfall", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function predictRisk(input: WeatherPredictionInput) {
  return request<RiskPredictionResult>("/api/predict-risk", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
