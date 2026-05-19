import { CloudRain, Gauge, Thermometer, Waves } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { RainfallPredictionForm } from "@/components/forms/RainfallPredictionForm";
import { StatCard } from "@/components/cards/StatCard";
import { getEncoderMapping } from "@/lib/data/get-weather-data";
import { getMetrics } from "@/lib/data/get-metrics";
import { formatNumber } from "@/lib/format";

export default async function RainfallPredictionPage() {
  const [encoderMapping, metrics] = await Promise.all([getEncoderMapping(), getMetrics()]);
  const provinceOptions = Object.keys(encoderMapping.provinsi);
  const cityOptions = Object.keys(encoderMapping.kota);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Regression Model"
        title="Prediksi Curah Hujan"
        description="Form demonstrasi untuk menjalankan model regresi curah hujan dari model_bundle.pkl."
        icon={CloudRain}
      />

      <div className="space-y-6">
        <section className="responsive-card-grid">
          <StatCard title="Model Terbaik" value={metrics.regression.best_model} description="Model regresi hasil evaluasi." icon={CloudRain} />
          <StatCard title="Target" value={metrics.regression.target ?? "precipitation"} description="Curah hujan dalam milimeter." icon={Waves} />
          <StatCard title="RMSE" value={formatNumber(metrics.regression.rmse)} description="Root Mean Squared Error." icon={Gauge} status="success" />
          <StatCard title="R2 Score" value={formatNumber(metrics.regression.r2_score)} description="Kekuatan penjelasan model." icon={Thermometer} />
        </section>

        <RainfallPredictionForm
          provinceOptions={provinceOptions}
          cityOptions={cityOptions}
          encoderMapping={encoderMapping}
        />
      </div>
    </AppShell>
  );
}
