"use client";

type BadgeVariant =
  | "default"
  | "primary"
  | "blue"
  | "success"
  | "green"
  | "warning"
  | "amber"
  | "destructive"
  | "red"
  | "violet"
  | "secondary"
  | "outline"
  | "solid";

interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-[var(--surface-alt)] text-[var(--foreground)] border-[var(--border)]",
  primary:
    "bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue-soft-border)]",
  blue: "bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue-soft-border)]",
  success:
    "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green-soft-border)]",
  green:
    "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green-soft-border)]",
  warning:
    "bg-[var(--amber-soft)] text-[var(--amber)] border-[var(--amber-soft-border)]",
  amber:
    "bg-[var(--amber-soft)] text-[var(--amber)] border-[var(--amber-soft-border)]",
  destructive:
    "bg-[var(--red-soft)] text-[var(--red)] border-[var(--red-soft-border)]",
  red: "bg-[var(--red-soft)] text-[var(--red)] border-[var(--red-soft-border)]",
  secondary:
    "bg-[var(--violet-soft)] text-[var(--violet)] border-[var(--violet-soft-border)]",
  violet:
    "bg-[var(--violet-soft)] text-[var(--violet)] border-[var(--violet-soft-border)]",
  outline:
    "bg-[var(--background)] text-[var(--foreground)] border-[var(--border-strong)]",
  solid: "bg-[var(--foreground)] text-[var(--background)] border-transparent",
};

export function Badge({
  variant = "default",
  dot,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex h-[26px] items-center gap-1.5 rounded-[3px] border px-3 text-[12px] leading-none font-medium tracking-[0.01em] transition-colors duration-300 ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant };
