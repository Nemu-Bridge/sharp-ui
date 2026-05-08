"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";

interface CommandItemData {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  meta?: string;
  onSelect?: () => void;
}

interface CommandGroupData {
  label: string;
  children: CommandItemData[];
}

interface CommandTabData {
  label: string;
  count?: number;
  itemNoun?: string;
  placeholder?: string;
  children: CommandGroupData[];
}

interface CommandItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  meta?: string;
  onSelect?: () => void;
}

export const CommandItem = (() => null) as unknown as (
  props: CommandItemProps,
) => React.ReactElement;

interface CommandGroupProps {
  label: string;
  children?: React.ReactNode;
}

export const CommandGroup = (() => null) as unknown as (
  props: CommandGroupProps,
) => React.ReactElement;

interface CommandTabProps {
  label: string;
  count?: number;
  itemNoun?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const CommandTab = (() => null) as unknown as (
  props: CommandTabProps,
) => React.ReactElement;

interface CommandPaletteProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function CommandPalette({
  open,
  onClose,
  children,
  className = "",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const childArray = React.Children.toArray(children);
  const validElements = childArray.filter((c): c is React.ReactElement =>
    React.isValidElement(c),
  );

  const tabs = validElements.filter((c) => c.type === CommandTab);
  const groups = validElements.filter((c) => c.type === CommandGroup);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTab(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const tabData: CommandTabData[] = tabs.map((t) => {
    const props = t.props as CommandTabProps;
    return {
      label: props.label,
      count: props.count,
      itemNoun: props.itemNoun,
      placeholder: props.placeholder,
      children: React.Children.toArray(props.children)
        .filter((c): c is React.ReactElement => React.isValidElement(c))
        .map((group) => ({
          label: (group.props as CommandGroupProps).label,
          children: React.Children.toArray(
            (group.props as CommandGroupProps).children,
          )
            .filter((c): c is React.ReactElement => React.isValidElement(c))
            .map((item) => item.props as CommandItemProps),
        })),
    };
  });

  const groupData: CommandGroupData[] = groups.map((group) => ({
    label: (group.props as CommandGroupProps).label,
    children: React.Children.toArray(
      (group.props as CommandGroupProps).children,
    )
      .filter((c): c is React.ReactElement => React.isValidElement(c))
      .map((item) => item.props as CommandItemProps),
  }));

  const activeItems =
    tabs.length > 0 ? (tabData[tab]?.children ?? []) : groupData;
  const currentPlaceholder =
    tabs.length > 0 ? tabData[tab]?.placeholder : "Type a command or search…";

  const filtered = activeItems
    .map((g) => ({
      ...g,
      children: g.children.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((g) => g.children.length > 0);
  const flat = filtered.flatMap((g) => g.children);

  useEffect(() => {
    setActive(0);
  }, [query, tab]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(flat.length - 1, a + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === "Tab" && tabs.length > 0) {
        e.preventDefault();
        setTab((t) => (t + (e.shiftKey ? -1 : 1) + tabs.length) % tabs.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const p = flat[active];
        if (p) {
          p.onSelect?.();
          onClose?.();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, flat, active, onClose, tabs.length]);

  let cursor = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[var(--modal-overlay)] pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              "w-full max-w-[640px] overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--background)]",
              className,
            )}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center gap-3 border-b border-[var(--border)] px-5">
              <Icon
                name="search"
                size={18}
                className="text-[var(--foreground-subtle)]"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={currentPlaceholder}
                className="flex-1 border-none bg-transparent text-[15px] text-[var(--foreground)] outline-none placeholder:text-[var(--foreground-subtle)]"
              />
              <span className="rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)] px-2.5 py-1 text-xs tracking-wide text-[var(--foreground-subtle)]">
                ESC
              </span>
            </div>
            {tabs.length > 0 && (
              <Tabs
                value={String(tab)}
                onValueChange={(v) => setTab(Number(v))}
              >
                <TabsList
                  variant="underline"
                  className="bg-[var(--surface-alt)]"
                >
                  {tabData.map((t, i) => (
                    <TabsTab key={t.label} value={String(i)} count={t.count}>
                      {t.label}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
            )}
            <div className="max-h-[400px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-8 py-8 text-center text-[14px] text-[var(--foreground-subtle)]">
                  No results match &ldquo;{query}&rdquo;
                </div>
              )}
              {filtered.map((group: CommandGroupData) => (
                <div key={group.label}>
                  <div className="px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-[var(--foreground-subtle)] uppercase">
                    {group.label}
                  </div>
                  {group.children.map((item: CommandItemData) => {
                    const i = cursor++;
                    return (
                      <div
                        key={item.label}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-[14px] text-[var(--foreground)]",
                          i === active && "bg-[var(--surface-alt)]",
                        )}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => {
                          item.onSelect?.();
                          onClose?.();
                        }}
                      >
                        {item.icon && (
                          <span className="text-[var(--fg-muted)]">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                        {item.meta && (
                          <span className="ml-auto text-xs tracking-wide text-[var(--foreground-subtle)]">
                            {item.meta}
                          </span>
                        )}
                        {item.shortcut && (
                          <span className="ml-auto flex gap-1">
                            {item.shortcut.map((k: string) => (
                              <span
                                key={k}
                                className="rounded-[2px] border border-[var(--border)] bg-[var(--surface-alt)] px-2 py-1 text-xs tracking-wide text-[var(--foreground-subtle)]"
                              >
                                {k}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2.5 text-[12px] text-[var(--foreground-subtle)]">
              <div className="flex gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs tracking-wide text-[var(--fg-muted)]">
                    &uarr;
                  </kbd>
                  <kbd className="rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs tracking-wide text-[var(--fg-muted)]">
                    &darr;
                  </kbd>
                  Navigate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs tracking-wide text-[var(--fg-muted)]">
                    &crarr;
                  </kbd>
                  Select
                </span>
                {tabs.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <kbd className="rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs tracking-wide text-[var(--fg-muted)]">
                      Tab
                    </kbd>
                    Switch
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded-[2px] border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs tracking-wide text-[var(--fg-muted)]">
                    Esc
                  </kbd>
                  Close
                </span>
              </div>
              <span>
                {flat.length}{" "}
                {tabs.length > 0
                  ? tabData[tab]?.itemNoun || "results"
                  : "commands"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type {
  CommandPaletteProps,
  CommandItemProps,
  CommandGroupProps,
  CommandTabProps,
};
