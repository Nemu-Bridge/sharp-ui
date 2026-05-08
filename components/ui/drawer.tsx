"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, children, className }: DrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[1000] bg-[var(--modal-overlay)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "fixed top-0 right-0 z-[1000] flex h-full w-full max-w-[440px] flex-col border-l border-[var(--border)] bg-[var(--background)]",
              className,
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 overflow-y-auto py-2">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DrawerHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-[var(--border)] px-7 py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DrawerTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("m-0 mb-1 text-[18px] font-semibold", className)}>
      {children}
    </h3>
  );
}

export function DrawerDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 text-[13px] text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DrawerSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-[var(--border)] px-7 py-5 last:border-b-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type { DrawerProps };
