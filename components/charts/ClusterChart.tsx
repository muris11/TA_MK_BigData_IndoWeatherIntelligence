"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ClusterSummaryRow } from "@/types/dataset";
import { clusterLabels } from "@/lib/constants";
import { ChartContainer } from "./ChartContainer";
import { useMounted } from "./use-mounted";

export function ClusterChart({ data }: { data: ClusterSummaryRow[] }) {
  const mounted = useMounted();
  const mapped = data.map((row) => ({
    cluster: `C${row.cluster}`,
    label: clusterLabels[row.cluster] ?? `Cluster ${row.cluster}`,
    jumlah_wilayah: row.jumlah_wilayah,
    rata_rata_curah_hujan: row.rata_rata_curah_hujan,
  }));

  return (
    <ChartContainer
      title="Distribusi Cluster Wilayah"
      description="Jumlah wilayah pada tiap segmentasi iklim K-Means."
    >
      {mounted ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mapped} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="cluster" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="jumlah_wilayah" name="Jumlah wilayah" radius={[10, 10, 0, 0]} fill="#0891b2" />
        </BarChart>
      </ResponsiveContainer>
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-50" />
      )}
    </ChartContainer>
  );
}
