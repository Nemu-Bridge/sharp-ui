"use client";

import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-[3px] border border-[var(--border-strong)]",
        className,
      )}
    >
      <button
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-10 w-10 cursor-pointer border-r border-none border-[var(--border)] bg-[var(--background)] text-[13px] font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--surface-alt)] disabled:cursor-not-allowed disabled:text-[var(--foreground-subtle)]"
      >
        &lsaquo;
      </button>
      {pages.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange?.(n)}
          className="h-10 w-10 cursor-pointer border-r border-none border-[var(--border)] bg-[var(--background)] text-[13px] font-medium transition-colors duration-150 hover:bg-[var(--surface-alt)]"
          style={
            n === currentPage
              ? { background: "var(--foreground)", color: "var(--background)" }
              : { color: "var(--foreground)" }
          }
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-10 w-10 cursor-pointer border-none bg-[var(--background)] text-[13px] font-medium text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--surface-alt)] disabled:cursor-not-allowed disabled:text-[var(--foreground-subtle)]"
      >
        &rsaquo;
      </button>
    </div>
  );
}

export type { PaginationProps };
