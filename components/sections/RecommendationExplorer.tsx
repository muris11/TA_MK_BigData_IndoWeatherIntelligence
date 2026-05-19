"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { RecommendationRow } from "@/types/dataset";
import { clusterLabels } from "@/lib/constants";
import { formatNumber } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Field, SelectField } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export function RecommendationExplorer({ rows }: { rows: RecommendationRow[] }) {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState("all");

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return rows
      .filter((row) => {
        const matchQuery =
          row.provinsi.toLowerCase().includes(lower) ||
          row.kota.toLowerCase().includes(lower) ||
          row.rekomendasi_mitigasi.toLowerCase().includes(lower);
        const matchCluster = cluster === "all" || String(row.cluster) === cluster;
        return matchQuery && matchCluster;
      })
      .slice(0, 12);
  }, [cluster, query, rows]);

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Explorer</p>
          <h2 className="mt-2 text-xl font-bold text-slate-800">Rekomendasi Mitigasi Wilayah</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Filter berdasarkan provinsi, kota, isi rekomendasi, atau cluster.
          </p>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-[34rem]">
          <Field
            label="Cari wilayah"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Contoh: Papua"
          />
          <SelectField label="Cluster" value={cluster} onChange={(event) => setCluster(event.target.value)}>
            <option value="all">Semua cluster</option>
            {[0, 1, 2, 3].map((value) => (
              <option key={value} value={value}>
                Cluster {value}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <div className="responsive-compact-grid">
        {filtered.map((row) => (
          <article key={`${row.provinsi}-${row.kota}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {row.kota}, {row.provinsi}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{clusterLabels[row.cluster] ?? row.interpretasi_cluster}</p>
              </div>
              <Badge variant="info">C{row.cluster}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
              <span className="rounded-xl bg-white p-2">Hujan {formatNumber(row.precipitation_mean)}</span>
              <span className="rounded-xl bg-white p-2">Suhu {formatNumber(row.temperature_2m_mean)}</span>
              <span className="rounded-xl bg-white p-2">Angin {formatNumber(row.wind_speed_10m_mean)}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{row.rekomendasi_mitigasi}</p>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          <Search className="mx-auto h-6 w-6 text-slate-400" aria-hidden />
          <p className="mt-3">Tidak ada rekomendasi yang cocok dengan filter.</p>
        </div>
      ) : null}
    </Card>
  );
}
