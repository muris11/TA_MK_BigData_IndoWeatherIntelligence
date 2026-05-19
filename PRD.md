# PRD.md

# Product Requirements Document
# IndoWeather Intelligence
# Website Big Data Analytics Cuaca Historis Indonesia

## 1. Ringkasan Produk

**IndoWeather Intelligence** adalah website dashboard analitik berbasis **Next.js latest**, **Tailwind CSS 4**, dan **Vercel Python Function** untuk menampilkan hasil tugas besar Big Data Analytics dengan studi kasus **Data Cuaca Historis Indonesia**.

Website ini memvisualisasikan hasil pipeline notebook:

**Penerapan Big Data Analytics pada Data Cuaca Historis Indonesia untuk Prediksi Curah Hujan, Klasifikasi Risiko Cuaca, Segmentasi Wilayah Iklim, dan Rekomendasi Mitigasi.**

Aplikasi harus dapat:

- Menampilkan ringkasan dataset cuaca historis Indonesia.
- Membuktikan dataset mentah memenuhi syarat minimal 100 MB.
- Menampilkan EDA, tren curah hujan, suhu, kelembapan, dan wilayah berisiko.
- Menampilkan hasil clustering wilayah iklim.
- Menjalankan prediksi curah hujan dari model `.pkl`.
- Menjalankan klasifikasi risiko cuaca dari model `.pkl`.
- Menampilkan metrik evaluasi model.
- Menampilkan rekomendasi mitigasi berdasarkan hasil analisis.
- Bisa di-hosting di **Vercel** sebagai satu project.
- Responsive penuh untuk desktop, tablet, dan mobile.
- Menggunakan icon dari `lucide-react`, bukan emoji/emoticon.

---

## 2. Latar Belakang

Tugas besar mensyaratkan pemanfaatan dataset open/public minimal 100 MB, proses analisis data menggunakan Google Colab/Jupyter Notebook, serta implementasi tahapan Big Data Analytics dan Machine Learning, mulai dari import dataset, eksplorasi data, preprocessing, feature engineering, pemodelan, evaluasi, visualisasi, sampai interpretasi hasil.

Dataset final yang digunakan adalah **Open-Meteo Historical Weather API** untuk wilayah Indonesia. Dataset ini bersifat open/public, berbasis koordinat lokasi, dan diunduh dalam resolusi hourly untuk beberapa kota/provinsi Indonesia. Output validasi dataset pada notebook menunjukkan:

```json
{
  "total_size_mb": 130.73,
  "minimum_required_mb": 100,
  "target_download_mb": 130,
  "is_minimum_100mb": true,
  "jumlah_file": 84,
  "dataset_source": "Open-Meteo Historical Weather API",
  "supporting_source": "BMKG Data Terbuka"
}
```

Artinya dataset mentah telah memenuhi syarat minimal 100 MB.

Website ini menjadi media presentasi dan demonstrasi hasil analisis agar tugas besar tidak hanya berupa notebook, tetapi juga memiliki antarmuka visual yang informatif dan profesional.

---

## 3. Tujuan Produk

### 3.1 Tujuan Akademik

Website harus membuktikan bahwa seluruh tahapan tugas besar terpenuhi:

1. Dataset open/public dan bukan sintetis.
2. Dataset mentah minimal 100 MB.
3. Pengolahan data dilakukan dengan notebook.
4. Terdapat EDA dan visualisasi.
5. Terdapat preprocessing dan feature engineering.
6. Terdapat unsupervised learning.
7. Terdapat supervised learning.
8. Terdapat regresi.
9. Terdapat deep learning sederhana.
10. Terdapat evaluasi model.
11. Terdapat interpretasi dan rekomendasi.
12. Output dapat ditampilkan dalam dashboard web.

### 3.2 Tujuan Produk

1. Menjadi dashboard analitik cuaca historis Indonesia.
2. Menampilkan data dan model secara jelas.
3. Memudahkan user memahami hasil notebook.
4. Menjalankan prediksi model melalui web.
5. Mendukung deployment di Vercel.
6. Menjadi bahan demo tugas besar dan video presentasi.

---

## 4. Scope Produk

### 4.1 In Scope

Fitur yang wajib dibuat:

- Landing page.
- Dashboard utama.
- Halaman dataset dan validasi 100 MB.
- Halaman EDA.
- Halaman clustering wilayah iklim.
- Halaman prediksi curah hujan.
- Halaman klasifikasi risiko cuaca.
- Halaman deep learning dan evaluasi model.
- Halaman rekomendasi mitigasi.
- Halaman dokumentasi metode.
- API Python Function untuk membaca `model_bundle.pkl`.
- API JSON/CSV untuk membaca output tabel.
- UI responsive.
- Animasi transisi menggunakan Framer Motion.
- Icon menggunakan `lucide-react`.
- Hosting di Vercel.

### 4.2 Out of Scope

Yang tidak wajib:

- Login dan autentikasi.
- Role admin/user.
- Realtime data update otomatis.
- Upload dataset dari UI.
- Training model dari UI.
- Edit dataset dari UI.
- Database production.
- Payment/subscription.
- Peta GIS kompleks dengan server tiles.
- Notifikasi realtime.

---

## 5. Target Pengguna

### 5.1 Mahasiswa

Membutuhkan website untuk demo tugas besar, menjelaskan dataset, metode, model, metrik, dan rekomendasi.

### 5.2 Dosen/Penguji

Membutuhkan bukti bahwa dataset dan metode sesuai ketentuan tugas, hasil bisa dijelaskan, dan proses analisis memiliki output yang jelas.

### 5.3 Audiens Presentasi

Membutuhkan ringkasan visual yang mudah dipahami tanpa membaca seluruh notebook.

---

## 6. Persona

### Persona 1: Mahasiswa Presenter

- Ingin menjelaskan project secara runtut.
- Butuh halaman yang bisa dipakai saat video presentasi.
- Butuh tampilan profesional.
- Butuh dashboard yang tidak error saat demo.

### Persona 2: Dosen Penguji

- Mengecek ukuran dataset.
- Mengecek sumber dataset.
- Mengecek apakah ada EDA, preprocessing, ML, evaluasi.
- Mengecek apakah model dapat digunakan.
- Mengecek interpretasi hasil.

### Persona 3: Pengguna Umum

- Ingin melihat ringkasan cuaca Indonesia.
- Ingin mengetahui wilayah dengan curah hujan tinggi.
- Ingin mencoba prediksi risiko cuaca.

---

## 7. Problem Statement

Data cuaca historis Indonesia berukuran besar dapat memberikan insight tentang pola curah hujan, suhu, kelembapan, dan risiko cuaca antarwilayah. Namun, data mentah sulit dipahami tanpa dashboard dan model analitik. Dengan Big Data Analytics, data ini dapat diolah untuk:

- Memahami pola cuaca historis.
- Mengelompokkan wilayah berdasarkan karakteristik iklim.
- Memprediksi curah hujan.
- Mengklasifikasikan risiko cuaca.
- Memberikan rekomendasi mitigasi.

---

## 8. Solusi yang Dibangun

Website dashboard berbasis Next.js yang:

1. Membaca output notebook berupa CSV/JSON.
2. Menampilkan visualisasi EDA.
3. Memuat model `.pkl` melalui Python Function di Vercel.
4. Menyediakan form prediksi curah hujan.
5. Menyediakan form klasifikasi risiko cuaca.
6. Menampilkan rekomendasi mitigasi.
7. Menyediakan halaman dataset untuk validasi tugas besar.
8. Siap deploy di Vercel.

---

## 9. Data Source

### 9.1 Dataset Utama

| Item | Detail |
|---|---|
| Nama | Open-Meteo Historical Weather API |
| Link | https://open-meteo.com/en/docs/historical-weather-api |
| Jenis | Cuaca historis hourly berbasis koordinat |
| Status | Open/Public |
| Lisensi | CC BY 4.0 |
| Variabel | suhu, kelembapan, curah hujan, tekanan, angin, awan, radiasi, tanah |
| Kegunaan | Dataset utama training dan analisis |

### 9.2 Sumber Pendukung

| Item | Detail |
|---|---|
| Nama | BMKG Data Terbuka |
| Link | https://data.bmkg.go.id/ |
| Jenis | Data terbuka cuaca/gempa/peringatan dini Indonesia |
| Kegunaan | Sumber pendukung resmi Indonesia |

---

## 10. Output dari Notebook

Website harus membaca output dari hasil notebook berikut.

### 10.1 Output Model

```text
output/model/model_bundle.pkl
output/model/model_metadata.json
output/model/encoder_mapping.json
```

### 10.2 Output Data Clean

```text
data_clean/weather_clean.csv
data_clean/data_eda.csv
data_clean/data_clustering.csv
data_clean/data_regresi.csv
data_clean/data_klasifikasi.csv
data_clean/data_deep_learning.csv
```

### 10.3 Output Tabel

```text
output/tabel/dataset_size_report.csv
output/tabel/dataset_size_summary.json
output/tabel/dashboard_summary.json
output/tabel/metrics.json
output/tabel/model_metrics.csv
output/tabel/cluster_summary.csv
output/tabel/regression_metrics.csv
output/tabel/classification_metrics.csv
output/tabel/recommendation_summary.csv
output/tabel/trend_curah_hujan_bulanan.csv
output/tabel/top_kota_curah_hujan.csv
output/tabel/top_provinsi_curah_hujan.csv
```

### 10.4 Output ZIP

```text
final_export_cuaca_indonesia.zip
```

---

## 11. Model Bundle Contract

`model_bundle.pkl` harus memiliki struktur minimal:

```python
model_bundle = {
    "project_info": {
        "title": "...",
        "subtitle": "...",
        "dataset_source": "...",
        "dataset_link": "...",
        "supporting_source": "...",
        "supporting_link": "...",
        "target_deployment": "Next.js + Vercel Python Function"
    },
    "models": {
        "regression_model": regression_model,
        "classification_model": classification_model,
        "clustering_model": kmeans_model,
        "deep_learning_model": deep_learning_model
    },
    "preprocessing": {
        "feature_columns_regression": [...],
        "feature_columns_classification": [...],
        "feature_columns_clustering": [...],
        "scaler_cluster": scaler_cluster,
        "label_encoders": label_encoders
    },
    "metrics": {...},
    "recommendation_rules": {...},
    "sample_input": {...}
}
```

---

## 12. Arsitektur Produk

### 12.1 High Level Architecture

```text
Google Colab / Jupyter Notebook
        |
        | export
        v
final_export_cuaca_indonesia.zip
        |
        | copy files
        v
Next.js Project
        |
        +-- public/data/*.json, *.csv
        +-- model/model_bundle.pkl
        +-- api/index.py
        |
        v
Vercel Hosting
        |
        +-- Next.js UI
        +-- Vercel Python Function
```

### 12.2 Runtime

| Bagian | Teknologi |
|---|---|
| Frontend | Next.js latest App Router |
| Styling | Tailwind CSS 4 |
| UI | React Server Components dan Client Components |
| Icons | lucide-react |
| Chart | Recharts |
| Animation | Framer Motion |
| Table | TanStack Table atau custom table |
| Backend ringan | Vercel Python Function |
| Python API | FastAPI |
| Model persistence | joblib `.pkl` |
| Deployment | Vercel |

---

## 13. Functional Requirements

### FR-001 Landing Page

Landing page harus menampilkan:

- Nama project.
- Deskripsi singkat.
- CTA ke dashboard.
- CTA ke dataset.
- Highlight dataset 130.73 MB.
- Highlight metode: EDA, clustering, regresi, supervised, deep learning.
- Section alur kerja dari dataset sampai rekomendasi.
- Section sumber data.
- Section fitur web.

### FR-002 Dashboard Utama

Dashboard harus menampilkan:

- Total ukuran dataset.
- Status validasi dataset 100 MB.
- Jumlah file dataset.
- Jumlah provinsi.
- Jumlah kota.
- Jumlah data clean.
- Rata-rata curah hujan.
- Rata-rata suhu.
- Rata-rata kelembapan.
- Ringkasan metrik model.
- Chart tren curah hujan bulanan.
- Top provinsi curah hujan.
- Top kota curah hujan.
- Rekomendasi singkat.

### FR-003 Halaman Dataset

Halaman dataset harus menampilkan:

- Sumber Open-Meteo.
- Sumber pendukung BMKG.
- Link dataset.
- Lisensi.
- Jumlah file.
- Total ukuran dataset.
- Validasi `is_minimum_100mb`.
- Tabel `dataset_size_report.csv`.
- Penjelasan variabel dataset.
- Alur download dataset dari notebook.
- Bukti bahwa dataset bukan sintetis.

### FR-004 Halaman EDA

Halaman EDA harus menampilkan:

- Statistik deskriptif.
- Missing value summary.
- Distribusi suhu.
- Distribusi curah hujan.
- Tren curah hujan bulanan.
- Tren suhu bulanan.
- Top provinsi curah hujan.
- Top kota curah hujan.
- Korelasi variabel utama.
- Insight EDA.

### FR-005 Halaman Clustering

Halaman clustering harus menampilkan:

- Algoritma: K-Means.
- Fitur clustering.
- Jumlah cluster.
- Silhouette score.
- Tabel cluster summary.
- Grafik jumlah data per cluster.
- Interpretasi setiap cluster.
- Rekomendasi per cluster.

### FR-006 Halaman Prediksi Curah Hujan

Halaman prediksi harus menyediakan form input:

- Tahun.
- Bulan.
- Jam.
- Provinsi.
- Kota.
- Suhu.
- Kelembapan.
- Titik embun.
- Tekanan udara.
- Tutupan awan.
- Kecepatan angin.
- Radiasi matahari.
- Soil moisture.
- Curah hujan sebelumnya.
- Rolling precipitation.

Output:

- Prediksi curah hujan.
- Kategori hasil.
- Interpretasi.
- Rekomendasi awal.
- Confidence jika tersedia.
- Waktu prediksi.

### FR-007 Halaman Klasifikasi Risiko Cuaca

Halaman klasifikasi harus menyediakan form input yang mirip prediksi, lalu mengeluarkan:

- Kategori risiko: Aman, Waspada, Tinggi.
- Confidence.
- Penjelasan risiko.
- Rekomendasi mitigasi.
- Warna status berdasarkan tingkat risiko.

### FR-008 Halaman Deep Learning

Halaman deep learning harus menampilkan:

- Model yang digunakan: MLPRegressor.
- Target prediksi.
- Input features.
- Metrik MAE, MSE, RMSE, R2.
- Perbandingan dengan model regresi lain.
- Penjelasan sederhana neural network.

### FR-009 Halaman Evaluasi Model

Halaman evaluasi harus menampilkan:

- Regression metrics.
- Classification metrics.
- Clustering metrics.
- Deep learning metrics.
- Model terbaik.
- Tabel `model_metrics.csv`.
- Penjelasan performa model.
- Keterbatasan model.

### FR-010 Halaman Rekomendasi Mitigasi

Halaman rekomendasi harus menampilkan:

- Rekomendasi berdasarkan risiko curah hujan.
- Rekomendasi berdasarkan cluster wilayah.
- Rekomendasi berdasarkan provinsi/kota prioritas.
- Tabel `recommendation_summary.csv`.
- Filter berdasarkan provinsi, kota, cluster, risk category.
- Export table sederhana jika memungkinkan.

### FR-011 Halaman Dokumentasi Metode

Halaman metode harus menjelaskan:

- Dataset.
- EDA.
- Preprocessing.
- Feature engineering.
- Clustering.
- Regresi.
- Klasifikasi.
- Deep learning.
- Evaluasi.
- Export model.
- Integrasi web.

### FR-012 API Health Check

API harus menyediakan endpoint:

```text
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "model_loaded": true,
  "available_models": ["regression_model", "classification_model", "clustering_model", "deep_learning_model"]
}
```

### FR-013 API Metadata

Endpoint:

```text
GET /api/metadata
```

Mengembalikan metadata project.

### FR-014 API Metrics

Endpoint:

```text
GET /api/metrics
```

Mengembalikan metrik model.

### FR-015 API Predict Rainfall

Endpoint:

```text
POST /api/predict-rainfall
```

Input:

```json
{
  "tahun": 2026,
  "bulan": 5,
  "jam": 14,
  "provinsi_encoded": 0,
  "kota_encoded": 0,
  "temperature_2m": 28.5,
  "relative_humidity_2m": 80,
  "dew_point_2m": 24.1,
  "surface_pressure": 1008,
  "cloud_cover": 70,
  "wind_speed_10m": 12,
  "shortwave_radiation": 250,
  "soil_moisture_0_to_7cm": 0.35,
  "precipitation_lag_1": 1.2,
  "precipitation_rolling_24h": 8.5
}
```

Output:

```json
{
  "status": "success",
  "prediction": 6.25,
  "unit": "mm",
  "category": "Waspada",
  "interpretation": "Curah hujan diprediksi sedang dan perlu pemantauan."
}
```

### FR-016 API Predict Risk

Endpoint:

```text
POST /api/predict-risk
```

Output:

```json
{
  "status": "success",
  "risk_category": "Waspada",
  "confidence": 0.86,
  "recommendation": "Pantau kondisi drainase dan aktivitas luar ruang."
}
```

### FR-017 API Predict Cluster

Endpoint:

```text
POST /api/predict-cluster
```

Output:

```json
{
  "status": "success",
  "cluster": 2,
  "interpretation": "Wilayah basah dengan curah hujan tinggi."
}
```

---

## 14. Non Functional Requirements

### 14.1 Performance

- First meaningful paint cepat.
- Halaman dashboard menggunakan data ringkasan, bukan membaca CSV besar penuh di client.
- CSV besar hanya ditampilkan secara paginated atau subset.
- Chart dibatasi maksimal top 10 atau agregasi.
- Gunakan dynamic import untuk chart berat.
- Gunakan loading skeleton.

### 14.2 Reliability

- Jika API Python gagal load `.pkl`, UI tetap menampilkan pesan error.
- Jika file CSV/JSON tidak ditemukan, tampilkan empty state.
- Jika prediksi gagal, tampilkan error state yang jelas.
- Jangan crash satu halaman karena satu chart gagal.

### 14.3 Security

- Jangan expose raw pickle ke public folder.
- Simpan `model_bundle.pkl` di folder server-side `model/`.
- API Python hanya menerima input angka yang sudah divalidasi.
- Batasi payload size.
- Jangan gunakan `eval`.
- Jangan load `.pkl` dari sumber tidak tepercaya.
- Tambahkan `.vercelignore` untuk file tidak perlu.

### 14.4 Accessibility

- Semua tombol memiliki label jelas.
- Kontras warna harus cukup.
- Fokus keyboard terlihat.
- Chart harus memiliki teks ringkasan.
- Table harus memiliki header.
- Form input memiliki label.
- Tidak bergantung pada warna saja untuk status risiko.

### 14.5 Responsiveness

Breakpoint:

| Device | Layout |
|---|---|
| Mobile | 1 kolom, bottom nav atau drawer |
| Tablet | 2 kolom card, sidebar collapsible |
| Desktop | sidebar tetap, konten grid 3 atau 4 kolom |
| Large desktop | max width terkontrol |

### 14.6 Maintainability

- Komponen dipisah berdasarkan domain.
- API helper dipusatkan di `lib/api.ts`.
- TypeScript type dipusatkan di `types/`.
- Data parser dipusatkan di `lib/data/`.
- Jangan hardcode terlalu banyak di page component.

---

## 15. Page Information Architecture

```text
/
├── /dashboard
├── /dataset
├── /eda
├── /clustering
├── /prediksi-curah-hujan
├── /klasifikasi-risiko
├── /deep-learning
├── /evaluasi-model
├── /rekomendasi
└── /metodologi
```

---

## 16. Navigation

### Sidebar Menu

| Route | Label | Icon lucide-react |
|---|---|---|
| `/dashboard` | Dashboard | LayoutDashboard |
| `/dataset` | Dataset | Database |
| `/eda` | EDA | BarChart3 |
| `/clustering` | Clustering | Network |
| `/prediksi-curah-hujan` | Prediksi Curah Hujan | CloudRain |
| `/klasifikasi-risiko` | Klasifikasi Risiko | ShieldAlert |
| `/deep-learning` | Deep Learning | BrainCircuit |
| `/evaluasi-model` | Evaluasi Model | Activity |
| `/rekomendasi` | Rekomendasi | ClipboardCheck |
| `/metodologi` | Metodologi | FileText |

Catatan: gunakan icon dari `lucide-react`, bukan emoji.

---

## 17. Dashboard Metrics

Kartu metrik utama:

1. Total Dataset Mentah.
2. Status 100 MB.
3. Jumlah File Dataset.
4. Jumlah Provinsi.
5. Jumlah Kota.
6. Rata-rata Curah Hujan.
7. Rata-rata Suhu.
8. Rata-rata Kelembapan.
9. Best Regression R2.
10. Classification Accuracy.
11. Clustering Silhouette.
12. Deep Learning RMSE.

---

## 18. Data Contract untuk File JSON/CSV

### 18.1 `dataset_size_summary.json`

```ts
type DatasetSizeSummary = {
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
```

### 18.2 `dashboard_summary.json`

```ts
type DashboardSummary = {
  total_rows: number;
  total_provinsi: number;
  total_kota: number;
  tahun_awal: number;
  tahun_akhir: number;
  rata_rata_curah_hujan: number;
  rata_rata_suhu: number;
  rata_rata_kelembapan: number;
  curah_hujan_maksimum: number;
  suhu_maksimum: number;
  suhu_minimum: number;
};
```

### 18.3 `metrics.json`

```ts
type Metrics = {
  regression: {
    best_model: string;
    mae: number;
    mse: number;
    rmse: number;
    r2_score: number;
  };
  classification: {
    best_model: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  clustering: {
    model: string;
    n_clusters: number;
    silhouette_score: number;
  };
  deep_learning: {
    model: string;
    mae: number;
    mse: number;
    rmse: number;
    r2_score: number;
  };
};
```

---

## 19. Technical Requirements

### 19.1 Create Project

```bash
npx create-next-app@latest cuaca-indonesia-dashboard --typescript --eslint --app
cd cuaca-indonesia-dashboard
```

### 19.2 Install Dependencies

```bash
npm install recharts lucide-react framer-motion clsx tailwind-merge papaparse
npm install @tanstack/react-table
```

### 19.3 Tailwind CSS 4

Install Tailwind CSS 4 sesuai setup terbaru:

```bash
npm install tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`app/globals.css`:

```css
@import "tailwindcss";
```

### 19.4 Python Dependencies

`requirements.txt`:

```txt
fastapi==0.117.1
numpy
pandas
scikit-learn
joblib
pydantic
```

---

## 20. Folder Structure

```text
cuaca-indonesia-dashboard/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── dataset/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── eda/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── clustering/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── prediksi-curah-hujan/
│   │   └── page.tsx
│   │
│   ├── klasifikasi-risiko/
│   │   └── page.tsx
│   │
│   ├── deep-learning/
│   │   └── page.tsx
│   │
│   ├── evaluasi-model/
│   │   └── page.tsx
│   │
│   ├── rekomendasi/
│   │   └── page.tsx
│   │
│   ├── metodologi/
│   │   └── page.tsx
│   │
│   └── not-found.tsx
│
├── api/
│   └── index.py
│
├── model/
│   ├── model_bundle.pkl
│   ├── model_metadata.json
│   └── encoder_mapping.json
│
├── public/
│   └── data/
│       ├── dataset_size_report.csv
│       ├── dataset_size_summary.json
│       ├── dashboard_summary.json
│       ├── metrics.json
│       ├── model_metrics.csv
│       ├── cluster_summary.csv
│       ├── regression_metrics.csv
│       ├── classification_metrics.csv
│       ├── recommendation_summary.csv
│       ├── trend_curah_hujan_bulanan.csv
│       ├── top_kota_curah_hujan.csv
│       └── top_provinsi_curah_hujan.csv
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Topbar.tsx
│   │   └── PageHeader.tsx
│   │
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Tabs.tsx
│   │   ├── Table.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   └── Alert.tsx
│   │
│   ├── cards/
│   │   ├── StatCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── DatasetProofCard.tsx
│   │   └── RecommendationCard.tsx
│   │
│   ├── charts/
│   │   ├── AreaTrendChart.tsx
│   │   ├── BarRankChart.tsx
│   │   ├── LineTrendChart.tsx
│   │   ├── ClusterChart.tsx
│   │   ├── MetricComparisonChart.tsx
│   │   └── ChartContainer.tsx
│   │
│   ├── forms/
│   │   ├── RainfallPredictionForm.tsx
│   │   ├── RiskClassificationForm.tsx
│   │   └── ClusterPredictionForm.tsx
│   │
│   └── sections/
│       ├── WorkflowSection.tsx
│       ├── DatasetSection.tsx
│       ├── ModelSection.tsx
│       ├── MethodologySection.tsx
│       └── RecommendationSection.tsx
│
├── lib/
│   ├── api.ts
│   ├── cn.ts
│   ├── constants.ts
│   ├── csv.ts
│   ├── format.ts
│   ├── navigation.ts
│   ├── status.ts
│   └── data/
│       ├── get-dashboard-summary.ts
│       ├── get-dataset-summary.ts
│       ├── get-metrics.ts
│       ├── get-csv-data.ts
│       └── schemas.ts
│
├── types/
│   ├── api.ts
│   ├── dataset.ts
│   ├── metrics.ts
│   ├── weather.ts
│   └── prediction.ts
│
├── requirements.txt
├── vercel.json
├── next.config.ts
├── postcss.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── .vercelignore
├── PRD.md
└── DESIGN.md
```

---

## 21. API Implementation Contract

### 21.1 `api/index.py`

Python Function harus:

- Load `model/model_bundle.pkl`.
- Expose FastAPI app.
- Handle health check.
- Handle metadata.
- Handle metrics.
- Handle prediction regression.
- Handle risk classification.
- Handle cluster prediction.
- Validate input dengan Pydantic.
- Return JSON yang konsisten.

### 21.2 Required Endpoints

```text
GET  /
GET  /api/health
GET  /api/metadata
GET  /api/metrics
GET  /api/recommendation
POST /api/predict-rainfall
POST /api/predict-risk
POST /api/predict-cluster
```

---

## 22. Frontend State

Gunakan pendekatan sederhana:

- Server Components untuk halaman yang hanya membaca JSON/CSV statis.
- Client Components untuk form prediksi.
- `useState` untuk form.
- `fetch` untuk request ke API.
- `Suspense` dan loading skeleton untuk data chart.
- Tidak perlu Redux/Zustand kecuali scope bertambah.

---

## 23. Animation Requirements

Gunakan `framer-motion`.

Animasi wajib:

| Area | Animasi |
|---|---|
| Landing hero | fade in + slide up |
| Stat cards | staggered fade in |
| Sidebar active state | smooth highlight |
| Chart cards | fade in |
| Form result | scale/fade in |
| Recommendation card | slide up |
| Page transition | subtle opacity transition |
| Loading state | skeleton shimmer |

Animasi harus ringan, tidak berlebihan, dan tetap nyaman dibaca.

---

## 24. SEO Requirements

Metadata utama:

```ts
export const metadata = {
  title: "IndoWeather Intelligence | Big Data Analytics Cuaca Indonesia",
  description:
    "Dashboard Big Data Analytics untuk prediksi curah hujan, klasifikasi risiko cuaca, segmentasi wilayah iklim, dan rekomendasi mitigasi berbasis data cuaca historis Indonesia.",
};
```

Halaman yang perlu metadata:

- `/`
- `/dashboard`
- `/dataset`
- `/eda`
- `/prediksi-curah-hujan`
- `/klasifikasi-risiko`
- `/rekomendasi`

---

## 25. Deployment Requirements

### 25.1 Vercel

Aplikasi harus bisa deploy di Vercel.

Checklist:

```text
model/model_bundle.pkl ada
model/model_metadata.json ada
model/encoder_mapping.json ada
api/index.py ada
requirements.txt ada
public/data/*.json ada
public/data/*.csv ada
```

### 25.2 `vercel.json`

```json
{
  "functions": {
    "api/index.py": {
      "maxDuration": 60
    }
  }
}
```

### 25.3 `.vercelignore`

```text
.ipynb_checkpoints
notebook/
data_raw/
output/grafik/
*.ipynb
*.zip
__pycache__
*.pyc
```

Jangan ignore:

```text
model/
public/data/
api/
requirements.txt
```

---

## 26. Acceptance Criteria

Website dianggap selesai jika:

1. Bisa dibuka di local.
2. Bisa deploy ke Vercel.
3. Dashboard menampilkan ringkasan dataset.
4. Dataset page menunjukkan `130.73 MB` dan `is_minimum_100mb: true`.
5. EDA menampilkan chart utama.
6. Clustering menampilkan summary dan interpretasi.
7. Prediksi curah hujan berhasil memanggil API.
8. Klasifikasi risiko berhasil memanggil API.
9. Rekomendasi mitigasi tampil.
10. Semua halaman responsive.
11. Tidak ada emoji/emoticon.
12. Icon menggunakan `lucide-react`.
13. Error/loading/empty state tersedia.
14. `model_bundle.pkl` tidak disimpan di public folder.
15. Build tidak error.
16. Deploy Vercel tidak error.

---

## 27. Implementation Steps

### Step 1: Siapkan Output Notebook

Ekstrak:

```text
final_export_cuaca_indonesia.zip
```

Ambil:

```text
output/model/*
output/tabel/*
data_clean/*
```

### Step 2: Buat Project Next.js

```bash
npx create-next-app@latest cuaca-indonesia-dashboard --typescript --eslint --app
cd cuaca-indonesia-dashboard
```

### Step 3: Install Dependencies

```bash
npm install recharts lucide-react framer-motion clsx tailwind-merge papaparse @tanstack/react-table
npm install tailwindcss @tailwindcss/postcss
```

### Step 4: Copy File Model

```text
model/model_bundle.pkl
model/model_metadata.json
model/encoder_mapping.json
```

### Step 5: Copy File Data

```text
public/data/*.json
public/data/*.csv
```

### Step 6: Buat Python API

```text
api/index.py
requirements.txt
```

### Step 7: Buat Layout dan Halaman

Mulai dari:

```text
app/layout.tsx
components/layout/AppShell.tsx
app/dashboard/page.tsx
```

### Step 8: Buat Chart dan Card

```text
components/cards/*
components/charts/*
```

### Step 9: Buat Form Prediksi

```text
components/forms/RainfallPredictionForm.tsx
components/forms/RiskClassificationForm.tsx
```

### Step 10: Test Local

```bash
npm run dev
```

Untuk test API Python lokal:

```bash
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000
```

### Step 11: Build

```bash
npm run build
```

### Step 12: Deploy Vercel

```bash
vercel
```

atau deploy dari GitHub repository ke Vercel.

---

## 28. Risks and Mitigations

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Model `.pkl` terlalu besar | Deploy lambat/gagal | Pakai model scikit-learn yang ringan |
| Python dependency terlalu besar | Vercel build berat | Hanya install dependency wajib |
| CSV terlalu besar dibaca client | UI lambat | Pakai agregasi CSV/JSON |
| API cold start | Prediksi agak lambat | Tampilkan loading state |
| Chart terlalu banyak data | Browser lambat | Batasi top N dan agregasi |
| File path salah | API gagal load | Gunakan path absolut `Path(__file__)` |
| Vercel ignore salah | Model tidak ikut deploy | Review `.vercelignore` |

---

## 29. Success Metrics

- Website berhasil deploy ke Vercel.
- Dashboard terbuka dalam waktu wajar.
- API health check return `model_loaded: true`.
- Form prediksi return hasil.
- Dataset page menampilkan `130.73 MB`.
- Semua halaman dapat dipresentasikan dalam video tugas besar.
- Tidak ada error build.
- Tidak ada komponen kosong tanpa penjelasan.

---

## 30. Reference Links

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Tailwind CSS 4: https://tailwindcss.com/blog/tailwindcss-v4
- Tailwind with Next.js: https://tailwindcss.com/docs/guides/nextjs
- Vercel Python Runtime: https://vercel.com/docs/functions/runtimes/python
- FastAPI on Vercel: https://vercel.com/docs/frameworks/backend/fastapi
- Open-Meteo Historical Weather API: https://open-meteo.com/en/docs/historical-weather-api
- BMKG Data Terbuka: https://data.bmkg.go.id/
