import { CheckCircle2, Database, HardDrive } from "lucide-react";
import type { DatasetSizeSummary } from "@/types/dataset";
import { formatMb } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function DatasetProofCard({ summary }: { summary: DatasetSizeSummary }) {
  return (
    <Card className="border-cyan-200 bg-cyan-50/60">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="overflow-safe min-w-0">
          <Badge variant={summary.is_minimum_100mb ? "success" : "danger"}>
            {summary.is_minimum_100mb ? "Memenuhi Syarat" : "Belum Memenuhi"}
          </Badge>
          <h2 className="mt-4 text-[clamp(1.8rem,6vw,2.5rem)] font-bold leading-tight text-cyan-950">
            {formatMb(summary.total_size_mb)}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Dataset mentah dari {summary.dataset_source} tervalidasi terhadap syarat minimal{" "}
            {formatMb(summary.minimum_required_mb)}.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-72">
          <div className="rounded-2xl border border-cyan-100 bg-white p-4">
            <HardDrive className="h-5 w-5 text-cyan-700" aria-hidden />
            <p className="mt-3 text-xs text-slate-500">Jumlah File</p>
            <p className="text-xl font-bold text-cyan-950">{summary.jumlah_file}</p>
          </div>
          <div className="rounded-2xl border border-cyan-100 bg-white p-4">
            <Database className="h-5 w-5 text-cyan-700" aria-hidden />
            <p className="mt-3 text-xs text-slate-500">Target Unduh</p>
            <p className="overflow-safe text-xl font-bold text-cyan-950">{formatMb(summary.target_download_mb)}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-slate-600">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
        <p>{summary.catatan}</p>
      </div>
    </Card>
  );
}
