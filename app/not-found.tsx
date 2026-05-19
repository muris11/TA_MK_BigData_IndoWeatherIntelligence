import Link from "next/link";
import { CloudOff, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <section className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
          <CloudOff className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-800">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Route yang dibuka tidak tersedia di dashboard IndoWeather Intelligence.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Buka Dashboard
          </Link>
        </Button>
      </section>
    </main>
  );
}
