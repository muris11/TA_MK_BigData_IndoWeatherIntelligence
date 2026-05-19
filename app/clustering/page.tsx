import { Network, Thermometer, Waves, Wind } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { ClusterChart } from "@/components/charts/ClusterChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/Table";
import { ClusterPredictionForm } from "@/components/forms/ClusterPredictionForm";
import { clusterDescriptions, clusterLabels } from "@/lib/constants";
import { getMetrics } from "@/lib/data/get-metrics";
import { getClusterSummaryRows, getRecommendationRows } from "@/lib/data/get-weather-data";
import { formatNumber } from "@/lib/format";

export default async function ClusteringPage() {
  const [metrics, clusterRows, recommendationRows] = await Promise.all([
    getMetrics(),
    getClusterSummaryRows(),
    getRecommendationRows(20),
  ]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Unsupervised Learning"
        title="Clustering Wilayah Iklim"
        description="Segmentasi wilayah berdasarkan karakteristik suhu, kelembapan, curah hujan, tekanan, awan, dan angin."
        icon={Network}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <StatCard title="Algoritma" value={metrics.clustering.model} description="Model clustering utama." icon={Network} />
          <StatCard title="Jumlah Cluster" value={String(metrics.clustering.n_clusters)} description="Segmentasi wilayah iklim." icon={Network} />
          <StatCard
            title="Silhouette Score"
            value={formatNumber(metrics.clustering.silhouette_score)}
            description="Kualitas pemisahan cluster."
            icon={Waves}
            status="success"
          />
          <StatCard title="Fitur Clustering" value="9" description="Agregasi cuaca per wilayah." icon={Thermometer} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ClusterChart data={clusterRows} />
          <Card>
            <CardHeader title="Interpretasi Cluster" description="Label dibuat dari pola metrik rata-rata tiap cluster." />
            <div className="responsive-compact-grid">
              {clusterRows.map((row) => (
                <div key={row.cluster} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-slate-800">{clusterLabels[row.cluster]}</h3>
                    <Badge variant="info">C{row.cluster}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{clusterDescriptions[row.cluster]}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span className="rounded-xl bg-white p-2">Wilayah: {row.jumlah_wilayah}</span>
                    <span className="rounded-xl bg-white p-2">Hujan: {formatNumber(row.rata_rata_curah_hujan)} mm</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card>
          <CardHeader title="Fitur yang Digunakan" description="Kolom agregasi wilayah dari model_bundle.pkl." />
          <div className="responsive-compact-grid">
            {[
              "temperature_2m_mean",
              "relative_humidity_2m_mean",
              "precipitation_mean",
              "precipitation_sum",
              "rain_sum",
              "wind_speed_10m_mean",
              "surface_pressure_mean",
              "cloud_cover_mean",
              "soil_moisture_0_to_7cm_mean",
            ].map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {feature}
              </div>
            ))}
          </div>
        </Card>

        <ClusterPredictionForm rows={recommendationRows} />

        <section className="responsive-two-grid">
          <div>
            <CardHeader title="Cluster Summary" description="Data cluster_summary.csv." />
            <DataTable rows={clusterRows as unknown as Record<string, unknown>[]} maxRows={8} />
          </div>
          <Card>
            <CardHeader title="Rekomendasi per Cluster" description="Arah mitigasi berdasarkan karakteristik iklim." />
            <div className="space-y-3">
              {clusterRows.map((row) => (
                <div key={row.cluster} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <Wind className="mt-1 h-5 w-5 shrink-0 text-cyan-700" aria-hidden />
                  <div>
                    <p className="font-semibold text-slate-800">{clusterLabels[row.cluster]}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{clusterDescriptions[row.cluster]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
