"use client";

import { cn } from "@/lib/cn";

interface TableProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "card";
}

export function Table({
  children,
  className,
  variant = "default",
}: TableProps) {
  return (
    <table
      className={cn(
        "w-full border-collapse text-[14px]",
        variant === "card" && "table-fixed",
        className,
      )}
    >
      {children}
    </table>
  );
}

export function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <thead className={cn(className)}>{children}</thead>;
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={cn(className)}>{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("transition-colors hover:bg-[var(--accent)]", className)}>
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <th
      className={cn(
        "border-b border-[var(--border)] bg-[var(--background)] p-5 text-left text-[12px] font-medium tracking-wider text-[var(--muted-foreground)] uppercase",
        className,
      )}
      style={style}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
  style,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  colSpan?: number;
}) {
  return (
    <td
      className={cn(
        "border-b border-[var(--border)] p-5 align-middle",
        className,
      )}
      style={style}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}

export function TableFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tfoot className={cn("border-t border-[var(--border)]", className)}>
      {children}
    </tfoot>
  );
}

export type { TableProps };
