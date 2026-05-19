"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloudRain, Menu, X } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { navigationItems } from "@/lib/navigation";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex min-h-11 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-gradient-to-r from-cyan-700 to-teal-600 !text-white shadow-lg shadow-cyan-700/20 [&_*]:!text-white"
                : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-900",
            )}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-lg shadow-cyan-700/20">
        <CloudRain className="h-6 w-6" aria-hidden />
      </span>
      <span>
        <span className="block text-sm font-bold text-cyan-950">{APP_NAME}</span>
        <span className="block text-xs text-slate-500">Climate Analytics</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-cyan-100/80 bg-white/86 px-4 py-5 shadow-[18px_0_65px_-52px_rgba(8,145,178,0.7)] backdrop-blur-xl lg:flex">
        <Brand />
        <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
          <NavLinks />
        </div>
        <div className="mt-5 rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Dataset valid</p>
          <p className="mt-1 text-2xl font-bold text-cyan-950">130.73 MB</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">Open-Meteo Historical Weather API, 84 file.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-cyan-100 bg-white/88 px-4 py-3 shadow-sm backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Brand />
          <button
            type="button"
            aria-label="Buka navigasi"
            onClick={() => setOpen(true)}
            className="min-h-11 min-w-11 rounded-2xl border border-cyan-100 bg-cyan-50 p-2 text-cyan-800"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              className="h-full w-80 max-w-[88vw] bg-white/95 p-5 shadow-xl backdrop-blur-xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  aria-label="Tutup navigasi"
                  onClick={() => setOpen(false)}
                  className="min-h-11 min-w-11 rounded-2xl border border-cyan-100 bg-cyan-50 p-2 text-cyan-800"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-8 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.main
        className="lg:pl-72"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</div>
      </motion.main>
    </div>
  );
}
