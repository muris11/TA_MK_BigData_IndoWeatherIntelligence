# DESIGN.md

# Design System and UI Specification
# IndoWeather Intelligence
# Next.js Dashboard Cuaca Historis Indonesia

## 1. Design Goal

Website harus terlihat seperti **dashboard analitik modern**, bersih, akademik, dan profesional. Desain harus cocok untuk presentasi tugas besar, video demo, dan deployment publik di Vercel.

Karakter visual:

- Modern.
- Rapi.
- Responsif.
- Ringan.
- Informatif.
- Tidak ramai.
- Tidak memakai emoji/emoticon.
- Menggunakan icon dari `lucide-react`.
- Menggunakan animasi halus dengan `framer-motion`.
- Fokus pada data, model, dan rekomendasi.

---

## 2. Product Identity

### 2.1 Nama Produk

**IndoWeather Intelligence**

### 2.2 Tagline

**Big Data Analytics untuk Prediksi Curah Hujan, Klasifikasi Risiko Cuaca, Segmentasi Wilayah Iklim, dan Rekomendasi Mitigasi.**

### 2.3 Visual Personality

| Aspek | Arahan |
|---|---|
| Tone | Akademik, modern, profesional |
| Visual | Clean dashboard, data-driven |
| Warna | Biru, cyan, slate, emerald |
| Layout | Grid rapi dan responsive |
| Animasi | Subtle, smooth, tidak berlebihan |
| Icon | Line icon dari lucide-react |
| Typography | Sans-serif modern |

---

## 3. Design Principles

### 3.1 Clarity First

Setiap halaman harus langsung menjawab:

- Data apa yang ditampilkan?
- Metode apa yang dipakai?
- Hasilnya apa?
- Artinya apa?
- Rekomendasinya apa?

### 3.2 Data Before Decoration

Dekorasi visual tidak boleh mengalahkan data. Chart, metrik, dan insight harus menjadi fokus.

### 3.3 Responsive by Default

Semua komponen harus nyaman di:

- Mobile.
- Tablet.
- Laptop.
- Desktop besar.

### 3.4 Academic Trust

Tampilkan bukti:

- Ukuran dataset.
- Sumber dataset.
- Metrik model.
- Link sumber.
- Validasi dataset 100 MB.
- File output notebook.

### 3.5 No Emoji

Tidak memakai emoji atau emoticon. Semua simbol visual menggunakan:

```text
lucide-react icons
CSS icon styling
status badge
chart marker
```

---

## 4. Color System

### 4.1 Primary Palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary-50` | `#ecfeff` | background soft |
| `--color-primary-100` | `#cffafe` | hover soft |
| `--color-primary-200` | `#a5f3fc` | border light |
| `--color-primary-300` | `#67e8f9` | accent light |
| `--color-primary-400` | `#22d3ee` | chart accent |
| `--color-primary-500` | `#06b6d4` | main cyan |
| `--color-primary-600` | `#0891b2` | button |
| `--color-primary-700` | `#0e7490` | button hover |
| `--color-primary-800` | `#155e75` | headings accent |
| `--color-primary-900` | `#164e63` | dark accent |

### 4.2 Neutral Palette

| Token | Value | Usage |
|---|---|---|
| `--color-slate-50` | `#f8fafc` | page background |
| `--color-slate-100` | `#f1f5f9` | card soft |
| `--color-slate-200` | `#e2e8f0` | border |
| `--color-slate-300` | `#cbd5e1` | divider |
| `--color-slate-400` | `#94a3b8` | muted text |
| `--color-slate-500` | `#64748b` | body muted |
| `--color-slate-600` | `#475569` | body text |
| `--color-slate-700` | `#334155` | strong text |
| `--color-slate-800` | `#1e293b` | heading |
| `--color-slate-900` | `#0f172a` | title |
| `--color-slate-950` | `#020617` | dark title |

### 4.3 Status Colors

| Status | Color | Usage |
|---|---|---|
| Aman | Emerald | risiko rendah |
| Waspada | Amber | risiko sedang |
| Tinggi | Red | risiko tinggi |
| Informasi | Cyan | informasi umum |
| Netral | Slate | status default |

### 4.4 CSS Theme Example

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --border: #e2e8f0;
  --primary: #0891b2;
  --primary-soft: #ecfeff;
  --success: #059669;
  --warning: #d97706;
  --danger: #dc2626;
}
```

---

## 5. Typography

### 5.1 Font

Gunakan font bawaan Next.js:

```ts
import { Geist, Geist_Mono } from "next/font/google";
```

| Font | Usage |
|---|---|
| Geist Sans | UI utama |
| Geist Mono | angka, kode, API endpoint |

### 5.2 Type Scale

| Token | Size | Usage |
|---|---:|---|
| Display | 48-64px | hero title |
| H1 | 36-44px | page title |
| H2 | 28-32px | section title |
| H3 | 22-24px | card group title |
| Body | 16px | paragraph |
| Small | 14px | helper text |
| Caption | 12px | label |

### 5.3 Typography Rules

- Heading harus singkat.
- Body text maksimal 75 karakter per baris.
- Angka penting menggunakan font weight 700.
- Label chart menggunakan font 12-14px.
- Jangan gunakan teks terlalu kecil di mobile.

---

## 6. Layout System

### 6.1 App Shell

Desktop layout:

```text
┌─────────────────────────────────────────────────────┐
│ Sidebar │ Topbar                                    │
│         ├───────────────────────────────────────────┤
│         │ Page Header                               │
│         │ Metrics Grid                              │
│         │ Main Content Grid                         │
│         │ Tables and Recommendations                │
└─────────────────────────────────────────────────────┘
```

Mobile layout:

```text
┌──────────────────────────────┐
│ Topbar + Menu Button         │
├──────────────────────────────┤
│ Page Header                  │
│ Card                         │
│ Card                         │
│ Chart                        │
│ Table                        │
└──────────────────────────────┘
```

### 6.2 Container

```tsx
<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
  {children}
</div>
```

### 6.3 Grid Rules

| Section | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Stat card | 4 columns | 2 columns | 1 column |
| Chart area | 2 columns | 1-2 columns | 1 column |
| Forms | 2 columns | 2 columns | 1 column |
| Tables | Full width | Full width | Horizontal scroll |
| Recommendation | 3 columns | 2 columns | 1 column |

---

## 7. Spacing System

Use Tailwind spacing:

| Token | Tailwind | Usage |
|---|---|---|
| XS | `gap-2` | compact item |
| SM | `gap-3` | label/input |
| MD | `gap-4` | cards |
| LG | `gap-6` | sections |
| XL | `gap-8` | page blocks |
| 2XL | `gap-12` | landing sections |

Card padding:

```text
p-4 mobile
p-5 tablet
p-6 desktop
```

---

## 8. Border Radius and Shadow

| Component | Radius | Shadow |
|---|---|---|
| Button | `rounded-xl` | none or subtle |
| Card | `rounded-2xl` | `shadow-sm` |
| Dialog | `rounded-3xl` | `shadow-xl` |
| Badge | `rounded-full` | none |
| Input | `rounded-xl` | focus ring |

Card style:

```tsx
className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
```

---

## 9. Icon System

Use `lucide-react`.

### 9.1 Icon Map

| Feature | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Dataset | `Database` |
| EDA | `BarChart3` |
| Clustering | `Network` |
| Prediction | `CloudRain` |
| Risk | `ShieldAlert` |
| Deep Learning | `BrainCircuit` |
| Evaluation | `Activity` |
| Recommendation | `ClipboardCheck` |
| Methodology | `FileText` |
| Size proof | `HardDrive` |
| Source link | `ExternalLink` |
| Success | `CheckCircle2` |
| Warning | `TriangleAlert` |
| Error | `CircleX` |
| Loading | `Loader2` |
| Download | `Download` |

### 9.2 Icon Rules

- Icon size sidebar: `h-5 w-5`.
- Icon size card: `h-6 w-6`.
- Icon size hero: `h-10 w-10`.
- Do not use emoji.
- Icons must have consistent stroke width.
- Pair icons with labels, not icon-only unless tooltip exists.

---

## 10. Component Design

## 10.1 Button

Variants:

```ts
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
```

Primary:

```tsx
<button className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
  <CloudRain className="h-4 w-4" />
  Prediksi
</button>
```

## 10.2 Card

```tsx
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-slate-500">Total Dataset</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-950">130.73 MB</h3>
    </div>
    <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
      <HardDrive className="h-5 w-5" />
    </div>
  </div>
</div>
```

## 10.3 StatCard Props

```ts
type StatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  status?: "default" | "success" | "warning" | "danger";
};
```

## 10.4 MetricCard Props

```ts
type MetricCardProps = {
  modelName: string;
  metricName: string;
  value: number | string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};
```

## 10.5 Badge

Status badge:

```tsx
<span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
  <CheckCircle2 className="h-3.5 w-3.5" />
  Aman
</span>
```

---

## 11. Page Designs

# 11.1 Landing Page

## Purpose

Mengenalkan project secara ringkas dan meyakinkan.

## Sections

1. Hero.
2. Dataset proof.
3. Workflow analytics.
4. Feature preview.
5. Model capabilities.
6. Source data.
7. CTA.

## Hero Layout

Desktop:

```text
Left:
- Eyebrow: Big Data Analytics
- Title
- Description
- CTA buttons
- Dataset proof mini cards

Right:
- Visual card with animated weather metrics
```

Hero title:

```text
Dashboard Big Data Analytics Cuaca Historis Indonesia
```

Hero description:

```text
Analisis data cuaca historis Indonesia untuk prediksi curah hujan, klasifikasi risiko cuaca, segmentasi wilayah iklim, dan rekomendasi mitigasi berbasis machine learning.
```

CTA:

- Buka Dashboard
- Lihat Dataset

## Animation

- Hero title: fade in up.
- Metric cards: stagger.
- Visual weather card: subtle float.
- CTA: hover scale 1.02.

---

# 11.2 Dashboard Page

## Purpose

Memberikan ringkasan seluruh project dalam satu layar.

## Layout

1. Page header.
2. Dataset proof cards.
3. Model metric cards.
4. Main chart: tren curah hujan bulanan.
5. Side chart: top provinsi.
6. Recommendation preview.

## Required Cards

- Dataset: 130.73 MB.
- Status: memenuhi syarat.
- Jumlah file: 84.
- Dataset source: Open-Meteo.
- Regression RMSE.
- Classification Accuracy.
- Clustering Silhouette.
- Deep Learning R2.

## Chart

- Area chart untuk tren curah hujan.
- Bar chart untuk top provinsi.
- Bar chart untuk top kota.
- Metric comparison chart.

---

# 11.3 Dataset Page

## Purpose

Membuktikan dataset sesuai ketentuan tugas besar.

## Content

- Dataset size summary.
- Dataset source.
- Supporting source.
- License.
- Data raw file report.
- Variable explanation.
- Notebook download process.
- Validation conclusion.

## Dataset Proof Card

Harus menampilkan:

```text
Total Dataset Mentah: 130.73 MB
Minimal Wajib: 100 MB
Status: Memenuhi Syarat
Jumlah File: 84
```

## Table

Tampilkan `dataset_size_report.csv` dengan pagination.

Columns:

- nama_file
- ekstensi
- ukuran_mb

---

# 11.4 EDA Page

## Purpose

Menampilkan eksplorasi data cuaca.

## Content

- Rata-rata suhu.
- Rata-rata curah hujan.
- Rata-rata kelembapan.
- Curah hujan maksimum.
- Suhu maksimum.
- Suhu minimum.
- Tren bulanan.
- Top provinsi.
- Top kota.
- Insight EDA.

## Charts

1. Line chart: tren curah hujan bulanan.
2. Line chart: tren suhu bulanan.
3. Bar chart: top provinsi curah hujan.
4. Bar chart: top kota curah hujan.
5. Correlation heatmap sederhana jika tersedia.

---

# 11.5 Clustering Page

## Purpose

Menjelaskan segmentasi wilayah iklim.

## Content

- Algoritma K-Means.
- Features used.
- Cluster summary.
- Silhouette score.
- Interpretasi cluster.
- Rekomendasi cluster.

## Cluster Cards

| Cluster | Label |
|---|---|
| 0 | Kering Stabil |
| 1 | Lembap Sedang |
| 2 | Basah Tinggi |
| 3 | Ekstrem Fluktuatif |

## Visual

- Bar chart jumlah wilayah per cluster.
- Scatter chart jika PCA tersedia.
- Table cluster summary.

---

# 11.6 Prediksi Curah Hujan Page

## Purpose

Memungkinkan user mencoba model regresi.

## Form Fields

- Tahun.
- Bulan.
- Jam.
- Provinsi.
- Kota.
- Temperature 2m.
- Relative Humidity 2m.
- Dew Point 2m.
- Surface Pressure.
- Cloud Cover.
- Wind Speed 10m.
- Shortwave Radiation.
- Soil Moisture.
- Precipitation Lag 1.
- Precipitation Rolling 24h.

## Result Card

Tampilkan:

- Prediksi curah hujan dalam mm.
- Kategori risiko.
- Interpretasi.
- Rekomendasi mitigasi.
- Model used.
- Timestamp.

## Loading

Button berubah menjadi:

```text
Memproses Prediksi
```

Icon:

```tsx
<Loader2 className="h-4 w-4 animate-spin" />
```

---

# 11.7 Klasifikasi Risiko Page

## Purpose

Memungkinkan user mencoba model klasifikasi risiko.

## Output

- Risk category.
- Confidence.
- Recommendation.
- Risk explanation.

## Visual Status

| Risk | Color |
|---|---|
| Aman | Emerald |
| Waspada | Amber |
| Tinggi | Red |

---

# 11.8 Deep Learning Page

## Purpose

Menjelaskan model neural network sederhana.

## Content

- Model: MLPRegressor.
- Input features.
- Target.
- Evaluation metrics.
- Comparison with regression model.
- Keterbatasan.

## Visual

- Card architecture:
  - Input layer.
  - Hidden layer.
  - Output layer.
- Metric comparison chart.

---

# 11.9 Evaluasi Model Page

## Purpose

Menampilkan performa semua model.

## Sections

1. Regression evaluation.
2. Classification evaluation.
3. Clustering evaluation.
4. Deep learning evaluation.
5. Best model summary.
6. Model limitations.

## Tables

- `regression_metrics.csv`
- `classification_metrics.csv`
- `model_metrics.csv`
- `cluster_summary.csv`

---

# 11.10 Rekomendasi Page

## Purpose

Menampilkan rekomendasi mitigasi berbasis hasil analisis.

## Sections

1. Ringkasan risiko.
2. Rekomendasi berdasarkan cluster.
3. Rekomendasi berdasarkan wilayah curah hujan tertinggi.
4. Rekomendasi berdasarkan hasil prediksi.
5. Tabel recommendation summary.

## Recommendation Cards

Type:

```ts
type RecommendationCard = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  icon: React.ComponentType;
};
```

---

# 11.11 Metodologi Page

## Purpose

Menjelaskan alur kerja tugas besar.

## Timeline

1. Pengumpulan data.
2. Validasi 100 MB.
3. EDA.
4. Preprocessing.
5. Feature engineering.
6. Clustering.
7. Regresi.
8. Klasifikasi.
9. Deep learning.
10. Evaluasi.
11. Export model.
12. Web deployment.

## Timeline Design

Desktop:

```text
Vertical timeline with cards
```

Mobile:

```text
Stacked cards
```

---

## 12. Motion Design

### 12.1 Framer Motion Variants

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};
```

### 12.2 Usage Example

```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.35, ease: "easeOut" }}
>
  <StatCard />
</motion.div>
```

### 12.3 Animation Rules

- Duration: 0.2s to 0.5s.
- Easing: `easeOut`.
- Avoid infinite animation except loading spinner.
- Respect reduced motion.

```tsx
const shouldReduceMotion = useReducedMotion();
```

---

## 13. Chart Design

Use `recharts`.

### 13.1 Chart Container

```tsx
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="mb-4 flex items-start justify-between gap-4">
    <div>
      <h3 className="text-base font-semibold text-slate-950">Tren Curah Hujan</h3>
      <p className="mt-1 text-sm text-slate-500">Rata-rata curah hujan bulanan.</p>
    </div>
  </div>
  <div className="h-80">
    {children}
  </div>
</div>
```

### 13.2 Chart Colors

| Chart Item | Color |
|---|---|
| Curah hujan | Cyan |
| Suhu | Orange |
| Kelembapan | Emerald |
| Risiko tinggi | Red |
| Risiko sedang | Amber |
| Risiko rendah | Emerald |
| Cluster | Cyan, Emerald, Amber, Red |

### 13.3 Chart Rules

- Chart harus punya title dan description.
- Jangan tampilkan terlalu banyak label.
- Tooltip wajib ada.
- Axis label dibuat ringkas.
- Gunakan aggregation untuk data besar.
- Mobile chart bisa horizontal scroll atau tinggi lebih besar.

---

## 14. Table Design

Table digunakan untuk:

- dataset size report.
- model metrics.
- cluster summary.
- recommendation summary.

Style:

```tsx
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        ...
      </thead>
      <tbody className="divide-y divide-slate-100">
        ...
      </tbody>
    </table>
  </div>
</div>
```

Rules:

- Sticky header jika tabel panjang.
- Pagination untuk >50 rows.
- Search/filter jika data banyak.
- Empty state jika tidak ada data.
- Horizontal scroll di mobile.

---

## 15. Form Design

### 15.1 Input Field

```tsx
<label className="space-y-2">
  <span className="text-sm font-medium text-slate-700">Suhu Udara</span>
  <input
    type="number"
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
  />
</label>
```

### 15.2 Select Field

```tsx
<select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100">
  <option>DKI Jakarta</option>
</select>
```

### 15.3 Form Layout

Desktop:

```text
2 columns
```

Mobile:

```text
1 column
```

### 15.4 Validation

- Required fields.
- Numeric fields must be valid.
- Prevent negative values if not allowed.
- Show helper text.
- Show error text below input.

---

## 16. Loading, Error, Empty States

### 16.1 Loading State

Use skeleton:

```tsx
<div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
  <div className="h-4 w-32 rounded bg-slate-200" />
  <div className="mt-4 h-8 w-48 rounded bg-slate-200" />
</div>
```

### 16.2 Error State

```tsx
<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
  <div className="flex items-start gap-3">
    <CircleX className="h-5 w-5" />
    <div>
      <h3 className="font-semibold">Data gagal dimuat</h3>
      <p className="mt-1 text-sm">Periksa file output atau endpoint API.</p>
    </div>
  </div>
</div>
```

### 16.3 Empty State

```tsx
<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
  <Database className="mx-auto h-8 w-8 text-slate-400" />
  <h3 className="mt-4 font-semibold text-slate-900">Data belum tersedia</h3>
  <p className="mt-2 text-sm text-slate-500">Pastikan file CSV/JSON sudah dipindahkan ke public/data.</p>
</div>
```

---

## 17. Responsive Behavior

### 17.1 Mobile

- Sidebar menjadi drawer.
- Topbar sticky.
- Card satu kolom.
- Chart full width.
- Table horizontal scroll.
- CTA full width.
- Form input satu kolom.

### 17.2 Tablet

- Sidebar collapsible.
- Card dua kolom.
- Chart bisa satu atau dua kolom.
- Form dua kolom jika layar cukup.

### 17.3 Desktop

- Sidebar tetap.
- Content max width 7xl.
- Card 3-4 kolom.
- Dashboard chart 2 kolom.
- Tables full width.

---

## 18. Accessibility

Checklist:

- Semua input punya label.
- Button punya text.
- Icon dekoratif pakai `aria-hidden`.
- Icon informatif disertai text.
- Fokus keyboard jelas.
- Contrast cukup.
- Status tidak hanya warna, juga teks.
- Chart punya summary text.
- Table punya header.
- Motion menghormati reduced motion.

---

## 19. File Placement from Notebook Export

Setelah menjalankan notebook, pindahkan file sebagai berikut.

### From Notebook Export

```text
final_export_cuaca_indonesia.zip
```

### To Next.js Project

```text
output/model/model_bundle.pkl            -> model/model_bundle.pkl
output/model/model_metadata.json         -> model/model_metadata.json
output/model/encoder_mapping.json        -> model/encoder_mapping.json

output/tabel/dataset_size_report.csv     -> public/data/dataset_size_report.csv
output/tabel/dataset_size_summary.json   -> public/data/dataset_size_summary.json
output/tabel/dashboard_summary.json      -> public/data/dashboard_summary.json
output/tabel/metrics.json                -> public/data/metrics.json
output/tabel/model_metrics.csv           -> public/data/model_metrics.csv
output/tabel/cluster_summary.csv         -> public/data/cluster_summary.csv
output/tabel/regression_metrics.csv      -> public/data/regression_metrics.csv
output/tabel/classification_metrics.csv  -> public/data/classification_metrics.csv
output/tabel/recommendation_summary.csv  -> public/data/recommendation_summary.csv
output/tabel/trend_curah_hujan_bulanan.csv -> public/data/trend_curah_hujan_bulanan.csv
output/tabel/top_kota_curah_hujan.csv    -> public/data/top_kota_curah_hujan.csv
output/tabel/top_provinsi_curah_hujan.csv -> public/data/top_provinsi_curah_hujan.csv

data_clean/weather_clean.csv             -> public/data/weather_clean_sample.csv
```

Catatan:

- Jangan taruh `model_bundle.pkl` di `public/`.
- Simpan model di folder server-side `model/`.

---

## 20. Vercel Deployment Design

### 20.1 Deployment Model

```text
Browser
  |
  | request UI
  v
Next.js on Vercel
  |
  | fetch static CSV/JSON
  v
public/data
  |
  | prediction request
  v
Vercel Python Function
  |
  | load model_bundle.pkl
  v
model prediction
```

### 20.2 Environment Variables

`.env.example`:

```env
NEXT_PUBLIC_APP_NAME=IndoWeather Intelligence
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Tidak perlu API key untuk Open-Meteo di web karena data sudah diproses lewat notebook.

---

## 21. Component Implementation Priority

### Phase 1: Foundation

1. App shell.
2. Sidebar.
3. Topbar.
4. PageHeader.
5. Card.
6. Button.
7. Badge.
8. Skeleton.
9. Data loader.

### Phase 2: Dashboard

1. Stat cards.
2. Dataset proof card.
3. Trend chart.
4. Top province chart.
5. Metrics cards.

### Phase 3: Model Pages

1. Prediction form.
2. Risk classification form.
3. Cluster summary.
4. Model evaluation tables.

### Phase 4: Polish

1. Framer Motion animation.
2. Responsive sidebar.
3. Loading state.
4. Error state.
5. SEO metadata.
6. Vercel deployment fixes.

---

## 22. Suggested Landing Copy

Hero title:

```text
IndoWeather Intelligence
```

Hero subtitle:

```text
Dashboard Big Data Analytics Cuaca Historis Indonesia untuk prediksi curah hujan, klasifikasi risiko cuaca, segmentasi wilayah iklim, dan rekomendasi mitigasi.
```

Dataset proof:

```text
Dataset mentah sebesar 130.73 MB dari 84 file berhasil divalidasi dan memenuhi syarat tugas besar minimal 100 MB.
```

CTA:

```text
Buka Dashboard
Lihat Validasi Dataset
```

---

## 23. Recommended Page Header Pattern

```tsx
<PageHeader
  eyebrow="Big Data Analytics"
  title="Dashboard Cuaca Historis Indonesia"
  description="Ringkasan dataset, model machine learning, dan rekomendasi mitigasi berbasis data cuaca historis Indonesia."
  icon={CloudRain}
/>
```

---

## 24. Design Acceptance Criteria

Design dianggap selesai jika:

1. Tidak ada emoji/emoticon.
2. Semua navigasi memakai lucide-react icons.
3. Landing page terlihat profesional.
4. Dashboard bisa dipahami dalam 10 detik.
5. Dataset proof terlihat jelas.
6. Form prediksi mudah digunakan.
7. Chart memiliki title dan deskripsi.
8. Semua halaman responsive.
9. Loading, error, empty state tersedia.
10. Animasi halus dan tidak berlebihan.
11. Warna status konsisten.
12. Deploy di Vercel tidak rusak layout.
13. Tidak ada horizontal overflow kecuali table.
14. Sidebar mobile berfungsi.
15. Semua button dan input punya focus state.

---

## 25. Implementation Notes for Developer

- Gunakan Server Components untuk halaman statis agar ringan.
- Gunakan Client Components hanya untuk form, chart interaktif, sidebar mobile, dan animasi.
- Gunakan `dynamic(() => import(...), { ssr: false })` jika Recharts bermasalah saat SSR.
- Parse CSV dengan `papaparse`.
- Format angka dengan `Intl.NumberFormat("id-ID")`.
- Format tanggal dengan bahasa Indonesia.
- Simpan model `.pkl` di server folder.
- Jangan expose file model.
- Gunakan error boundary sederhana untuk chart.
- Buat helper `formatNumber`, `formatPercent`, `formatMm`, `formatTemperature`.

---

## 26. Example Utility Classes

### Page

```tsx
<main className="min-h-screen bg-slate-50">
  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    {children}
  </div>
</main>
```

### Card Grid

```tsx
<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {cards}
</section>
```

### Chart Grid

```tsx
<section className="grid gap-6 lg:grid-cols-2">
  {charts}
</section>
```

### Form Grid

```tsx
<form className="grid gap-4 md:grid-cols-2">
  {fields}
</form>
```

---

## 27. Final Visual Direction

Website final harus terasa seperti:

```text
Data science dashboard
Government climate analytics
Academic final project
Clean SaaS analytics platform
```

Bukan seperti:

```text
Blog biasa
Landing page kosong
Dashboard terlalu ramai
UI penuh warna mencolok
Website statis tanpa analisis
```

---

## 28. Final Deliverable UI Checklist

Sebelum dikumpulkan, pastikan:

```text
Landing page selesai
Dashboard selesai
Dataset page selesai
EDA page selesai
Clustering page selesai
Prediksi curah hujan selesai
Klasifikasi risiko selesai
Deep learning page selesai
Evaluasi model page selesai
Rekomendasi page selesai
Metodologi page selesai
Mobile responsive
Vercel deployment sukses
API health sukses
Prediction API sukses
Dataset 100 MB proof tampil
No emoji/emoticon
Icon lucide-react digunakan
```

---

## 29. Reference Links

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Tailwind CSS 4: https://tailwindcss.com/blog/tailwindcss-v4
- Tailwind CSS with Next.js: https://tailwindcss.com/docs/guides/nextjs
- Vercel Python Runtime: https://vercel.com/docs/functions/runtimes/python
- FastAPI on Vercel: https://vercel.com/docs/frameworks/backend/fastapi
- Open-Meteo Historical Weather API: https://open-meteo.com/en/docs/historical-weather-api
- BMKG Data Terbuka: https://data.bmkg.go.id/
