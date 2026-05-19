import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  CloudRain,
  Database,
  ExternalLink,
  Network,
  ShieldAlert,
} from "lucide-react";
import { APP_NAME, APP_TAGLINE, workflowSteps } from "@/lib/constants";
import { getDashboardSummary } from "@/lib/data/get-dashboard-summary";
import { getDatasetSummary } from "@/lib/data/get-dataset-summary";
import { getMetrics } from "@/lib/data/get-metrics";
import { formatMb, formatNumber, formatPercent } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default async function LandingPage() {
  const [dataset, dashboard, metrics] = await Promise.all([
    getDatasetSummary(),
    getDashboardSummary(),
    getMetrics(),
  ]);

  const featureCards = [
    {
      title: "EDA Cuaca Historis",
      description: "Tren curah hujan, suhu, kelembapan, dan ranking wilayah prioritas.",
      icon: BarChart3,
    },
    {
      title: "Clustering Iklim",
      description: "Segmentasi wilayah menggunakan K-Means dengan 4 cluster iklim.",
      icon: Network,
    },
    {
      title: "Prediksi dan Risiko",
      description: "Regresi curah hujan dan klasifikasi risiko cuaca dari model export.",
      icon: ShieldAlert,
    },
    {
      title: "Evaluasi Model",
      description: "Metrik regresi, klasifikasi, clustering, dan deep learning.",
      icon: BrainCircuit,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="dashboard-grid relative px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-h-[84vh] max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.82fr] lg:gap-12">
          <div className="py-8 sm:py-10">
            <Badge variant="info">Big Data Analytics Cuaca Indonesia</Badge>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.45rem,7vw,4.9rem)] font-bold leading-[0.98] text-cyan-950">
              {APP_NAME}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{APP_TAGLINE}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/dashboard">
                  <CloudRain className="h-4 w-4" aria-hidden />
                  Buka Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dataset">
                  <Database className="h-4 w-4" aria-hidden />
                  Lihat Validasi Dataset
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-cyan-100 bg-white/85 p-4 shadow-[0_16px_50px_-38px_rgba(8,145,178,0.65)] backdrop-blur">
                <p className="text-xs text-slate-500">Dataset Mentah</p>
                <p className="mt-1 text-2xl font-bold text-cyan-950">{formatMb(dataset.total_size_mb)}</p>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-white/85 p-4 shadow-[0_16px_50px_-38px_rgba(5,150,105,0.5)] backdrop-blur">
                <p className="text-xs text-slate-500">Data Clean</p>
                <p className="mt-1 text-2xl font-bold text-emerald-900">
                  {formatNumber(dashboard.total_data_clean ?? dashboard.total_rows, 0)}
                </p>
              </div>
              <div className="rounded-3xl border border-sky-100 bg-white/85 p-4 shadow-[0_16px_50px_-38px_rgba(2,132,199,0.5)] backdrop-blur">
                <p className="text-xs text-slate-500">Accuracy Risiko</p>
                <p className="mt-1 text-2xl font-bold text-sky-900">
                  {formatPercent(metrics.classification.accuracy)}
                </p>
              </div>
            </div>
          </div>

          <Card className="relative overflow-hidden p-0">
            <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-800 to-teal-700 px-5 py-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-cyan-200">Notebook Export</p>
                  <h2 className="mt-1 text-lg font-semibold">Tren Curah Hujan</h2>
                </div>
                <Activity className="h-6 w-6 text-cyan-300" aria-hidden />
              </div>
            </div>
            <div className="p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cyan-100 bg-cyan-50/70">
                <Image
                  src="/data/grafik/tren_curah_hujan_bulanan.png"
                  alt="Grafik tren curah hujan bulanan dari output notebook"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-cyan-50 p-4">
                  <p className="text-xs text-cyan-800">Rata-rata Curah Hujan</p>
                  <p className="mt-1 text-xl font-bold text-cyan-950">
                    {formatNumber(dashboard.rata_rata_curah_hujan)} mm
                  </p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-800">Provinsi</p>
                  <p className="mt-1 text-xl font-bold text-emerald-950">
                    {dashboard.jumlah_provinsi ?? dashboard.total_provinsi}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="responsive-card-grid">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <div className="inline-flex rounded-xl bg-cyan-50 p-3 text-cyan-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-cyan-950">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-cyan-100 bg-white/72 px-4 py-14 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Workflow</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-cyan-950">Alur analitik dari dataset sampai rekomendasi</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Website ini menjadi lapisan presentasi untuk output notebook Big Data Analytics. Setiap halaman memakai
              file export yang sama agar hasil demo konsisten.
            </p>
          </div>
          <div className="grid gap-3">
            {workflowSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-3xl border border-cyan-100 bg-cyan-50/50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-700 to-teal-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-900 via-cyan-800 to-teal-800 p-6 text-white shadow-[0_28px_85px_-45px_rgba(8,145,178,0.8)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <Badge variant="success">Dataset open/public tervalidasi</Badge>
              <h2 className="mt-5 text-3xl font-bold">Siap untuk demo tugas besar dan deployment Vercel</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Sumber utama {dataset.dataset_source} dengan lisensi CC BY 4.0 dan sumber pendukung BMKG Data Terbuka.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild variant="primary">
                <Link href="/prediksi-curah-hujan">Coba Prediksi</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/10 !text-white hover:bg-white/20 [&_*]:!text-white">
                <a href={dataset.dataset_link} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Sumber Data
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
