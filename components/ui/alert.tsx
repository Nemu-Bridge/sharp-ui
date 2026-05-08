"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  variant?: AlertVariant;
  className?: string;
  children?: React.ReactNode;
}

interface AlertTitleProps {
  className?: string;
  children?: React.ReactNode;
}

interface AlertDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const config: Record<
  AlertVariant,
  {
    iconName: string;
    border: string;
    bg: string;
    color: string;
  }
> = {
  info: {
    iconName: "info-circle",
    border: "var(--blue-soft-border)",
    bg: "var(--blue-soft)",
    color: "var(--primary)",
  },
  success: {
    iconName: "check",
    border: "var(--green-soft-border)",
    bg: "var(--green-soft)",
    color: "var(--green)",
  },
  warning: {
    iconName: "alert-circle",
    border: "var(--amber-soft-border)",
    bg: "var(--amber-soft)",
    color: "var(--amber)",
  },
  danger: {
    iconName: "circle-x",
    border: "var(--red-soft-border)",
    bg: "var(--red-soft)",
    color: "var(--destructive)",
  },
};

export function Alert({ variant = "info", children, className }: AlertProps) {
  const c = config[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-[3px] border p-6",
        className,
      )}
      style={{ borderColor: c.border, background: c.bg }}
    >
      <div className="mt-0.5 flex-shrink-0">
        <Icon name={c.iconName} size={20} style={{ color: c.color }} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function AlertTitle({ children, className }: AlertTitleProps) {
  return (
    <p className={cn("m-0 mb-1 text-[14px] font-semibold", className)}>
      {children}
    </p>
  );
}

export function AlertDescription({
  children,
  className,
}: AlertDescriptionProps) {
  return (
    <p
      className={cn(
        "m-0 text-[14px] leading-relaxed text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export type {
  AlertProps,
  AlertVariant,
  AlertTitleProps,
  AlertDescriptionProps,
};
