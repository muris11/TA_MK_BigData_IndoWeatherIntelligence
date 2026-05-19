import type { ReactNode } from "react";
import { CheckCircle2, CircleAlert, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

const variants: Record<BadgeVariant, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-cyan-200 bg-cyan-50 text-cyan-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

const icons = {
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: CircleAlert,
  info: Info,
  neutral: Info,
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  const Icon = icons[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </span>
  );
}
