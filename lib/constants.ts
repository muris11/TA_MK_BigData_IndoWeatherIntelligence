export const APP_NAME = "IndoWeather Intelligence";

export const APP_TAGLINE =
  "Big Data Analytics untuk Prediksi Curah Hujan, Klasifikasi Risiko Cuaca, Segmentasi Wilayah Iklim, dan Rekomendasi Mitigasi.";

export const clusterLabels: Record<number, string> = {
  0: "Wilayah Basah Tinggi",
  1: "Lembap Sedang",
  2: "Dataran Sejuk Basah",
  3: "Panas Berangin",
};

export const clusterDescriptions: Record<number, string> = {
  0: "Curah hujan dan kelembapan tinggi. Prioritas pada drainase, banjir, dan monitoring genangan.",
  1: "Kelembapan sedang dengan curah hujan lebih stabil. Cocok sebagai pembanding pola normal.",
  2: "Suhu rendah dengan curah hujan tinggi. Perlu perhatian pada wilayah elevasi dan akses logistik.",
  3: "Suhu serta angin relatif tinggi, curah hujan lebih rendah. Perlu mitigasi kekeringan dan air bersih.",
};

export const riskCopy = {
  Aman: {
    label: "Aman",
    description: "Kondisi relatif aman. Monitoring rutin tetap diperlukan.",
    recommendation: "Lanjutkan pemantauan periodik dan pastikan kanal informasi cuaca aktif.",
  },
  Waspada: {
    label: "Waspada",
    description: "Curah hujan mulai meningkat dan perlu perhatian operasional.",
    recommendation: "Pantau drainase, aktivitas luar ruang, dan wilayah rawan genangan.",
  },
  Tinggi: {
    label: "Tinggi",
    description: "Potensi curah hujan tinggi. Mitigasi banjir dan peringatan dini perlu diprioritaskan.",
    recommendation: "Siapkan respons cepat, cek jalur evakuasi, dan koordinasi informasi peringatan dini.",
  },
} as const;

export const workflowSteps = [
  "Pengumpulan data Open-Meteo hourly untuk kota/provinsi Indonesia.",
  "Validasi ukuran dataset mentah minimal 100 MB.",
  "EDA, pembersihan data, dan feature engineering temporal/cuaca.",
  "Clustering wilayah iklim menggunakan K-Means.",
  "Regresi curah hujan dan klasifikasi risiko cuaca.",
  "Evaluasi model, interpretasi, rekomendasi, dan export ke dashboard.",
];
