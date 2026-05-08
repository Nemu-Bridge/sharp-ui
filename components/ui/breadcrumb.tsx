"use client";

import { cn } from "@/lib/cn";
import React from "react";

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className = "" }: BreadcrumbProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-[14px] text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({
  children,
  className = "",
}: BreadcrumbItemProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>{children}</span>
  );
}

interface BreadcrumbSeparatorProps {
  className?: string;
}

export function BreadcrumbSeparator({
  className = "",
}: BreadcrumbSeparatorProps) {
  return <span className={cn("text-[var(--border)]", className)}>/</span>;
}

interface BreadcrumbLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function BreadcrumbLink({
  children,
  href,
  className = "",
}: BreadcrumbLinkProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "text-[var(--muted-foreground)] no-underline transition-colors hover:text-[var(--foreground)]",
          className,
        )}
      >
        {children}
      </a>
    );
  }
  return <span className={className}>{children}</span>;
}

interface BreadcrumbPageProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbPage({
  children,
  className = "",
}: BreadcrumbPageProps) {
  return (
    <span className={cn("font-medium text-[var(--foreground)]", className)}>
      {children}
    </span>
  );
}

export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
};
