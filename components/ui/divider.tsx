"use client";

import { cn } from "@/lib/cn";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        "bg-[var(--border)]",
        orientation === "horizontal" ? "my-1" : "mx-1",
        className,
      )}
    />
  );
}

export type { DividerProps };
