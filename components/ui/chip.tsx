"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export function Chip({
  label,
  onRemove,
  className = "",
  variant = "default",
}: ChipProps) {
  const variants = {
    default:
      "bg-[var(--surface-alt)] text-[var(--foreground)] border-[var(--border)]",
    success:
      "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green-soft-border)]",
    warning:
      "bg-[var(--amber-soft)] text-[var(--amber)] border-[var(--amber-soft-border)]",
    danger:
      "bg-[var(--red-soft)] text-[var(--red)] border-[var(--red-soft-border)]",
    info: "bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue-soft-border)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 text-[12px] font-medium",
        variants[variant],
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="cursor-pointer rounded-[2px] hover:bg-[var(--surface-hover)]"
        >
          <Icon name="x" size={12} />
        </button>
      )}
    </span>
  );
}

export type { ChipProps };
