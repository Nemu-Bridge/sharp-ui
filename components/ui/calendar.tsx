"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

interface CalendarProps {
  selected?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  a != null &&
  b != null &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const buildMonth = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(start.getDate() - offset);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return { date: d, outside: d.getMonth() !== month };
  });
};

export function Calendar({
  selected,
  onChange,
  className = "",
}: CalendarProps) {
  const today = new Date();
  const [view, setView] = useState({
    year: selected?.getFullYear() ?? today.getFullYear(),
    month: selected?.getMonth() ?? today.getMonth(),
  });
  const cells = buildMonth(view.year, view.month);

  return (
    <div
      className={`inline-block overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--background)] ${className}`}
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={() => {
              const m = view.month - 1;
              setView(
                m < 0
                  ? { year: view.year - 1, month: 11 }
                  : { ...view, month: m },
              );
            }}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent bg-transparent text-[var(--fg-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
          >
            <Icon name="chevron-left" size={14} />
          </button>
          <div
            className="text-[14px] font-semibold"
            style={{ letterSpacing: "-0.005em" }}
          >
            {MONTHS[view.month]} {view.year}
          </div>
          <button
            onClick={() => {
              const m = view.month + 1;
              setView(
                m > 11
                  ? { year: view.year + 1, month: 0 }
                  : { ...view, month: m },
              );
            }}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent bg-transparent text-[var(--fg-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
          >
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: "repeat(7, 36px)" }}
        >
          {DOW.map((d) => (
            <div
              key={d}
              className="py-1.5 text-center text-[11px] font-medium text-[var(--foreground-subtle)] uppercase"
              style={{ letterSpacing: "0.04em" }}
            >
              {d}
            </div>
          ))}
          {cells.map((c, i) => {
            const isSel = sameDay(c.date, selected);
            const isToday = sameDay(c.date, today);
            return (
              <button
                key={i}
                onClick={() => onChange?.(c.date)}
                className={`font-inherit relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[3px] border-none text-[13px] transition-[background,color] duration-100 hover:bg-[var(--surface-alt)] ${c.outside ? "text-[var(--border-strong)]" : "text-[var(--foreground)]"} ${isSel ? "z-[1] bg-[var(--blue)] text-[var(--primary-foreground)]" : ""} ${isToday && !isSel ? "font-semibold" : ""}`}
              >
                {c.date.getDate()}
                {isToday && !isSel && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--blue)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { CalendarProps };
