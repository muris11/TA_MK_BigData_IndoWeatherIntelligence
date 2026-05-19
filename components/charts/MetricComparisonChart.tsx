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
import { ChartContainer } from "./ChartContainer";
import { useMounted } from "./use-mounted";

type MetricDatum = {
  label: string;
  value: number;
};

export function MetricComparisonChart({ data }: { data: MetricDatum[] }) {
  const mounted = useMounted();

  return (
    <ChartContainer
      title="Perbandingan Metrik Kunci"
      description="Ringkasan performa model dari hasil notebook."
    >
      {mounted ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0f766e" />
        </BarChart>
      </ResponsiveContainer>
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-50" />
      )}
    </ChartContainer>
  );
}
