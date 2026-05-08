"use client";

import { cn } from "@/lib/cn";
import React from "react";

interface SegmentedControlProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SegmentedControl({
  children,
  className = "",
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        "inline-flex min-w-fit overflow-hidden rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)]",
        className,
      )}
    >
      {typeof children === "object"
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<Record<string, unknown>>,
                  {
                    active: value,
                    onChange,
                  },
                )
              : child,
          )
        : children}
    </div>
  );
}

interface SegmentedControlItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  active?: string;
  onChange?: (value: string) => void;
}

export function SegmentedControlItem({
  children,
  value,
  className = "",
  active,
  onChange,
}: SegmentedControlItemProps) {
  const isActive = active === value;
  return (
    <button
      type="button"
      onClick={() => onChange?.(value)}
      className={cn(
        "cursor-pointer border-none bg-transparent px-5 py-3 text-[13px] font-medium transition-all duration-150",
        className,
      )}
      style={
        isActive
          ? { background: "var(--foreground)", color: "var(--background)" }
          : { color: "var(--muted-foreground)" }
      }
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = "var(--surface-alt)";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}

export type { SegmentedControlProps, SegmentedControlItemProps };
