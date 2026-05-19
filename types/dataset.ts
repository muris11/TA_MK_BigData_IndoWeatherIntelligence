export type DatasetSizeSummary = {
  total_size_mb: number;
  minimum_required_mb: number;
  target_download_mb: number;
  is_minimum_100mb: boolean;
  jumlah_file: number;
  dataset_source: string;
  dataset_link: string;
  supporting_source: string;
  supporting_link: string;
  catatan: string;
};

export type DashboardSummary = {
  project_title?: string;
  total_rows?: number;
  total_data_clean?: number;
  total_provinsi?: number;
  jumlah_provinsi?: number;
  total_kota?: number;
  jumlah_kota?: number;
  tahun_awal: number;
  tahun_akhir: number;
  rata_rata_curah_hujan: number;
  rata_rata_suhu: number;
  rata_rata_kelembapan: number;
  curah_hujan_maksimum?: number;
  maksimum_curah_hujan?: number;
  suhu_maksimum?: number;
  suhu_minimum?: number;
  rata_rata_kecepatan_angin?: number;
  total_dataset_raw_mb?: number;
  is_dataset_minimum_100mb?: boolean;
};

export type TrendRow = {
  tahun: number;
  bulan: number;
  label: string;
  curah_hujan_rata_rata: number;
  suhu_rata_rata: number;
  kelembapan_rata_rata?: number;
  jumlah_data: number;
};

export type ProvinceRainfallRow = {
  provinsi: string;
  curah_hujan_rata_rata: number;
  suhu_rata_rata: number;
  kelembapan_rata_rata?: number;
  jumlah_data: number;
};

export type CityRainfallRow = {
  kota: string;
  curah_hujan_rata_rata: number;
  suhu_rata_rata: number;
  jumlah_data: number;
};

export type ClusterSummaryRow = {
  cluster: number;
  jumlah_wilayah: number;
  rata_rata_suhu: number;
  rata_rata_kelembapan: number;
  rata_rata_curah_hujan: number;
  total_curah_hujan: number;
  rata_rata_angin: number;
};

export type RecommendationRow = {
  provinsi: string;
  kota: string;
  cluster: number;
  interpretasi_cluster: string;
  temperature_2m_mean: number;
  relative_humidity_2m_mean: number;
  precipitation_mean: number;
  rain_sum: number;
  wind_speed_10m_mean: number;
  rekomendasi_mitigasi: string;
};
