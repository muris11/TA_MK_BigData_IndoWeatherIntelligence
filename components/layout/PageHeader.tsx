import type { LucideIcon } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <header className="mb-6 flex flex-col gap-5 overflow-hidden rounded-3xl border border-cyan-100 bg-white/85 p-5 shadow-[0_24px_70px_-45px_rgba(8,145,178,0.7)] ring-1 ring-white/80 backdrop-blur sm:flex-row sm:items-start sm:justify-between sm:p-6">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-cyan-950 sm:text-3xl lg:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-lg shadow-cyan-700/20">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
    </header>
  );
}
