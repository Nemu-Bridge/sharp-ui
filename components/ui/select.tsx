"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

const Ctx = React.createContext<{
  value?: string;
  onValueChange?: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  setValue: (v: string) => void;
  triggerWidth: number;
} | null>(null);

function useCtx() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Must be inside <Select>");
  return c;
}

function Select({
  value,
  onValueChange,
  children,
  className = "",
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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
        "button",
      ) as HTMLButtonElement;
      if (trigger) setTriggerWidth(trigger.offsetWidth);
    }
  }, [open]);
  return (
    <Ctx.Provider
      value={{
        value,
        onValueChange,
        open,
        setOpen,
        setValue: (v) => onValueChange?.(v),
        triggerWidth,
      }}
    >
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

function SelectTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useCtx();
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "inline-flex h-14 min-w-[240px] cursor-pointer items-center justify-between gap-2.5 rounded-[3px] border bg-[var(--background)] px-5 text-[15px] text-[var(--foreground)] transition-colors duration-150",
        open
          ? "border-[var(--blue)] shadow-[inset_0_0_0_1px_var(--blue)]"
          : "border-[var(--border-strong)] hover:border-[var(--fg-muted)]",
        className,
      )}
    >
      {children}
      <Icon
        name="chevron-down"
        size={16}
        className="text-[var(--foreground-subtle)]"
      />
    </button>
  );
}

function SelectValue({
  placeholder = "Select...",
  className = "",
}: {
  placeholder?: string;
  className?: string;
}) {
  const { value } = useCtx();
  return (
    <span
      className={cn(!value && "text-[var(--foreground-subtle)]", className)}
    >
      {value || placeholder}
    </span>
  );
}

function SelectContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, triggerWidth } = useCtx();
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute top-[calc(100%+4px)] left-0 z-50 max-h-[280px] overflow-y-auto rounded-[3px] border border-[var(--border)] bg-[var(--background)] p-1",
        className,
      )}
      style={{
        width: triggerWidth || undefined,
        animation: "dropdown-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both",
        transformOrigin: "top",
      }}
    >
      {children}
    </div>
  );
}

function SelectItem({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { value: sel, setValue, setOpen } = useCtx();
  return (
    <div
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-[2px] px-4 py-3 text-[14px] transition-colors duration-300",
        sel === value
          ? "bg-[var(--blue-soft)] text-[var(--blue)]"
          : "hover:bg-[var(--surface-alt)]",
        className,
      )}
    >
      <span>{children}</span>
      {sel === value && (
        <Icon name="check" size={14} className="text-[var(--blue)]" />
      )}
    </div>
  );
}

function SelectGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

function SelectLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-2 text-xs font-medium tracking-wide text-[var(--foreground-subtle)] uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
};
