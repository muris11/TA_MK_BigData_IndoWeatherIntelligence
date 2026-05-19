import { Activity, Gauge, ShieldAlert, Target } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { RiskClassificationForm } from "@/components/forms/RiskClassificationForm";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { riskCopy } from "@/lib/constants";
import { getMetrics } from "@/lib/data/get-metrics";
import { formatPercent } from "@/lib/format";

export default async function RiskClassificationPage() {
  const metrics = await getMetrics();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Supervised Classification"
        title="Klasifikasi Risiko Cuaca"
        description="Model klasifikasi membagi kondisi menjadi Aman, Waspada, dan Tinggi berdasarkan fitur cuaca."
        icon={ShieldAlert}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <StatCard title="Model Terbaik" value={metrics.classification.best_model} description="Model klasifikasi hasil evaluasi." icon={ShieldAlert} />
          <StatCard title="Accuracy" value={formatPercent(metrics.classification.accuracy)} description="Akurasi pada data uji." icon={Target} status="success" />
          <StatCard title="F1 Score" value={formatPercent(metrics.classification.f1_score)} description="Keseimbangan precision dan recall." icon={Gauge} />
          <StatCard title="Recall" value={formatPercent(metrics.classification.recall)} description="Kemampuan menangkap kelas risiko." icon={Activity} />
        </section>

        <RiskClassificationForm />

        <Card>
          <CardHeader title="Kategori Risiko" description="Penjelasan status yang ditampilkan oleh model." />
          <div className="responsive-compact-grid">
            {(["Aman", "Waspada", "Tinggi"] as const).map((risk) => (
              <div key={risk} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Badge variant={risk === "Aman" ? "success" : risk === "Waspada" ? "warning" : "danger"}>
                  {risk}
                </Badge>
                <p className="mt-3 text-sm leading-6 text-slate-600">{riskCopy[risk].description}</p>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-800">{riskCopy[risk].recommendation}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
