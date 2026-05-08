"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className = "",
}: TabsProps) {
  const [active, setActive] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentActive = isControlled ? value : active;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setActive(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <div data-active={currentActive} className={cn("flex flex-col", className)}>
      {children
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<Record<string, unknown>>,
                  {
                    active: currentActive,
                    onChange: handleChange,
                  },
                )
              : child,
          )
        : null}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  variant?: "default" | "underline";
  className?: string;
  active?: string;
  onChange?: (value: string) => void;
}

export function TabsList({
  children,
  variant = "default",
  className = "",
  active,
  onChange,
}: TabsListProps) {
  return (
    <div
      className={cn(
        "flex gap-0",
        variant === "underline" && "border-b border-[var(--border)]",
        variant === "default" && "rounded-[3px] bg-[var(--surface-alt)] p-1",
        className,
      )}
    >
      {typeof children === "object"
        ? React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<Record<string, unknown>>,
                  {
                    active,
                    onChange,
                    variant,
                  },
                )
              : child,
          )
        : children}
    </div>
  );
}

interface TabsTabProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  active?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "underline";
  count?: number;
}

export function TabsTab({
  children,
  value,
  className = "",
  active,
  onChange,
  variant = "default",
  count,
}: TabsTabProps) {
  const isActive = active === value;
  return (
    <button
      type="button"
      onClick={() => onChange?.(value)}
      className={cn(
        "relative cursor-pointer bg-transparent px-6 py-3 text-[14px] font-medium transition-colors duration-200",
        isActive
          ? "text-[var(--foreground)]"
          : "text-[var(--foreground-subtle)] hover:text-[var(--foreground)]",
        className,
      )}
    >
      {children}
      {count !== undefined && (
        <span className="ml-2 rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 text-xs tracking-wide text-[var(--foreground-subtle)]">
          {count}
        </span>
      )}
      {variant === "underline" && (
        <span
          className={cn(
            "absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--blue)] transition-transform duration-300",
            isActive ? "scale-x-100" : "scale-x-0",
          )}
          style={{ transformOrigin: "center" }}
        />
      )}
    </button>
  );
}

interface TabsPanelProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  active?: string;
}

export function TabsPanel({
  children,
  value,
  className = "",
  active,
}: TabsPanelProps) {
  if (active !== value) return null;
  return <div className={cn(className)}>{children}</div>;
}

export type { TabsProps, TabsListProps, TabsTabProps, TabsPanelProps };
