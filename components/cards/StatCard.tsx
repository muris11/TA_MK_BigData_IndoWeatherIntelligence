import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

type Status = "default" | "success" | "warning" | "danger";

const statusClass: Record<Status, string> = {
  default: "bg-cyan-50 text-cyan-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  status = "default",
}: {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  status?: Status;
}) {
  return (
    <Card className="h-full p-4 sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
        <div className="overflow-safe min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-[clamp(1.35rem,4.5vw,1.9rem)] font-bold leading-tight text-cyan-950">
            {value}
          </p>
        </div>
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", statusClass[status])}>
          <Icon className="h-5 w-5 shrink-0" aria-hidden />
        </div>
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p> : null}
    </Card>
  );
}
