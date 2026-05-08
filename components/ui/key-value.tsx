"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface KeyValueProps {
  children?: React.ReactNode;
  className?: string;
}

export function KeyValue({ children, className = "" }: KeyValueProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

interface KeyValueItemProps {
  label: string;
  value: string;
  className?: string;
}

export function KeyValueItem({
  label,
  value,
  className = "",
}: KeyValueItemProps) {
  return (
    <div
      className={cn(
        "flex justify-between border-b border-[var(--border)] py-3.5 text-[14px] last:border-b-0",
        className,
      )}
    >
      <span className="text-[var(--foreground-subtle)]">{label}</span>
      <span
        style={{
          fontFamily: label.toLowerCase().includes("id")
            ? "'JetBrains Mono', monospace"
            : "inherit",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export type { KeyValueProps };
