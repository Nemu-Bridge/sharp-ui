"use client";

import { cn } from "@/lib/cn";

interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export function Radio({
  label,
  checked,
  onChange,
  name,
  value,
  disabled,
  className,
  ...props
}: RadioProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-3 text-[14px] text-[var(--foreground)] select-none",
        disabled && "cursor-not-allowed text-[var(--muted-foreground)]",
        className,
      )}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        className="peer hidden"
        {...props}
      />
      <span
        className="inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--input)] bg-[var(--background)] transition-all duration-300 peer-checked:border-[var(--primary)] peer-hover:border-[var(--muted-foreground)] peer-disabled:border-[var(--border)] peer-disabled:bg-[var(--muted)]"
        style={
          checked
            ? { borderWidth: 5, borderColor: "var(--primary)" }
            : undefined
        }
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export type { RadioProps };
