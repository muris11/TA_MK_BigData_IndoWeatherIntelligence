import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cyan-700 !text-white shadow-sm hover:bg-cyan-800 [&_*]:!text-white",
  secondary: "bg-cyan-950 !text-white shadow-sm hover:bg-cyan-900 [&_*]:!text-white",
  outline: "border border-slate-200 bg-white text-slate-800 hover:border-cyan-200 hover:bg-cyan-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-red-600 !text-white shadow-sm hover:bg-red-700 [&_*]:!text-white",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  className,
  variant = "primary",
  asChild,
  children,
  ...props
}: ButtonProps) {
  const buttonClass = cn(baseClass, variants[variant], className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(buttonClass, child.props.className),
    });
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
