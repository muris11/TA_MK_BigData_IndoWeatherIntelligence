import { FileText, FlaskConical, PackageCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { workflowSteps } from "@/lib/constants";

const methodDetails = [
  {
    title: "Dataset",
    description: "Open-Meteo Historical Weather API digunakan sebagai dataset utama open/public, didukung BMKG Data Terbuka.",
  },
  {
    title: "Preprocessing",
    description: "Data hourly dibersihkan, disatukan, dan diberi feature engineering temporal, lag, serta rolling precipitation.",
  },
  {
    title: "Unsupervised Learning",
    description: "K-Means mengelompokkan wilayah berdasarkan fitur agregasi suhu, kelembapan, curah hujan, tekanan, awan, dan angin.",
  },
  {
    title: "Supervised Learning",
    description: "Regresi memprediksi curah hujan, klasifikasi memprediksi kategori risiko cuaca.",
  },
  {
    title: "Deep Learning",
    description: "MLPRegressor digunakan sebagai model neural network sederhana untuk pembanding performa regresi.",
  },
  {
    title: "Export dan Integrasi Web",
    description: "Model, metrik, CSV, JSON, dan grafik diexport ke struktur yang dibaca Next.js serta Vercel Python Function.",
  },
];

export default function MethodologyPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Documentation"
        title="Dokumentasi Metodologi"
        description="Alur kerja tugas besar dari pengumpulan data hingga integrasi dashboard web."
        icon={FileText}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Timeline Proses" description="Tahapan utama sesuai PRD dan output notebook." />
          <div className="space-y-4">
            {[
              "Pengumpulan data",
              "Validasi 100 MB",
              "EDA",
              "Preprocessing",
              "Feature engineering",
              "Clustering",
              "Regresi",
              "Klasifikasi",
              "Deep learning",
              "Evaluasi",
              "Export model",
              "Web deployment",
            ].map((step, index) => (
              <div key={step} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[4rem_minmax(0,1fr)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-700 font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">{step}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {workflowSteps[index % workflowSteps.length]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <section className="responsive-compact-grid">
          {methodDetails.map((detail) => (
            <Card key={detail.title}>
              <div className="inline-flex rounded-xl bg-cyan-50 p-3 text-cyan-700">
                <FlaskConical className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-800">{detail.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail.description}</p>
            </Card>
          ))}
        </section>

        <Card>
          <CardHeader title="Integrasi Project" description="Mapping output notebook ke project web." />
          <div className="responsive-compact-grid">
            <div className="rounded-2xl bg-slate-50 p-5">
              <Badge variant="info">public/data</Badge>
              <p className="mt-3 text-sm leading-6 text-slate-600">CSV dan JSON agregasi untuk dashboard, chart, dan tabel.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Badge variant="neutral">model</Badge>
              <p className="mt-3 text-sm leading-6 text-slate-600">model_bundle.pkl, model_metadata.json, dan encoder_mapping.json.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Badge variant="success">api/index.py</Badge>
              <p className="mt-3 text-sm leading-6 text-slate-600">FastAPI endpoint untuk health, metadata, metrics, dan prediksi.</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Keterbatasan" description="Hal yang perlu dijelaskan saat presentasi." />
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            <PackageCheck className="mt-1 h-5 w-5 shrink-0" aria-hidden />
            <p>
              Model menggunakan data historis yang sudah diproses, bukan data realtime. Prediksi web ditujukan untuk demo
              akademik dan interpretasi analitik, bukan sistem peringatan dini operasional.
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
