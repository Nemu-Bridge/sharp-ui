"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import React from "react";
import { Icon } from "@/components/ui/icon";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: string[];
}

export function Accordion({
  children,
  className = "",
  defaultOpen = [],
}: AccordionProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(defaultOpen.map((id) => [id, true])),
  );
  const toggle = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className={cn("border-t border-[var(--border)]", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<Record<string, unknown>>,
              {
                open,
                onToggle: toggle,
              },
            )
          : child,
      )}
    </div>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  open?: Record<string, boolean>;
  onToggle?: (value: string) => void;
}

export function AccordionItem({
  children,
  value,
  className = "",
  open = {},
  onToggle,
}: AccordionItemProps) {
  const isOpen = open[value];
  return (
    <div className={cn("border-b border-[var(--border)]", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<Record<string, unknown>>,
              {
                open: isOpen,
                onToggle: () => onToggle?.(value),
              },
            )
          : child,
      )}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onToggle?: () => void;
}

export function AccordionTrigger({
  children,
  className = "",
  open,
  onToggle,
}: AccordionTriggerProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between border-none bg-transparent py-5 text-left text-[15px] font-medium text-[var(--foreground)] transition-colors duration-150 hover:text-[var(--primary)]",
        className,
      )}
    >
      <span>{children}</span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.22 }}
        className="inline-flex flex-shrink-0 text-[var(--muted-foreground)]"
      >
        <Icon name="chevron-down" size={16} />
      </motion.span>
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
}

export function AccordionContent({
  children,
  className = "",
  open,
}: AccordionContentProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: 0.18,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.12 },
          }}
          className={cn("overflow-hidden", className)}
        >
          <div className="px-1 pb-5 text-[14px] leading-relaxed text-[var(--muted-foreground)]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type { AccordionProps };
