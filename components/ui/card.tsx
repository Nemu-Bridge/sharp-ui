"use client";

import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[4px] border border-[var(--border)] bg-[var(--background)] p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "m-0 mb-2 text-[18px] font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "m-0 mb-6 text-[14px] leading-relaxed text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex justify-end gap-3 border-t border-[var(--border)] pt-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type {
  CardProps,
  CardTitleProps,
  CardDescriptionProps,
  CardFooterProps,
};
