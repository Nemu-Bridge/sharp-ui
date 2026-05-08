"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  children: React.ReactNode;
  className?: string;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function TooltipTrigger({
  children,
  className = "",
  asChild,
}: TooltipTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      {
        className: cn(
          (children.props as { className?: string }).className,
          className,
        ),
      },
    );
  }
  return <span className={cn(className)}>{children}</span>;
}

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ children, className = "" }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
    </span>
  );
}

export function TooltipContent({
  children,
  className = "",
}: TooltipContentProps) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-[100] -translate-x-1/2 translate-y-1 scale-[0.96] rounded-[3px] bg-[var(--foreground)] px-3 py-2 text-[12px] font-medium whitespace-nowrap text-[var(--background)] opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
        className,
      )}
      role="tooltip"
    >
      {children}
      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--foreground)]" />
    </span>
  );
}

export type { TooltipProps, TooltipTriggerProps, TooltipContentProps };
