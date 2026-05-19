import { ClipboardCheck, Droplets, MapPinned, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { RecommendationCard } from "@/components/cards/RecommendationCard";
import { RecommendationExplorer } from "@/components/sections/RecommendationExplorer";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { getRecommendationRows, getTopProvinceRows } from "@/lib/data/get-weather-data";

export default async function RecommendationPage() {
  const [recommendationRows, provinceRows] = await Promise.all([
    getRecommendationRows(),
    getTopProvinceRows(6),
  ]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Mitigation Recommendation"
        title="Rekomendasi Mitigasi"
        description="Rekomendasi berbasis risiko curah hujan, cluster wilayah, dan ranking daerah prioritas."
        icon={ClipboardCheck}
      />

      <div className="space-y-6">
        <section className="responsive-compact-grid">
          <RecommendationCard
            title="Wilayah Basah"
            description="Prioritaskan monitoring drainase, potensi genangan, dan kesiapan respons banjir."
            priority="high"
            icon={Droplets}
          />
          <RecommendationCard
            title="Wilayah Panas dan Berangin"
            description="Pantau kebutuhan air bersih, kekeringan lokal, dan aktivitas luar ruang."
            priority="medium"
            icon={ShieldAlert}
          />
          <RecommendationCard
            title="Wilayah Stabil"
            description="Gunakan sebagai pembanding pola normal dan basis monitoring rutin."
            priority="low"
            icon={MapPinned}
          />
        </section>

        <Card>
          <CardHeader
            title="Provinsi Prioritas Curah Hujan"
            description="Top provinsi dari agregasi curah hujan historis."
          />
          <div className="responsive-compact-grid">
            {provinceRows.map((row, index) => (
              <div key={row.provinsi} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Prioritas {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-800">{row.provinsi}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Rata-rata curah hujan tinggi sehingga perlu pemantauan drainase dan mitigasi genangan.
                </p>
              </div>
            ))}
          </div>
        </Card>

        <RecommendationExplorer rows={recommendationRows} />

        <div>
          <CardHeader title="Tabel Recommendation Summary" description="Data mentah dari recommendation_summary.csv." />
          <DataTable rows={recommendationRows as unknown as Record<string, unknown>[]} maxRows={18} />
        </div>
      </div>
    </AppShell>
  );
}
