"use client";

import { cn } from "@/lib/cn";
import React from "react";

interface FrameProps {
  children: React.ReactNode;
  className?: string;
}

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FrameHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameHeader({ children, className = "" }: FrameHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[var(--border)] px-7 py-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FrameTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameTitle({ children, className = "" }: FrameTitleProps) {
  return (
    <h3 className={cn("m-0 text-[15px] font-semibold", className)}>
      {children}
    </h3>
  );
}

interface FrameActionProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameAction({ children, className = "" }: FrameActionProps) {
  return <div className={className}>{children}</div>;
}

interface FrameContentProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameContent({ children, className = "" }: FrameContentProps) {
  return <div className={cn("p-8", className)}>{children}</div>;
}

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({
  url = "example.com",
  children,
  className,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius)] border border-[var(--border)]",
        className,
      )}
    >
      <div className="flex h-11 items-center gap-2 border-b border-[var(--border)] bg-[var(--muted)] px-4">
        <div className="mr-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
        </div>
        <div className="flex h-7 flex-1 items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-3 text-xs tracking-wide text-[var(--muted-foreground)]">
          {url}
        </div>
      </div>
      <div className="min-h-[280px] p-10">{children}</div>
    </div>
  );
}

export type {
  FrameProps,
  FrameHeaderProps,
  FrameTitleProps,
  FrameActionProps,
  FrameContentProps,
  BrowserFrameProps,
};
