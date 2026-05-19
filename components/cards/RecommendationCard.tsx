import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";

const priorityClass = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};

export function RecommendationCard({
  title,
  description,
  priority,
  icon: Icon,
}: {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  icon: LucideIcon;
}) {
  return (
    <Card>
      <div className={cn("inline-flex rounded-xl p-3", priorityClass[priority])}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Card>
  );
}
