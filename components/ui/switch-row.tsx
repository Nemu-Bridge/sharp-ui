"use client";

import { cn } from "@/lib/cn";

interface SwitchRowProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function SwitchRow({
  label,
  checked,
  onChange,
  className = "",
}: SwitchRowProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between px-5 py-3 text-[14px]",
        className,
      )}
    >
      <span>{label}</span>
      <span
        className="relative h-[22px] w-10 flex-shrink-0 rounded-[3px] transition-colors duration-150"
        style={{ background: checked ? "var(--blue)" : "var(--border-strong)" }}
        onClick={(e) => {
          e.preventDefault();
          onChange?.(!checked);
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-[2px] bg-[var(--background)] transition-transform duration-[180ms]"
          style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
        />
      </span>
    </label>
  );
}

export type { SwitchRowProps };
