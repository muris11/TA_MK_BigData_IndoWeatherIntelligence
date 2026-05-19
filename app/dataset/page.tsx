import { Database, ExternalLink, FileArchive, HardDrive, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatasetProofCard } from "@/components/cards/DatasetProofCard";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/Table";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { getCsvRows } from "@/lib/data/get-csv-data";
import { getDatasetSummary } from "@/lib/data/get-dataset-summary";
import { formatMb } from "@/lib/format";

export default async function DatasetPage() {
  const [summary, reportRows, downloadRows, sourceRows] = await Promise.all([
    getDatasetSummary(),
    getCsvRows<Record<string, unknown>>("dataset_size_report.csv"),
    getCsvRows<Record<string, unknown>>("download_log.csv"),
    getCsvRows<Record<string, unknown>>("dataset_sources.csv"),
  ]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Dataset"
        title="Validasi Dataset Open/Public"
        description="Bukti sumber data, ukuran raw dataset, jumlah file, dan proses download dari notebook."
        icon={Database}
      />

      <div className="space-y-6">
        <DatasetProofCard summary={summary} />

        <section className="responsive-card-grid">
          <StatCard title="Sumber Utama" value="Open-Meteo" description="Historical Weather API, lisensi CC BY 4.0." icon={Database} />
          <StatCard title="Sumber Pendukung" value="BMKG" description="Data Terbuka BMKG sebagai rujukan Indonesia." icon={ShieldCheck} />
          <StatCard title="Total Raw" value={formatMb(summary.total_size_mb)} description="Dihitung dari folder data_raw." icon={HardDrive} status="success" />
          <StatCard title="Jumlah File" value={String(summary.jumlah_file)} description="File dataset mentah yang diunduh." icon={FileArchive} />
        </section>

        <Card>
          <CardHeader title="Sumber dan Lisensi" description="Dataset bukan sintetis dan berasal dari API historis cuaca publik." />
          <div className="responsive-two-grid">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-800">{summary.dataset_source}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Historical weather hourly berbasis koordinat, terbuka untuk analisis data.</p>
              <Button asChild variant="outline" className="mt-4">
                <a href={summary.dataset_link} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Buka Dokumentasi
                </a>
              </Button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-800">{summary.supporting_source}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Sumber pendukung resmi Indonesia untuk konteks cuaca dan iklim.</p>
              <Button asChild variant="outline" className="mt-4">
                <a href={summary.supporting_link} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Buka BMKG
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <Alert title="Kesimpulan Validasi" variant="info">
          Dataset raw sebesar {formatMb(summary.total_size_mb)} dari {summary.jumlah_file} file memenuhi syarat
          minimal {formatMb(summary.minimum_required_mb)}. Data diambil dari sumber public/open, bukan data sintetis.
        </Alert>

        <section className="responsive-two-grid">
          <div>
            <CardHeader title="Dataset Size Report" description="Daftar file raw dan ukuran setiap file." />
            <DataTable rows={reportRows} columns={["nama_file", "ekstensi", "ukuran_mb"]} maxRows={18} />
          </div>
          <div>
            <CardHeader title="Download Log" description="Log unduhan notebook per tahun dan wilayah." />
            <DataTable rows={downloadRows} columns={["tahun", "provinsi", "kota", "status", "rows", "ukuran_mb"]} maxRows={18} />
          </div>
        </section>

        <Card>
          <CardHeader title="Variabel dan File Output" description="Output yang digunakan oleh website sesuai PRD." />
          <div className="responsive-two-grid">
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              Variabel utama mencakup suhu, kelembapan, dew point, tekanan udara, tutupan awan, kecepatan angin,
              radiasi, soil moisture, dan fitur lag/rolling curah hujan.
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              File CSV/JSON agregasi disalin ke public/data, sedangkan model_bundle.pkl disimpan di folder model
              agar tidak terekspos sebagai aset publik.
            </div>
          </div>
          <div className="mt-6">
            <DataTable rows={sourceRows} maxRows={8} />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
