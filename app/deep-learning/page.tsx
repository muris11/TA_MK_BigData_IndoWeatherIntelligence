import { BrainCircuit, Gauge, Network, Target } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { MetricComparisonChart } from "@/components/charts/MetricComparisonChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { getMetrics } from "@/lib/data/get-metrics";
import { formatNumber } from "@/lib/format";

export default async function DeepLearningPage() {
  const metrics = await getMetrics();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Deep Learning"
        title="Model Neural Network Sederhana"
        description="Halaman ini menjelaskan MLPRegressor sebagai pembanding model regresi machine learning klasik."
        icon={BrainCircuit}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <StatCard title="Model" value={metrics.deep_learning.model} description="Multi-layer perceptron regressor." icon={BrainCircuit} />
          <StatCard title="MAE" value={formatNumber(metrics.deep_learning.mae)} description="Mean Absolute Error." icon={Gauge} />
          <StatCard title="RMSE" value={formatNumber(metrics.deep_learning.rmse)} description="Root Mean Squared Error." icon={Target} status="warning" />
          <StatCard title="R2 Score" value={formatNumber(metrics.deep_learning.r2_score)} description="Skor determinasi model." icon={Network} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Card>
            <CardHeader title="Arsitektur Konseptual" description="Representasi sederhana alur input ke output." />
            <div className="space-y-4">
              {[
                ["Input Layer", "26 fitur cuaca, temporal, lokasi, lag, dan rolling."],
                ["Hidden Layer", "Transformasi non-linear untuk menangkap pola kompleks."],
                ["Output Layer", "Prediksi nilai precipitation dalam milimeter."],
              ].map(([title, desc], index) => (
                <div key={title} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-700 font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <MetricComparisonChart
            data={[
              { label: "Reg RMSE", value: metrics.regression.rmse },
              { label: "DL RMSE", value: metrics.deep_learning.rmse },
              { label: "Reg R2", value: metrics.regression.r2_score },
              { label: "DL R2", value: metrics.deep_learning.r2_score },
            ]}
          />
        </section>

        <Card>
          <CardHeader title="Interpretasi" description="Ringkasan performa MLPRegressor dari notebook." />
          <div className="responsive-compact-grid">
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              MLPRegressor digunakan sebagai deep learning sederhana untuk membandingkan pendekatan neural network
              terhadap regresi RandomForest.
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              RMSE deep learning sebesar {formatNumber(metrics.deep_learning.rmse)} dan R2 sebesar{" "}
              {formatNumber(metrics.deep_learning.r2_score)}.
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              Pada export ini, RandomForestRegressor menjadi model regresi terbaik dengan RMSE lebih kecil.
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
