import fs from "node:fs/promises";
import path from "node:path";
import type {
  CityRainfallRow,
  ClusterSummaryRow,
  ProvinceRainfallRow,
  RecommendationRow,
  TrendRow,
} from "@/types/dataset";
import type { EncoderMapping } from "@/types/weather";
import { getCsvRows } from "./get-csv-data";
import { monthLabels, toNumber } from "./schemas";

export async function getTrendRows() {
  const rows = await getCsvRows<Record<string, unknown>>("trend_curah_hujan_bulanan.csv");
  return rows.map((row) => {
    const tahun = toNumber(row.tahun);
    const bulan = toNumber(row.bulan);
    return {
      tahun,
      bulan,
      label: `${monthLabels[bulan - 1] ?? bulan} ${tahun}`,
      curah_hujan_rata_rata: toNumber(row.curah_hujan_rata_rata ?? row.harga_rata_rata),
      suhu_rata_rata: toNumber(row.suhu_rata_rata),
      kelembapan_rata_rata: toNumber(row.kelembapan_rata_rata),
      jumlah_data: toNumber(row.jumlah_data),
    } satisfies TrendRow;
  });
}

export async function getTopProvinceRows(limit?: number) {
  const rows = await getCsvRows<Record<string, unknown>>("top_provinsi_curah_hujan.csv");
  const mapped = rows.map((row) => ({
    provinsi: String(row.provinsi ?? ""),
    curah_hujan_rata_rata: toNumber(row.curah_hujan_rata_rata ?? row.harga_rata_rata),
    suhu_rata_rata: toNumber(row.suhu_rata_rata),
    kelembapan_rata_rata: toNumber(row.kelembapan_rata_rata),
    jumlah_data: toNumber(row.jumlah_data),
  })) satisfies ProvinceRainfallRow[];
  return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
}

export async function getTopCityRows(limit?: number) {
  const rows = await getCsvRows<Record<string, unknown>>("top_kota_curah_hujan.csv");
  const mapped = rows.map((row) => ({
    kota: String(row.kota ?? ""),
    curah_hujan_rata_rata: toNumber(row.curah_hujan_rata_rata ?? row.harga_rata_rata),
    suhu_rata_rata: toNumber(row.suhu_rata_rata),
    jumlah_data: toNumber(row.jumlah_data),
  })) satisfies CityRainfallRow[];
  return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
}

export async function getClusterSummaryRows() {
  const rows = await getCsvRows<Record<string, unknown>>("cluster_summary.csv");
  return rows.map((row) => ({
    cluster: toNumber(row.cluster),
    jumlah_wilayah: toNumber(row.jumlah_wilayah),
    rata_rata_suhu: toNumber(row.rata_rata_suhu),
    rata_rata_kelembapan: toNumber(row.rata_rata_kelembapan),
    rata_rata_curah_hujan: toNumber(row.rata_rata_curah_hujan),
    total_curah_hujan: toNumber(row.total_curah_hujan),
    rata_rata_angin: toNumber(row.rata_rata_angin),
  })) satisfies ClusterSummaryRow[];
}

export async function getRecommendationRows(limit?: number) {
  const rows = await getCsvRows<Record<string, unknown>>("recommendation_summary.csv");
  const mapped = rows.map((row) => ({
    provinsi: String(row.provinsi ?? ""),
    kota: String(row.kota ?? ""),
    cluster: toNumber(row.cluster),
    interpretasi_cluster: String(row.interpretasi_cluster ?? ""),
    temperature_2m_mean: toNumber(row.temperature_2m_mean),
    relative_humidity_2m_mean: toNumber(row.relative_humidity_2m_mean),
    precipitation_mean: toNumber(row.precipitation_mean),
    rain_sum: toNumber(row.rain_sum),
    wind_speed_10m_mean: toNumber(row.wind_speed_10m_mean),
    rekomendasi_mitigasi: String(row.rekomendasi_mitigasi ?? ""),
  })) satisfies RecommendationRow[];
  return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
}

export async function getEncoderMapping() {
  const filePath = path.join(process.cwd(), "model", "encoder_mapping.json");
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as EncoderMapping;
}
