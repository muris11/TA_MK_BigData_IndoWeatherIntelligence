import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Field({
  label,
  helper,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helper?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100",
          className,
        )}
        {...props}
      />
      {helper ? <span className="block text-xs text-slate-500">{helper}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
