import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  CloudRain,
  Database,
  HardDrive,
  Map,
  Network,
  ShieldAlert,
  Thermometer,
  Waves,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { MetricCard } from "@/components/cards/MetricCard";
import { DatasetProofCard } from "@/components/cards/DatasetProofCard";
import { AreaTrendChart } from "@/components/charts/AreaTrendChart";
import { BarRankChart } from "@/components/charts/BarRankChart";
import { MetricComparisonChart } from "@/components/charts/MetricComparisonChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getDashboardSummary } from "@/lib/data/get-dashboard-summary";
import { getDatasetSummary } from "@/lib/data/get-dataset-summary";
import { getMetrics } from "@/lib/data/get-metrics";
import { getRecommendationRows, getTopCityRows, getTopProvinceRows, getTrendRows } from "@/lib/data/get-weather-data";
import { formatMb, formatNumber, formatPercent, formatTemperature } from "@/lib/format";

export default async function DashboardPage() {
  const [summary, dataset, metrics, trendRows, provinceRows, cityRows, recommendationRows] =
    await Promise.all([
      getDashboardSummary(),
      getDatasetSummary(),
      getMetrics(),
      getTrendRows(),
      getTopProvinceRows(8),
      getTopCityRows(8),
      getRecommendationRows(4),
    ]);

  const provinceCount = summary.jumlah_provinsi ?? summary.total_provinsi ?? 0;
  const cityCount = summary.jumlah_kota ?? summary.total_kota ?? 0;
  const totalClean = summary.total_data_clean ?? summary.total_rows ?? 0;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Dashboard"
        title="Ringkasan Cuaca Historis Indonesia"
        description="Satu layar untuk melihat bukti dataset, tren utama, metrik model, dan rekomendasi mitigasi."
        icon={CloudRain}
      />

      <div className="space-y-6">
        <DatasetProofCard summary={dataset} />

        <section className="responsive-card-grid">
          <StatCard
            title="Total Dataset Mentah"
            value={formatMb(dataset.total_size_mb)}
            description="Ukuran raw dataset."
            icon={HardDrive}
            status="success"
          />
          <StatCard
            title="Status 100 MB"
            value={dataset.is_minimum_100mb ? "Valid" : "Tidak Valid"}
            description={`Minimal wajib ${formatMb(dataset.minimum_required_mb)}.`}
            icon={CheckCircle2}
            status={dataset.is_minimum_100mb ? "success" : "danger"}
          />
          <StatCard title="Jumlah File" value={String(dataset.jumlah_file)} description="File raw dataset." icon={Database} />
          <StatCard title="Data Clean" value={formatNumber(totalClean, 0)} description="Baris data setelah preprocessing." icon={Activity} />
          <StatCard title="Provinsi" value={String(provinceCount)} description="Cakupan wilayah provinsi." icon={Map} />
          <StatCard title="Kota" value={String(cityCount)} description="Cakupan kota representatif." icon={Map} />
          <StatCard
            title="Rata-rata Curah Hujan"
            value={`${formatNumber(summary.rata_rata_curah_hujan)} mm`}
            description="Rata-rata hourly."
            icon={Waves}
          />
          <StatCard
            title="Rata-rata Suhu"
            value={formatTemperature(summary.rata_rata_suhu)}
            description="Rata-rata temperature 2m."
            icon={Thermometer}
          />
        </section>

        <section className="responsive-card-grid">
          <MetricCard
            modelName={metrics.regression.best_model}
            metricName="Regression RMSE"
            value={formatNumber(metrics.regression.rmse)}
            description="Semakin kecil RMSE, semakin kecil error prediksi curah hujan."
            icon={CloudRain}
          />
          <MetricCard
            modelName={metrics.classification.best_model}
            metricName="Classification Accuracy"
            value={formatPercent(metrics.classification.accuracy)}
            description="Akurasi klasifikasi kategori risiko cuaca."
            icon={ShieldAlert}
          />
          <MetricCard
            modelName={metrics.clustering.model}
            metricName="Silhouette Score"
            value={formatNumber(metrics.clustering.silhouette_score)}
            description="Kualitas pemisahan cluster wilayah iklim."
            icon={Network}
          />
          <MetricCard
            modelName={metrics.deep_learning.model}
            metricName="Deep Learning RMSE"
            value={formatNumber(metrics.deep_learning.rmse)}
            description="Performa MLPRegressor sebagai model neural network sederhana."
            icon={BrainCircuit}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.9fr)]">
          <AreaTrendChart data={trendRows} />
          <BarRankChart
            data={provinceRows.map((row) => ({ label: row.provinsi, value: row.curah_hujan_rata_rata }))}
            title="Top Provinsi Curah Hujan"
            description="Provinsi dengan rata-rata curah hujan tertinggi."
          />
        </section>

        <section className="responsive-two-grid">
          <BarRankChart
            data={cityRows.map((row) => ({ label: row.kota, value: row.curah_hujan_rata_rata }))}
            title="Top Kota Curah Hujan"
            description="Kota dengan rata-rata curah hujan tertinggi."
            color="#0f766e"
          />
          <MetricComparisonChart
            data={[
              { label: "R2 Reg", value: metrics.regression.r2_score },
              { label: "Accuracy", value: metrics.classification.accuracy },
              { label: "Silhouette", value: metrics.clustering.silhouette_score },
              { label: "R2 DL", value: metrics.deep_learning.r2_score },
            ]}
          />
        </section>

        <Card>
          <CardHeader
            title="Rekomendasi Singkat"
            description="Wilayah prioritas dari tabel recommendation_summary.csv."
          />
          <div className="responsive-two-grid">
            {recommendationRows.map((row) => (
              <div key={`${row.provinsi}-${row.kota}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-800">
                    {row.kota}, {row.provinsi}
                  </h3>
                  <Badge variant="info">Cluster {row.cluster}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{row.rekomendasi_mitigasi}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
