"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

const Ctx = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);
function useDm() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("Must be inside <DropdownMenu>");
  return c;
}

export function DropdownMenu({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <Ctx.Provider value={{ open, setOpen }}>
      <div ref={ref} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDm();
  return (
    <div onClick={() => setOpen(!open)} className={className}>
      {children}
    </div>
  );
}

export function DropdownMenuContent({
  children,
  align = "start",
  className = "",
}: {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const { open } = useDm();
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute top-[calc(100%+4px)] z-[100] min-w-[220px] rounded-[3px] border border-[var(--border)] bg-[var(--background)] p-1 animate-dropdown-in",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      style={{ transformOrigin: "top" }}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const { setOpen } = useDm();
  return (
    <div
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-[2px] px-4 py-2.5 text-[14px] transition-colors duration-300 hover:bg-[var(--surface-alt)] ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function DropdownMenuLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-2 text-[11px] font-medium tracking-widest text-[var(--foreground-subtle)] uppercase",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`my-1 h-px bg-[var(--border)] ${className}`} />;
}

export function DropdownMenuShortcut({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`rounded-[2px] border border-[var(--border)] bg-[var(--surface-alt)] px-2 py-1 text-xs tracking-wide text-[var(--foreground-subtle)] ${className}`}
    >
      {children}
    </span>
  );
}

export function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [subOpen, setSubOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: subOpen, setOpen: setSubOpen }}>
      <div className="relative">{children}</div>
    </Ctx.Provider>
  );
}

export function DropdownMenuSubTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDm();
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-[2px] px-4 py-2.5 text-[14px] transition-colors duration-300 hover:bg-[var(--surface-alt)] ${open ? "bg-[var(--surface-alt)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSubContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useDm();
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute top-0 left-full z-[100] ml-1 min-w-[200px] rounded-[3px] border border-[var(--border)] bg-[var(--background)] p-1 animate-dropdown-in",
        className,
      )}
      style={{ transformOrigin: "left" }}
    >
      {children}
    </div>
  );
}
