import { BarChart3, CloudRain, Droplets, Thermometer, Waves } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import { AreaTrendChart } from "@/components/charts/AreaTrendChart";
import { LineTrendChart } from "@/components/charts/LineTrendChart";
import { BarRankChart } from "@/components/charts/BarRankChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { getDashboardSummary } from "@/lib/data/get-dashboard-summary";
import { getTopCityRows, getTopProvinceRows, getTrendRows } from "@/lib/data/get-weather-data";
import { formatNumber, formatTemperature } from "@/lib/format";

export default async function EdaPage() {
  const [summary, trendRows, provinceRows, cityRows] = await Promise.all([
    getDashboardSummary(),
    getTrendRows(),
    getTopProvinceRows(10),
    getTopCityRows(10),
  ]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Exploratory Data Analysis"
        title="EDA Cuaca Historis Indonesia"
        description="Eksplorasi tren bulanan, suhu, kelembapan, dan wilayah dengan curah hujan tertinggi."
        icon={BarChart3}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <StatCard
            title="Rata-rata Curah Hujan"
            value={`${formatNumber(summary.rata_rata_curah_hujan)} mm`}
            description="Rata-rata seluruh data clean."
            icon={CloudRain}
          />
          <StatCard
            title="Curah Hujan Maksimum"
            value={`${formatNumber(summary.maksimum_curah_hujan ?? summary.curah_hujan_maksimum)} mm`}
            description="Nilai maksimum pada data historis."
            icon={Waves}
            status="warning"
          />
          <StatCard
            title="Rata-rata Suhu"
            value={formatTemperature(summary.rata_rata_suhu)}
            description="Suhu udara rata-rata."
            icon={Thermometer}
          />
          <StatCard
            title="Rata-rata Kelembapan"
            value={`${formatNumber(summary.rata_rata_kelembapan)}%`}
            description="Kelembapan relatif rata-rata."
            icon={Droplets}
            status="success"
          />
        </section>

        <section className="responsive-two-grid">
          <AreaTrendChart data={trendRows} />
          <LineTrendChart data={trendRows} />
        </section>

        <section className="responsive-two-grid">
          <BarRankChart
            data={provinceRows.map((row) => ({ label: row.provinsi, value: row.curah_hujan_rata_rata }))}
            title="Top Provinsi"
            description="Provinsi dengan rata-rata curah hujan tertinggi."
          />
          <BarRankChart
            data={cityRows.map((row) => ({ label: row.kota, value: row.curah_hujan_rata_rata }))}
            title="Top Kota"
            description="Kota dengan rata-rata curah hujan tertinggi."
            color="#0f766e"
          />
        </section>

        <Card>
          <CardHeader title="Insight EDA" description="Interpretasi ringkas dari agregasi hasil notebook." />
          <div className="responsive-compact-grid">
            <div className="rounded-2xl bg-cyan-50 p-5 text-sm leading-7 text-cyan-950">
              Curah hujan rata-rata nasional rendah secara hourly, tetapi nilai maksimum mencapai{" "}
              {formatNumber(summary.maksimum_curah_hujan ?? summary.curah_hujan_maksimum)} mm sehingga analisis risiko
              tetap diperlukan.
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5 text-sm leading-7 text-emerald-950">
              Wilayah dengan kelembapan tinggi cenderung masuk prioritas mitigasi banjir dan monitoring drainase.
            </div>
            <div className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              Fitur temporal, lag, dan rolling precipitation dipakai untuk memperkuat prediksi curah hujan.
            </div>
          </div>
        </Card>

        <section className="responsive-two-grid">
          <div>
            <CardHeader title="Ranking Provinsi" description="Data top_provinsi_curah_hujan.csv." />
            <DataTable rows={provinceRows as unknown as Record<string, unknown>[]} maxRows={10} />
          </div>
          <div>
            <CardHeader title="Ranking Kota" description="Data top_kota_curah_hujan.csv." />
            <DataTable rows={cityRows as unknown as Record<string, unknown>[]} maxRows={10} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
