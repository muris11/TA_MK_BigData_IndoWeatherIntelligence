import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function MetricCard({
  modelName,
  metricName,
  value,
  description,
  icon: Icon,
}: {
  modelName: string;
  metricName: string;
  value: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="h-full p-4 sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="overflow-safe min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{modelName}</p>
          <h3 className="mt-2 text-sm font-medium text-slate-500">{metricName}</h3>
          <p className="mt-2 text-[clamp(1.35rem,4.5vw,1.9rem)] font-bold leading-tight text-cyan-950">
            {value}
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-950 text-white">
          <Icon className="h-5 w-5 shrink-0" aria-hidden />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </Card>
  );
}
