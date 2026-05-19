"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendRow } from "@/types/dataset";
import { ChartContainer } from "./ChartContainer";
import { useMounted } from "./use-mounted";

export function LineTrendChart({ data }: { data: TrendRow[] }) {
  const mounted = useMounted();

  return (
    <ChartContainer
      title="Suhu dan Kelembapan Bulanan"
      description="Perbandingan suhu rata-rata dan kelembapan rata-rata per bulan."
    >
      {mounted ? (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={5} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="suhu_rata_rata"
            name="Suhu"
            stroke="#f97316"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="kelembapan_rata_rata"
            name="Kelembapan"
            stroke="#059669"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-50" />
      )}
    </ChartContainer>
  );
}
