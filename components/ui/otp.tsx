"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface OTPProps {
  length?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
}

export function OTP({
  length = 6,
  value: controlledValue,
  onChange,
  className = "",
}: OTPProps) {
  const [internal, setInternal] = useState<string[]>(() =>
    Array(length).fill(""),
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const handle = (i: number, char: string) => {
    const next = [...value];
    next[i] = char.replace(/[^0-9]/g, "").slice(-1);
    if (!isControlled) setInternal(next);
    onChange?.(next);
    if (char && i < length - 1) refs.current[i + 1]?.focus();
  };
  const key = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0)
      refs.current[i - 1]?.focus();
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => key(i, e)}
          className="otp-cell h-14 w-12 rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)] text-center text-[22px] font-medium text-[var(--foreground)] transition-all duration-150 outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/20"
        />
      ))}
    </div>
  );
}

export type { OTPProps };
