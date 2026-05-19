"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendRow } from "@/types/dataset";
import { ChartContainer } from "./ChartContainer";
import { useMounted } from "./use-mounted";

export function AreaTrendChart({ data }: { data: TrendRow[] }) {
  const mounted = useMounted();

  return (
    <ChartContainer
      title="Tren Curah Hujan Bulanan"
      description="Rata-rata curah hujan per bulan dari data historis Open-Meteo."
    >
      {mounted ? (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
          <defs>
            <linearGradient id="rainfall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.42} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={5} stroke="#64748b" />
          <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            formatter={(value) => {
              const number = typeof value === "number" ? value : Number(value ?? 0);
              return [`${number.toFixed(3)} mm`, "Curah hujan"];
            }}
            labelStyle={{ color: "#334155" }}
          />
          <Area
            type="monotone"
            dataKey="curah_hujan_rata_rata"
            stroke="#0891b2"
            strokeWidth={3}
            fill="url(#rainfall)"
          />
        </AreaChart>
      </ResponsiveContainer>
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-50" />
      )}
    </ChartContainer>
  );
}
