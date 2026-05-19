"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CloudRain, Loader2, Sparkles } from "lucide-react";
import type { WeatherPredictionInput, RainfallPredictionResult } from "@/types/prediction";
import type { EncoderMapping } from "@/types/weather";
import { predictRainfall } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, SelectField } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatMm } from "@/lib/format";
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

function fallbackPrediction(input: WeatherPredictionInput): RainfallPredictionResult {
  const score =
    input.precipitation_rolling_24h * 0.45 +
    (input.relative_humidity_2m / 100) * 2.2 +
    Math.max(0, (input.cloud_cover - 40) / 40) * 1.8 +
    Math.max(0, (input.temperature_2m - 24) / 12) * 0.8;
  const prediction = Number(score.toFixed(2));
  const category = prediction < 2 ? "Aman" : prediction < 8 ? "Waspada" : "Tinggi";
  return {
    status: "success",
    prediction,
    unit: "mm",
    category,
    interpretation:
      category === "Aman"
        ? "Curah hujan rendah dan kondisi relatif stabil."
        : category === "Waspada"
          ? "Curah hujan diprediksi sedang dan perlu pemantauan."
          : "Curah hujan tinggi. Mitigasi perlu disiapkan.",
    recommendation: riskCopy[category].recommendation,
    model_used: "fallback-rule",
    timestamp: new Date().toISOString(),
    fallback: true,
  };
}

export function RainfallPredictionForm({
  provinceOptions,
  cityOptions,
  encoderMapping,
}: {
  provinceOptions: string[];
  cityOptions: string[];
  encoderMapping?: EncoderMapping;
}) {
  const [form, setForm] = useState<WeatherPredictionInput>(defaultInput);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RainfallPredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const provinceList = useMemo(() => provinceOptions.slice(0, 10), [provinceOptions]);
  const cityList = useMemo(() => cityOptions.slice(0, 10), [cityOptions]);

  function updateField<K extends keyof WeatherPredictionInput>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: Number(value) } as WeatherPredictionInput));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await predictRainfall(form);
      setResult(response);
    } catch {
      setResult(fallbackPrediction(form));
      setError("API tidak merespons. Menampilkan fallback rule-based agar demo tetap berjalan.");
    } finally {
      setLoading(false);
    }
  }

  const encodedNote =
    encoderMapping?.provinsi && encoderMapping?.kota
      ? `Provinsi dan kota dicoding berdasarkan encoder mapping lokal sebelum dikirim ke API.`
      : "Encoder mapping lokal tidak tersedia, gunakan nilai encoded default.";

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
      <Card>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Form Prediksi</p>
          <h2 className="mt-2 text-xl font-bold text-slate-800">Prediksi Curah Hujan</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{encodedNote}</p>
        </div>
        <form className="responsive-form-grid" onSubmit={onSubmit}>
          <Field label="Tahun" type="number" value={form.tahun} onChange={(e) => updateField("tahun", e.target.value)} />
          <Field label="Bulan" type="number" min={1} max={12} value={form.bulan} onChange={(e) => updateField("bulan", e.target.value)} />
          <Field label="Hari" type="number" min={1} max={31} value={form.hari} onChange={(e) => updateField("hari", e.target.value)} />
          <Field label="Jam" type="number" min={0} max={23} value={form.jam} onChange={(e) => updateField("jam", e.target.value)} />
          <Field label="Day of Week" type="number" min={0} max={6} value={form.dayofweek} onChange={(e) => updateField("dayofweek", e.target.value)} />
          <Field label="Weekend" type="number" min={0} max={1} value={form.is_weekend} onChange={(e) => updateField("is_weekend", e.target.value)} />
          <SelectField label="Provinsi Encoded" value={form.provinsi_encoded} onChange={(e) => updateField("provinsi_encoded", e.target.value)}>
            {provinceList.map((name, index) => (
              <option key={name} value={encoderMapping?.provinsi?.[name] ?? index}>
                {name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Kota Encoded" value={form.kota_encoded} onChange={(e) => updateField("kota_encoded", e.target.value)}>
            {cityList.map((name, index) => (
              <option key={name} value={encoderMapping?.kota?.[name] ?? index}>
                {name}
              </option>
            ))}
          </SelectField>
          <Field label="Temperature 2m" type="number" step="0.1" value={form.temperature_2m} onChange={(e) => updateField("temperature_2m", e.target.value)} />
          <Field label="Relative Humidity 2m" type="number" step="0.1" value={form.relative_humidity_2m} onChange={(e) => updateField("relative_humidity_2m", e.target.value)} />
          <Field label="Dew Point 2m" type="number" step="0.1" value={form.dew_point_2m} onChange={(e) => updateField("dew_point_2m", e.target.value)} />
          <Field label="Apparent Temperature" type="number" step="0.1" value={form.apparent_temperature} onChange={(e) => updateField("apparent_temperature", e.target.value)} />
          <Field label="Surface Pressure" type="number" step="0.1" value={form.surface_pressure} onChange={(e) => updateField("surface_pressure", e.target.value)} />
          <Field label="Cloud Cover" type="number" step="0.1" value={form.cloud_cover} onChange={(e) => updateField("cloud_cover", e.target.value)} />
          <Field label="Wind Speed 10m" type="number" step="0.1" value={form.wind_speed_10m} onChange={(e) => updateField("wind_speed_10m", e.target.value)} />
          <Field label="Wind Speed 100m" type="number" step="0.1" value={form.wind_speed_100m} onChange={(e) => updateField("wind_speed_100m", e.target.value)} />
          <Field label="Soil Temperature 0-7cm" type="number" step="0.1" value={form.soil_temperature_0_to_7cm} onChange={(e) => updateField("soil_temperature_0_to_7cm", e.target.value)} />
          <Field label="Soil Moisture 0-7cm" type="number" step="0.01" value={form.soil_moisture_0_to_7cm} onChange={(e) => updateField("soil_moisture_0_to_7cm", e.target.value)} />
          <Field label="Shortwave Radiation" type="number" step="0.1" value={form.shortwave_radiation} onChange={(e) => updateField("shortwave_radiation", e.target.value)} />
          <Field label="Direct Radiation" type="number" step="0.1" value={form.direct_radiation} onChange={(e) => updateField("direct_radiation", e.target.value)} />
          <Field label="Diffuse Radiation" type="number" step="0.1" value={form.diffuse_radiation} onChange={(e) => updateField("diffuse_radiation", e.target.value)} />
          <Field label="ET0 FAO Evapotranspiration" type="number" step="0.1" value={form.et0_fao_evapotranspiration} onChange={(e) => updateField("et0_fao_evapotranspiration", e.target.value)} />
          <Field label="Precipitation Lag 1" type="number" step="0.1" value={form.precipitation_lag_1} onChange={(e) => updateField("precipitation_lag_1", e.target.value)} />
          <Field label="Precipitation Lag 24" type="number" step="0.1" value={form.precipitation_lag_24} onChange={(e) => updateField("precipitation_lag_24", e.target.value)} />
          <Field label="Precipitation Rolling 24h" type="number" step="0.1" value={form.precipitation_rolling_24h} onChange={(e) => updateField("precipitation_rolling_24h", e.target.value)} />
          <Field label="Temperature Rolling 24h" type="number" step="0.1" value={form.temperature_rolling_24h} onChange={(e) => updateField("temperature_rolling_24h", e.target.value)} />
          <div className="col-span-full">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CloudRain className="h-4 w-4" aria-hidden />}
              {loading ? "Memproses Prediksi" : "Prediksi Curah Hujan"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Output</p>
          <h3 className="mt-2 text-lg font-bold text-slate-800">Hasil Prediksi</h3>
          {result ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Prediksi</p>
                  <p className="text-[clamp(1.85rem,7vw,2.25rem)] font-bold leading-tight text-cyan-950">{formatMm(result.prediction)}</p>
                </div>
                <Badge
                  variant={
                    result.category === "Tinggi"
                      ? "danger"
                      : result.category === "Waspada"
                        ? "warning"
                        : "success"
                  }
                >
                  {result.category}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-slate-600">{result.interpretation}</p>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">Rekomendasi awal</p>
                <p className="mt-1 leading-6">{result.recommendation}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Model</p>
                  <p className="mt-1 font-semibold text-slate-800">{result.model_used ?? "-"}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Waktu</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {result.timestamp ? new Date(result.timestamp).toLocaleString("id-ID") : "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Jalankan form untuk melihat prediksi curah hujan dan kategorinya.
            </p>
          )}
        </Card>
        {error ? (
          <Card className="border-amber-200 bg-amber-50">
            <div className="flex items-start gap-3 text-amber-900">
              <Sparkles className="mt-0.5 h-5 w-5" aria-hidden />
              <p className="text-sm leading-6">{error}</p>
            </div>
          </Card>
        ) : null}
        <Card>
          <p className="text-sm font-semibold text-slate-800">Catatan field</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Form ini menggunakan contract feature dari `model_bundle.pkl`. Nilai default disusun agar demo tetap stabil jika endpoint API belum tersedia saat dev lokal.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Mapping provinsi dan kota mengikuti encoder lokal. Nilai encoded yang dikirim ke API tetap numerik.
          </p>
        </Card>
      </div>
    </div>
  );
}
