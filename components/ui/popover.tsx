"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

const Ctx = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);

function usePop() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Must be inside <Popover>");
  return c;
}

export function Popover({
  open: cOpen,
  onOpenChange,
  children,
  className = "",
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [iOpen, setIOpen] = useState(false);
  const isOpen = cOpen ?? iOpen;
  const setIsOpen = onOpenChange ?? setIOpen;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }
  }, [isOpen, setIsOpen]);

  return (
    <Ctx.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <div ref={ref} className={cn("relative inline-block", className)}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function PopoverTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = usePop();
  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

export function PopoverContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = usePop();
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "absolute top-full left-0 z-60 mt-2 w-64 rounded-[4px] border border-[var(--border)] bg-[var(--background)] shadow-lg",
          className,
        )}
      >
        <div className="absolute -top-1.5 left-4 h-3 w-3 rotate-45 border-t border-l border-[var(--border)] bg-[var(--background)]" />
        {children}
      </div>
    </>
  );
}

export function PopoverTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-[var(--border)] px-4 py-3 text-[14px] font-semibold text-[var(--foreground)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PopoverBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-4 py-3", className)}>{children}</div>;
}

export function PopoverFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-end gap-2 rounded-b-[4px] border-t border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PopoverItem({
  label,
  checked,
  onChange,
  className = "",
}: {
  label: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 text-[14px]",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="hidden"
      />
      <span
        className={cn(
          "flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)]",
          checked && "border-[var(--blue)] bg-[var(--blue)]",
        )}
      >
        {checked && (
          <span className="h-[6px] w-[10px] -rotate-45 border-b-2 border-l-2 border-white" />
        )}
      </span>
      <span className="text-[var(--foreground)]">{label}</span>
    </label>
  );
}
