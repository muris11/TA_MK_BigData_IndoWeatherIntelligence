import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-2xl border border-cyan-100/80 bg-white/85 p-4 shadow-[0_18px_55px_-38px_rgba(8,145,178,0.55)] ring-1 ring-white/70 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-42px_rgba(8,145,178,0.65)] sm:p-5 lg:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-base font-semibold text-cyan-950">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
