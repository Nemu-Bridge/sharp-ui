"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-[2px] bg-[var(--muted)]",
        className,
      )}
    >
      <motion.div
        className="h-full rounded-[2px] bg-[var(--primary)]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}

export type { ProgressProps };
