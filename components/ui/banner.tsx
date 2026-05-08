"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface BannerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Banner({ children, className = "" }: BannerProps) {
  return (
    <div
      className={cn(
        "rounded-[3px] border border-[var(--border)] bg-[var(--background)] p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BannerTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export function BannerTitle({ children, className = "" }: BannerTitleProps) {
  return (
    <div
      className={cn(
        "text-[14px] font-semibold text-[var(--foreground)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BannerDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export function BannerDescription({
  children,
  className = "",
}: BannerDescriptionProps) {
  return (
    <div
      className={cn(
        "mt-1 text-[13px] text-[var(--foreground-subtle)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BannerActionProps {
  children?: React.ReactNode;
  className?: string;
}

export function BannerAction({ children, className = "" }: BannerActionProps) {
  return <div className={cn("mt-3", className)}>{children}</div>;
}

export type {
  BannerProps,
  BannerTitleProps,
  BannerDescriptionProps,
  BannerActionProps,
};
