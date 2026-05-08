"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface MultiSelectProps {
  values?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MultiSelect({
  values = [],
  onChange,
  placeholder = "Add tags...",
  className = "",
  children,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [triggerWidth, setTriggerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  interface OptionData {
    value: string;
    label: string;
  }

  const options: OptionData[] = React.Children.toArray(children)
    .filter((c): c is React.ReactElement => React.isValidElement(c))
    .map((child) => ({
      value: (child.props as MultiSelectOptionProps).value,
      label: (child.props as MultiSelectOptionProps).label,
    }));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && containerRef.current) {
      const trigger = containerRef.current.querySelector(
        ".multi-select-trigger",
      ) as HTMLDivElement;
      if (trigger) setTriggerWidth(trigger.offsetWidth);
    }
  }, [open]);

  const toggle = (v: string) => {
    if (values.includes(v)) onChange?.(values.filter((x) => x !== v));
    else onChange?.([...values, v]);
  };

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className="multi-select-trigger flex min-h-[56px] cursor-text flex-wrap items-center gap-1.5 rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)] p-2 transition-colors duration-150"
        onClick={() => setOpen(true)}
        style={
          open
            ? {
                borderColor: "var(--border-focus)",
                boxShadow: "inset 0 0 0 1px var(--border-focus)",
              }
            : undefined
        }
      >
        {values.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--border)] bg-[var(--surface-alt)] px-2 py-1 text-[13px]"
            >
              {opt?.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                className="cursor-pointer border-none bg-transparent px-0.5 text-[14px] leading-none text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
              >
                &times;
              </button>
            </span>
          );
        })}
        <input
          className="h-8 min-w-[80px] flex-1 border-none bg-transparent text-[14px] text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-subtle)]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={values.length === 0 ? placeholder : ""}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && triggerWidth > 0 && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 z-[100] max-h-[280px] overflow-y-auto rounded-[3px] border border-[var(--border)] bg-[var(--background)] p-1 animate-dropdown-in"
          style={{ width: triggerWidth }}
        >
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-[14px] text-[var(--foreground-subtle)]">
              No matches
            </div>
          )}
          {filtered.map((opt) => (
            <div
              key={opt.value}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-[2px] px-4 py-3 text-[14px] transition-colors duration-300",
                values.includes(opt.value)
                  ? "bg-[var(--blue-soft)] text-[var(--blue)]"
                  : "hover:bg-[var(--surface-alt)]",
              )}
              onClick={() => toggle(opt.value)}
            >
              <span>{opt.label}</span>
              {values.includes(opt.value) && (
                <Icon name="check" size={14} className="text-[var(--blue)]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface MultiSelectOptionProps {
  value: string;
  label: string;
}

export const MultiSelectOption = (() => null) as unknown as (
  props: MultiSelectOptionProps,
) => React.ReactElement;

export type { MultiSelectProps, MultiSelectOptionProps };
