import { Activity, BrainCircuit, CloudRain, Network, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/cards/MetricCard";
import { MetricComparisonChart } from "@/components/charts/MetricComparisonChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { getCsvRows } from "@/lib/data/get-csv-data";
import { getMetrics } from "@/lib/data/get-metrics";
import { formatNumber, formatPercent } from "@/lib/format";

export default async function EvaluationPage() {
  const [metrics, modelRows, regressionRows, classificationRows, clusterRows] = await Promise.all([
    getMetrics(),
    getCsvRows<Record<string, unknown>>("model_metrics.csv"),
    getCsvRows<Record<string, unknown>>("regression_metrics.csv"),
    getCsvRows<Record<string, unknown>>("classification_metrics.csv"),
    getCsvRows<Record<string, unknown>>("cluster_summary.csv"),
  ]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Model Evaluation"
        title="Evaluasi Model"
        description="Metrik performa untuk regresi, klasifikasi, clustering, dan deep learning dari notebook."
        icon={Activity}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <MetricCard modelName={metrics.regression.best_model} metricName="Regression R2" value={formatNumber(metrics.regression.r2_score)} description="Model terbaik untuk prediksi curah hujan." icon={CloudRain} />
          <MetricCard modelName={metrics.classification.best_model} metricName="Accuracy" value={formatPercent(metrics.classification.accuracy)} description="Model terbaik untuk klasifikasi risiko." icon={ShieldAlert} />
          <MetricCard modelName={metrics.clustering.model} metricName="Silhouette" value={formatNumber(metrics.clustering.silhouette_score)} description="Evaluasi kualitas cluster." icon={Network} />
          <MetricCard modelName={metrics.deep_learning.model} metricName="DL R2" value={formatNumber(metrics.deep_learning.r2_score)} description="Pembanding neural network sederhana." icon={BrainCircuit} />
        </section>

        <MetricComparisonChart
          data={[
            { label: "Reg MAE", value: metrics.regression.mae },
            { label: "Reg RMSE", value: metrics.regression.rmse },
            { label: "DL MAE", value: metrics.deep_learning.mae },
            { label: "DL RMSE", value: metrics.deep_learning.rmse },
          ]}
        />

        <Card>
          <CardHeader title="Ringkasan Model Terbaik" description="Interpretasi dari metrik evaluasi." />
          <div className="responsive-compact-grid">
            <div className="rounded-2xl bg-cyan-50 p-5 text-sm leading-7 text-cyan-950">
              RandomForestRegressor menjadi model regresi terbaik dengan RMSE {formatNumber(metrics.regression.rmse)}.
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5 text-sm leading-7 text-emerald-950">
              RandomForestClassifier mencapai accuracy {formatPercent(metrics.classification.accuracy)} untuk kategori risiko.
            </div>
            <div className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              Silhouette score cluster {formatNumber(metrics.clustering.silhouette_score)} menunjukkan segmentasi masih dapat ditingkatkan.
            </div>
          </div>
        </Card>

        <section className="responsive-two-grid">
          <div>
            <CardHeader title="Regression Metrics" description="Perbandingan model regresi." />
            <DataTable rows={regressionRows} maxRows={10} />
          </div>
          <div>
            <CardHeader title="Classification Metrics" description="Perbandingan model klasifikasi." />
            <DataTable rows={classificationRows} maxRows={10} />
          </div>
          <div>
            <CardHeader title="Model Metrics" description="Ringkasan semua kategori evaluasi." />
            <DataTable rows={modelRows} maxRows={8} />
          </div>
          <div>
            <CardHeader title="Cluster Summary" description="Metrik agregat per cluster." />
            <DataTable rows={clusterRows} maxRows={8} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
