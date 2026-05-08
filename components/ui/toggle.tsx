"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "outline";
}

export function Toggle({
  pressed = false,
  onPressedChange,
  label,
  className = "",
  disabled = false,
  variant = "default",
}: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onPressedChange?.(!pressed)}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[3px] px-3.5 text-[13px] font-medium transition-colors duration-150",
        pressed
          ? "bg-[var(--foreground)] text-[var(--background)]"
          : "bg-[var(--surface-alt)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
        disabled && "cursor-not-allowed opacity-50",
        variant === "outline" && "border",
        variant === "outline" &&
          pressed &&
          "border-[var(--foreground)] bg-transparent text-[var(--foreground)]",
        variant === "outline" && !pressed && "border-[var(--border)]",
        className,
      )}
    >
      {label}
    </button>
  );
}

export type { ToggleProps };
