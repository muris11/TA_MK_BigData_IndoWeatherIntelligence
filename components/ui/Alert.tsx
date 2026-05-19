import type { ReactNode } from "react";
import { CircleAlert, Info } from "lucide-react";
import { cn } from "@/lib/cn";

export function Alert({
  title,
  children,
  variant = "info",
}: {
  title: string;
  children: ReactNode;
  variant?: "info" | "warning" | "danger";
}) {
  const danger = variant === "danger";
  const warning = variant === "warning";
  const Icon = danger || warning ? CircleAlert : Info;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        danger && "border-red-200 bg-red-50 text-red-800",
        warning && "border-amber-200 bg-amber-50 text-amber-800",
        variant === "info" && "border-cyan-200 bg-cyan-50 text-cyan-900",
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <div className="mt-1 text-sm leading-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
