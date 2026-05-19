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

type RankRow = {
  label: string;
  value: number;
};

export function BarRankChart({
  data,
  title,
  description,
  color = "#0891b2",
}: {
  data: RankRow[];
  title: string;
  description: string;
  color?: string;
}) {
  const mounted = useMounted();

  return (
    <ChartContainer title={title} description={description}>
      {mounted ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 20, left: 24, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis
            type="category"
            dataKey="label"
            width={112}
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <Tooltip
            formatter={(value) => {
              const number = typeof value === "number" ? value : Number(value ?? 0);
              return [`${number.toFixed(3)} mm`, "Curah hujan"];
            }}
          />
          <Bar dataKey="value" radius={[0, 10, 10, 0]} fill={color} />
        </BarChart>
      </ResponsiveContainer>
      ) : (
        <div className="h-full w-full rounded-2xl bg-slate-50" />
      )}
    </ChartContainer>
  );
}
