import {
  Activity,
  BarChart3,
  BrainCircuit,
  ClipboardCheck,
  CloudRain,
  Database,
  FileText,
  LayoutDashboard,
  Network,
  ShieldAlert,
} from "lucide-react";

export const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dataset",
    label: "Dataset",
    icon: Database,
  },
  {
    href: "/eda",
    label: "EDA",
    icon: BarChart3,
  },
  {
    href: "/clustering",
    label: "Clustering",
    icon: Network,
  },
  {
    href: "/prediksi-curah-hujan",
    label: "Prediksi Curah Hujan",
    icon: CloudRain,
  },
  {
    href: "/klasifikasi-risiko",
    label: "Klasifikasi Risiko",
    icon: ShieldAlert,
  },
  {
    href: "/deep-learning",
    label: "Deep Learning",
    icon: BrainCircuit,
  },
  {
    href: "/evaluasi-model",
    label: "Evaluasi Model",
    icon: Activity,
  },
  {
    href: "/rekomendasi",
    label: "Rekomendasi",
    icon: ClipboardCheck,
  },
  {
    href: "/metodologi",
    label: "Metodologi",
    icon: FileText,
  },
] as const;
