"use client";

import { cn } from "@/lib/cn";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-[2px]", className)}
      style={{
        width: width ?? "100%",
        height: height ?? "12px",
        background:
          "linear-gradient(90deg, var(--muted) 0%, var(--accent) 50%, var(--muted) 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

export type { SkeletonProps };
