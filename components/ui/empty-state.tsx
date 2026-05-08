"use client";

import { cn } from "@/lib/cn";
import React from "react";

interface EmptyStateProps {
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({ children, className = "" }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[3px] border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-alt)] p-16 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface EmptyStateIconProps {
  children: React.ReactNode;
  className?: string;
}

export function EmptyStateIcon({
  children,
  className = "",
}: EmptyStateIconProps) {
  return (
    <div
      className={cn(
        "mb-4 flex justify-center text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface EmptyStateTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function EmptyStateTitle({
  children,
  className = "",
}: EmptyStateTitleProps) {
  return (
    <h4 className={cn("m-0 mt-4 mb-2 text-[16px] font-semibold", className)}>
      {children}
    </h4>
  );
}

interface EmptyStateDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function EmptyStateDescription({
  children,
  className = "",
}: EmptyStateDescriptionProps) {
  return (
    <p
      className={cn(
        "m-0 mb-6 text-[14px] text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface EmptyStateActionProps {
  children: React.ReactNode;
  className?: string;
}

export function EmptyStateAction({
  children,
  className = "",
}: EmptyStateActionProps) {
  return <div className={className}>{children}</div>;
}

export type { EmptyStateProps };
