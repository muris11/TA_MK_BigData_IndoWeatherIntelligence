import type { LucideIcon } from "lucide-react";
import { Database } from "lucide-react";

export function EmptyState({
  title = "Data belum tersedia",
  description = "Pastikan file CSV/JSON sudah dipindahkan ke public/data.",
  icon: Icon = Database,
}: {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <Icon className="mx-auto h-8 w-8 text-slate-400" aria-hidden />
      <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
