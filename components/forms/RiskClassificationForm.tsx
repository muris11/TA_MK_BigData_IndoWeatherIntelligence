"use client";

import { useState, type FormEvent } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import type { WeatherPredictionInput, RiskPredictionResult } from "@/types/prediction";
import { predictRisk } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { riskCopy } from "@/lib/constants";

const defaultInput: WeatherPredictionInput = {
  tahun: 2026,
  bulan: 5,
  hari: 19,
  jam: 14,
  dayofweek: 1,
  is_weekend: 0,
  provinsi_encoded: 0,
  kota_encoded: 0,
  temperature_2m: 28.5,
  relative_humidity_2m: 80,
  dew_point_2m: 24,
  apparent_temperature: 31,
  surface_pressure: 1009,
  cloud_cover: 65,
  wind_speed_10m: 8,
  wind_speed_100m: 12,
  soil_temperature_0_to_7cm: 29,
  soil_moisture_0_to_7cm: 0.25,
  shortwave_radiation: 300,
  direct_radiation: 150,
  diffuse_radiation: 80,
  et0_fao_evapotranspiration: 0.2,
  precipitation_lag_1: 0,
  precipitation_lag_24: 0,
  precipitation_rolling_24h: 0.5,
  temperature_rolling_24h: 28,
};

function fallbackRisk(input: WeatherPredictionInput): RiskPredictionResult {
  const pressureScore = Math.max(0, (1010 - input.surface_pressure) / 8);
  const humidityScore = input.relative_humidity_2m / 100;
  const rainScore = input.precipitation_rolling_24h / 6;
  const cloudScore = input.cloud_cover / 100;
  const total = pressureScore + humidityScore + rainScore + cloudScore;
  const risk_category = total < 1.6 ? "Aman" : total < 2.8 ? "Waspada" : "Tinggi";
  return {
    status: "success",
    risk_category,
    confidence: Number(Math.min(0.98, 0.67 + total * 0.08).toFixed(2)),
    recommendation: riskCopy[risk_category].recommendation,
    explanation: riskCopy[risk_category].description,
    model_used: "fallback-rule",
    timestamp: new Date().toISOString(),
    fallback: true,
  };
}

export function RiskClassificationForm() {
  const [form, setForm] = useState<WeatherPredictionInput>(defaultInput);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskPredictionResult | null>(null);

  function updateField<K extends keyof WeatherPredictionInput>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: Number(value) } as WeatherPredictionInput));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await predictRisk(form);
      setResult(response);
    } catch {
      setResult(fallbackRisk(form));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
      <Card>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Form Risiko</p>
          <h2 className="mt-2 text-xl font-bold text-slate-800">Klasifikasi Risiko Cuaca</h2>
        </div>
        <form className="responsive-form-grid" onSubmit={onSubmit}>
          <Field label="Temperature 2m" type="number" step="0.1" value={form.temperature_2m} onChange={(e) => updateField("temperature_2m", e.target.value)} />
          <Field label="Relative Humidity 2m" type="number" step="0.1" value={form.relative_humidity_2m} onChange={(e) => updateField("relative_humidity_2m", e.target.value)} />
          <Field label="Dew Point 2m" type="number" step="0.1" value={form.dew_point_2m} onChange={(e) => updateField("dew_point_2m", e.target.value)} />
          <Field label="Surface Pressure" type="number" step="0.1" value={form.surface_pressure} onChange={(e) => updateField("surface_pressure", e.target.value)} />
          <Field label="Cloud Cover" type="number" step="0.1" value={form.cloud_cover} onChange={(e) => updateField("cloud_cover", e.target.value)} />
          <Field label="Wind Speed 10m" type="number" step="0.1" value={form.wind_speed_10m} onChange={(e) => updateField("wind_speed_10m", e.target.value)} />
          <Field label="Shortwave Radiation" type="number" step="0.1" value={form.shortwave_radiation} onChange={(e) => updateField("shortwave_radiation", e.target.value)} />
          <Field label="Precipitation Rolling 24h" type="number" step="0.1" value={form.precipitation_rolling_24h} onChange={(e) => updateField("precipitation_rolling_24h", e.target.value)} />
          <div className="col-span-full">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ShieldAlert className="h-4 w-4" aria-hidden />}
              {loading ? "Memproses Risiko" : "Prediksi Risiko"}
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Output Risiko</p>
        <h3 className="mt-2 text-lg font-bold text-slate-800">Kategori Risiko</h3>
        {result ? (
          <div className="mt-4 space-y-4">
            <Badge
              variant={
                result.risk_category === "Tinggi"
                  ? "danger"
                  : result.risk_category === "Waspada"
                    ? "warning"
                    : "success"
              }
            >
              {result.risk_category}
            </Badge>
            <p className="text-[clamp(1.85rem,7vw,2.25rem)] font-bold leading-tight text-cyan-950">{(result.confidence * 100).toFixed(1)}%</p>
            <p className="text-sm leading-6 text-slate-600">{result.explanation}</p>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Rekomendasi</p>
              <p className="mt-1 leading-6">{result.recommendation}</p>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Jalankan form untuk mendapatkan kategori risiko cuaca dan confidence.
          </p>
        )}
      </Card>
    </div>
  );
}
