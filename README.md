# TA_MK_BigData_IndoWeatherIntelligence

IndoWeather Intelligence adalah dashboard Big Data Analytics untuk data cuaca historis Indonesia. Project ini dibuat untuk tugas besar mata kuliah Big Data dengan studi kasus:

**Penerapan Big Data Analytics pada Data Cuaca Historis Indonesia untuk Prediksi Curah Hujan, Klasifikasi Risiko Cuaca, Segmentasi Wilayah Iklim, dan Rekomendasi Mitigasi.**

Aplikasi ini menampilkan hasil pipeline notebook dalam bentuk website Next.js: validasi dataset, EDA, clustering wilayah iklim, prediksi curah hujan, klasifikasi risiko, evaluasi model, dan rekomendasi mitigasi.

## Ringkasan Project

Data utama berasal dari **Open-Meteo Historical Weather API** dan sumber pendukung dari **BMKG Data Terbuka**.

Validasi dataset:

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

Artinya dataset mentah sudah memenuhi syarat tugas besar minimal 100 MB.

## Fitur Utama

- Landing page project dan ringkasan analitik.
- Dashboard utama dataset, tren cuaca, dan metrik model.
- Halaman validasi dataset 100 MB.
- EDA curah hujan, suhu, kelembapan, top provinsi, dan top kota.
- Clustering wilayah iklim menggunakan K-Means.
- Form prediksi curah hujan dari model regresi.
- Form klasifikasi risiko cuaca: Aman, Waspada, Tinggi.
- Halaman deep learning sederhana menggunakan MLPRegressor.
- Halaman evaluasi model regresi, klasifikasi, clustering, dan deep learning.
- Halaman rekomendasi mitigasi dengan filter wilayah dan cluster.
- Dokumentasi metodologi dari pengumpulan data sampai deploy.
- API Python FastAPI untuk health check, metadata, metrics, dan prediksi model.

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | Next.js App Router |
| Bahasa | TypeScript |
| Styling | Tailwind CSS 4 |
| Chart | Recharts |
| Icon | lucide-react |
| Animasi | Framer Motion |
| CSV Parser | PapaParse |
| Backend ringan | Vercel Python Function |
| API Python | FastAPI |
| Model | scikit-learn, joblib |
| Deployment | Vercel |

## Alur Sistem

```text
Google Colab / Jupyter Notebook
        |
        | download raw data Open-Meteo
        v
Validasi dataset minimal 100 MB
        |
        | cleaning, EDA, feature engineering
        v
Machine Learning Pipeline
        |
        +-- Regresi curah hujan
        +-- Klasifikasi risiko cuaca
        +-- Clustering wilayah iklim
        +-- Deep learning sederhana
        |
        | export CSV, JSON, PNG, PKL
        v
Next.js Dashboard
        |
        +-- public/data untuk CSV/JSON/PNG
        +-- model untuk model_bundle.pkl
        +-- api/index.py untuk FastAPI
        |
        v
Vercel Hosting
```

## Alur Analisis Notebook

1. **Pengumpulan Data**
   - Data cuaca historis hourly diambil dari Open-Meteo Historical Weather API.
   - Lokasi mencakup provinsi dan kota representatif di Indonesia.
   - Sumber pendukung: BMKG Data Terbuka.

2. **Validasi Dataset**
   - Dataset mentah dihitung ukurannya dari folder raw.
   - Total dataset mentah: 130.73 MB.
   - Jumlah file: 84.
   - Status: memenuhi syarat minimal 100 MB.

3. **EDA**
   - Analisis rata-rata curah hujan, suhu, kelembapan, tekanan, awan, dan angin.
   - Visualisasi tren bulanan.
   - Ranking provinsi dan kota dengan curah hujan tertinggi.

4. **Preprocessing**
   - Data hourly dibersihkan dan disatukan.
   - Missing value ditangani.
   - Kategori lokasi di-encode.

5. **Feature Engineering**
   - Fitur waktu: tahun, bulan, hari, jam, dayofweek, weekend.
   - Fitur cuaca: suhu, kelembapan, dew point, tekanan, awan, angin, radiasi, soil moisture.
   - Fitur temporal: precipitation lag dan rolling precipitation.

6. **Clustering**
   - Algoritma: K-Means.
   - Jumlah cluster: 4.
   - Output: segmentasi wilayah iklim dan rekomendasi per cluster.

7. **Regresi**
   - Target: precipitation.
   - Model terbaik: RandomForestRegressor.
   - Metrik utama: MAE, MSE, RMSE, R2.

8. **Klasifikasi**
   - Target: risk_category.
   - Kelas: Aman, Waspada, Tinggi.
   - Model terbaik: RandomForestClassifier.
   - Metrik utama: accuracy, precision, recall, F1 score.

9. **Deep Learning**
   - Model: MLPRegressor.
   - Digunakan sebagai pembanding model regresi klasik.

10. **Export**
    - Model diexport ke `model_bundle.pkl`.
    - Metadata model diexport ke JSON.
    - Tabel hasil analisis diexport ke CSV/JSON.
    - Grafik hasil notebook diexport ke PNG.

## Struktur Folder

```text
.
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   ├── dataset/
│   ├── eda/
│   ├── clustering/
│   ├── prediksi-curah-hujan/
│   ├── klasifikasi-risiko/
│   ├── deep-learning/
│   ├── evaluasi-model/
│   ├── rekomendasi/
│   └── metodologi/
├── api/
│   └── index.py
├── components/
│   ├── cards/
│   ├── charts/
│   ├── forms/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── lib/
│   ├── data/
│   ├── api.ts
│   ├── constants.ts
│   ├── format.ts
│   └── navigation.ts
├── model/
│   ├── api_contract.json
│   ├── encoder_mapping.json
│   ├── model_bundle.pkl
│   └── model_metadata.json
├── public/
│   ├── icon.svg
│   └── data/
├── types/
├── PRD.md
├── DESIGN.md
├── requirements.txt
├── vercel.json
└── README.md
```

## Data yang Dipakai Website

File CSV/JSON/PNG hasil notebook disimpan di:

```text
public/data/
```

Contoh file penting:

```text
dashboard_summary.json
dataset_size_summary.json
metrics.json
dataset_size_report.csv
model_metrics.csv
cluster_summary.csv
regression_metrics.csv
classification_metrics.csv
recommendation_summary.csv
trend_curah_hujan_bulanan.csv
top_kota_curah_hujan.csv
top_provinsi_curah_hujan.csv
grafik/tren_curah_hujan_bulanan.png
grafik/top_provinsi_curah_hujan.png
```

Model server-side disimpan di:

```text
model/model_bundle.pkl
model/model_metadata.json
model/encoder_mapping.json
model/api_contract.json
```

Catatan: `model/model_bundle.pkl` berukuran sekitar 126 MB, sehingga file ini dilacak menggunakan Git LFS.

## Halaman Website

| Route | Fungsi |
|---|---|
| `/` | Landing page project |
| `/dashboard` | Ringkasan dataset, tren, metrik model, rekomendasi |
| `/dataset` | Validasi dataset 100 MB dan sumber data |
| `/eda` | Exploratory Data Analysis |
| `/clustering` | Segmentasi wilayah iklim |
| `/prediksi-curah-hujan` | Form prediksi curah hujan |
| `/klasifikasi-risiko` | Form klasifikasi risiko cuaca |
| `/deep-learning` | Penjelasan dan metrik MLPRegressor |
| `/evaluasi-model` | Evaluasi semua model |
| `/rekomendasi` | Rekomendasi mitigasi |
| `/metodologi` | Dokumentasi metode |

## API Endpoint

FastAPI berada di:

```text
api/index.py
```

Endpoint:

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Root API |
| GET | `/api/health` | Status API dan status model |
| GET | `/api/metadata` | Metadata project |
| GET | `/api/metrics` | Metrik model |
| GET | `/api/recommendation` | Rekomendasi mitigasi |
| POST | `/api/predict-rainfall` | Prediksi curah hujan |
| POST | `/api/predict-risk` | Klasifikasi risiko cuaca |
| POST | `/api/predict-cluster` | Prediksi cluster wilayah |

Contoh request prediksi curah hujan:

```json
{
  "tahun": 2026,
  "bulan": 5,
  "hari": 19,
  "jam": 14,
  "dayofweek": 1,
  "is_weekend": 0,
  "provinsi_encoded": 0,
  "kota_encoded": 0,
  "temperature_2m": 28.5,
  "relative_humidity_2m": 80,
  "dew_point_2m": 24,
  "apparent_temperature": 31,
  "surface_pressure": 1009,
  "cloud_cover": 65,
  "wind_speed_10m": 8,
  "wind_speed_100m": 12,
  "soil_temperature_0_to_7cm": 29,
  "soil_moisture_0_to_7cm": 0.25,
  "shortwave_radiation": 300,
  "direct_radiation": 150,
  "diffuse_radiation": 80,
  "et0_fao_evapotranspiration": 0.2,
  "precipitation_lag_1": 0,
  "precipitation_lag_24": 0,
  "precipitation_rolling_24h": 0.5,
  "temperature_rolling_24h": 28
}
```

Contoh response:

```json
{
  "status": "success",
  "prediction": 0.061,
  "unit": "mm",
  "category": "Aman",
  "interpretation": "Curah hujan rendah dan kondisi relatif stabil.",
  "recommendation": "Kondisi cuaca relatif aman. Monitoring rutin tetap dilakukan.",
  "model_used": "RandomForestRegressor",
  "fallback": false
}
```

## Cara Menjalankan Lokal

Masuk ke folder project:

```powershell
cd "C:\Users\rifqy\Documents\KULIAH\BELAJAR\NEXT JS\cuaca-indonesia-dashboard"
```

Install dependency:

```powershell
npm install
```

Jalankan development server:

```powershell
npm run dev
```

Buka:

```text
http://localhost:3000
```

Build production:

```powershell
npm run build
```

Jalankan production lokal:

```powershell
npm run start
```

## Menjalankan API Python Lokal

Install dependency Python:

```powershell
pip install -r requirements.txt
```

Jalankan FastAPI:

```powershell
uvicorn api.index:app --reload --port 8000
```

Cek health:

```text
http://localhost:8000/api/health
```

Jika `model_loaded` bernilai `true`, model berhasil dibaca dari `model/model_bundle.pkl`.

## Deploy ke Vercel

Project ini disiapkan untuk Vercel.

Checklist deploy:

```text
api/index.py tersedia
requirements.txt tersedia
vercel.json tersedia
public/data tersedia
model/model_bundle.pkl tersedia
model/model_metadata.json tersedia
model/encoder_mapping.json tersedia
```

File `vercel.json`:

```json
{
  "functions": {
    "api/index.py": {
      "maxDuration": 60
    }
  }
}
```

Catatan penting:

- `model_bundle.pkl` dilacak dengan Git LFS karena lebih dari 100 MB.
- Pastikan Git LFS aktif sebelum clone/deploy.
- Jika model tidak terbaca di runtime, API tetap punya fallback rule-based agar demo UI tidak crash, tetapi prediksi utama sebaiknya tetap memakai model asli.

## Git LFS

Aktifkan Git LFS:

```powershell
git lfs install
git lfs track "model/model_bundle.pkl"
```

File `.gitattributes` akan menyimpan aturan LFS.

## Verifikasi yang Sudah Dilakukan

Command yang sudah lolos:

```powershell
npm run lint
npm run build
```

Route utama juga sudah dicek dan merespons `200`:

```text
/
/dashboard
/dataset
/eda
/clustering
/prediksi-curah-hujan
/klasifikasi-risiko
/deep-learning
/evaluasi-model
/rekomendasi
/metodologi
```

API Python sudah dites menggunakan FastAPI TestClient:

```text
GET /api/health
POST /api/predict-rainfall
```

## Troubleshooting

### Hydration error saat development

Stop server lalu jalankan ulang:

```powershell
npm run dev
```

Jika browser masih menampilkan cache lama, gunakan hard refresh:

```text
Ctrl + F5
```

### `npm install` gagal karena cache permission

Gunakan cache sementara:

```powershell
$env:npm_config_cache="C:\tmp\npm-cache"
npm install
```

### Model Python gagal load

Pastikan versi scikit-learn sesuai:

```text
scikit-learn==1.6.1
```

Lalu install ulang:

```powershell
pip install -r requirements.txt
```

### File model tidak ikut clone

Pastikan Git LFS sudah aktif:

```powershell
git lfs install
git lfs pull
```

## Sumber Data

- Open-Meteo Historical Weather API: https://open-meteo.com/en/docs/historical-weather-api
- BMKG Data Terbuka: https://data.bmkg.go.id/

## Status

Project siap untuk:

- demo tugas besar,
- presentasi video,
- build lokal,
- push ke GitHub,
- deploy ke Vercel dengan perhatian pada Git LFS untuk file model besar.
