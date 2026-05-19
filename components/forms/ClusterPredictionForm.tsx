"use client";

import { useState, type FormEvent } from "react";
import { Network, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { RecommendationRow } from "@/types/dataset";
import { clusterDescriptions } from "@/lib/constants";

export function ClusterPredictionForm({ rows }: { rows: RecommendationRow[] }) {
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(80);
  const [precipitation, setPrecipitation] = useState(2);
  const [result, setResult] = useState<{ cluster: number; interpretation: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const score = precipitation > 6 ? 0 : humidity > 85 ? 0 : temperature < 22 ? 2 : humidity < 80 ? 3 : 1;
      const row = rows.find((item) => item.cluster === score) ?? rows[0];
      setResult({
        cluster: score,
        interpretation: row?.interpretasi_cluster ?? clusterDescriptions[score],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
      <Card>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Cluster Demo</p>
          <h2 className="mt-2 text-xl font-bold text-slate-800">Prediksi Cluster Wilayah</h2>
        </div>
        <form className="responsive-form-grid" onSubmit={onSubmit}>
          <Field label="Suhu Rata-rata" type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
          <Field label="Kelembapan Rata-rata" type="number" step="0.1" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} />
          <Field label="Curah Hujan Rata-rata" type="number" step="0.1" value={precipitation} onChange={(e) => setPrecipitation(Number(e.target.value))} />
          <div className="md:col-span-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Network className="h-4 w-4" aria-hidden />}
              {loading ? "Memproses Cluster" : "Prediksi Cluster"}
            </Button>
          </div>
        </form>
      </Card>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Output Cluster</p>
        <h3 className="mt-2 text-lg font-bold text-slate-800">Segmentasi Wilayah</h3>
        {result ? (
          <div className="mt-4 space-y-4">
            <Badge variant="info">Cluster {result.cluster}</Badge>
            <p className="text-sm leading-6 text-slate-600">{result.interpretation}</p>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-500">Isi nilai singkat untuk melihat cluster yang paling dekat.</p>
        )}
      </Card>
    </div>
  );
}
