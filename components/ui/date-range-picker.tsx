"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@/components/ui/icon";

interface DateRangePickerProps {
  value?: [Date, Date];
  onChange?: (range: [Date, Date]) => void;
  className?: string;
  presets?: { id: string; label: string; getValue: () => [Date, Date] }[];
  children?: React.ReactNode;
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
const fmt = (d: Date) =>
  `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;

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

function CalendarPanel({
  year,
  month,
  range,
  onPick,
  today,
  className = "",
}: {
  year: number;
  month: number;
  range: [Date | null, Date | null];
  onPick: (d: Date) => void;
  today: Date;
  className?: string;
}) {
  const cells = buildMonth(year, month);
  const [start, end] = range;
  return (
    <div
      className={`border-r border-[var(--border)] p-6 last:border-r-0 ${className}`}
    >
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: "repeat(7, 36px)" }}
      >
        {DOW.map((d) => (
          <div
            key={d}
            className="py-1.5 text-center text-[11px] font-medium tracking-wider text-[var(--foreground-subtle)] uppercase"
          >
            {d}
          </div>
        ))}
        {cells.map((c, i) => {
          const isStart = start && sameDay(c.date, start);
          const isEnd = end && sameDay(c.date, end);
          const inRange = start && end && c.date >= start && c.date <= end;
          const isToday = sameDay(c.date, today);
          return (
            <button
              key={i}
              onClick={() => onPick(c.date)}
              className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[3px] border-none bg-transparent text-[13px] transition-[background,color] duration-100 hover:bg-[var(--surface-alt)]"
              style={{
                color: c.outside
                  ? "var(--border-strong)"
                  : isStart || isEnd
                    ? "white"
                    : "var(--foreground)",
                background:
                  isStart || isEnd
                    ? "var(--blue)"
                    : inRange
                      ? "var(--blue-soft)"
                      : "transparent",
                borderRadius: inRange && !isStart && !isEnd ? "0" : undefined,
                zIndex: isStart || isEnd ? 1 : undefined,
                fontWeight: isToday && !isStart && !isEnd ? 600 : undefined,
              }}
            >
              {c.date.getDate()}
              {isToday && !isStart && !isEnd && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--blue)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  className = "",
  presets = [],
  children,
}: DateRangePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [view, setView] = useState(() => {
    const d = value?.[0] || today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [draftStart, setDraftStart] = useState<Date | null>(value?.[0] || null);
  const [draftEnd, setDraftEnd] = useState<Date | null>(value?.[1] || null);

  const pick = (d: Date) => {
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(d);
      setDraftEnd(null);
    } else {
      if (d < draftStart) {
        setDraftEnd(draftStart);
        setDraftStart(d);
      } else {
        setDraftEnd(d);
      }
    }
  };
  const apply = () => {
    if (draftStart && draftEnd) {
      onChange?.([draftStart, draftEnd]);
      setOpen(false);
    }
  };
  const clear = () => {
    setDraftStart(null);
    setDraftEnd(null);
  };
  const next = {
    year: view.month === 11 ? view.year + 1 : view.year,
    month: (view.month + 1) % 12,
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-14 min-w-[320px] cursor-pointer items-center gap-3 rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)] px-4 text-[15px] transition-colors duration-150 hover:border-[var(--fg-muted)] ${open ? "border-[var(--blue)] shadow-[inset_0_0_0_1px_var(--blue)]" : ""}`}
      >
        <Icon
          name="calendar"
          size={18}
          className="text-[var(--foreground-subtle)]"
        />
        {value?.[0] ? (
          <>
            <span className="text-[var(--foreground)]">{fmt(value[0])}</span>
            <span className="mx-1 text-[var(--foreground-subtle)]">&rarr;</span>
            <span className="text-[var(--foreground)]">{fmt(value[1])}</span>
          </>
        ) : (
          <span className="text-[var(--foreground-subtle)]">
            Select date range
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[calc(100%+6px)] left-0 z-[100] overflow-hidden rounded-[3px] border border-[var(--border)] bg-[var(--background)]"
          >
            <div className="flex">
              <div className="flex w-[180px] flex-col gap-0.5 border-r border-[var(--border)] p-4">
                {presets.length > 0 ? (
                  presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        const range = p.getValue();
                        setDraftStart(range[0]);
                        setDraftEnd(range[1]);
                      }}
                      className="cursor-pointer rounded-[3px] border-none bg-transparent px-3 py-2.5 text-left text-[13px] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-alt)]"
                    >
                      {p.label}
                    </button>
                  ))
                ) : (
                  <>
                    {children}
                    {[
                      {
                        id: "today",
                        label: "Today",
                        getValue: () => {
                          const d = new Date();
                          return [d, d];
                        },
                      },
                      {
                        id: "yesterday",
                        label: "Yesterday",
                        getValue: () => {
                          const d = new Date();
                          d.setDate(d.getDate() - 1);
                          return [d, d];
                        },
                      },
                      {
                        id: "7d",
                        label: "Last 7 days",
                        getValue: () => {
                          const e = new Date();
                          const s = new Date();
                          s.setDate(s.getDate() - 6);
                          return [s, e];
                        },
                      },
                      {
                        id: "30d",
                        label: "Last 30 days",
                        getValue: () => {
                          const e = new Date();
                          const s = new Date();
                          s.setDate(s.getDate() - 29);
                          return [s, e];
                        },
                      },
                      {
                        id: "mtd",
                        label: "This month",
                        getValue: () => {
                          const e = new Date();
                          const s = new Date(e.getFullYear(), e.getMonth(), 1);
                          return [s, e];
                        },
                      },
                      {
                        id: "last-month",
                        label: "Last month",
                        getValue: () => {
                          const now = new Date();
                          const e = new Date(
                            now.getFullYear(),
                            now.getMonth(),
                            0,
                          );
                          const s = new Date(
                            e.getFullYear(),
                            e.getMonth() - 1,
                            1,
                          );
                          return [s, e];
                        },
                      },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          const range = p.getValue();
                          setDraftStart(range[0]);
                          setDraftEnd(range[1]);
                        }}
                        className="cursor-pointer rounded-[3px] border-none bg-transparent px-3 py-2.5 text-left text-[13px] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-alt)]"
                      >
                        {p.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
              <div>
                <div className="mb-5 flex items-center justify-between px-6 pt-6">
                  <button
                    onClick={() =>
                      setView((v) => {
                        const m = v.month - 1;
                        return m < 0
                          ? { year: v.year - 1, month: 11 }
                          : { ...v, month: m };
                      })
                    }
                    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent bg-transparent text-[var(--fg-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                  >
                    <Icon name="chevron-left" size={14} />
                  </button>
                  <div className="text-[14px] font-semibold tracking-tight text-[var(--foreground)]">
                    {MONTHS[view.month]} {view.year}
                  </div>
                  <button
                    onClick={() =>
                      setView((v) => {
                        const m = v.month + 1;
                        return m > 11
                          ? { year: v.year + 1, month: 0 }
                          : { ...v, month: m };
                      })
                    }
                    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent bg-transparent text-[var(--fg-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                  >
                    <Icon name="chevron-right" size={14} />
                  </button>
                </div>
                <CalendarPanel
                  year={view.year}
                  month={view.month}
                  range={[draftStart, draftEnd]}
                  onPick={pick}
                  today={today}
                />
              </div>
              <div>
                <div className="mb-5 flex items-center justify-between px-6 pt-6">
                  <div className="text-[14px] font-semibold tracking-tight text-[var(--foreground)]">
                    {MONTHS[next.month]} {next.year}
                  </div>
                  <button
                    onClick={() =>
                      setView((v) => {
                        const m = v.month + 1;
                        return m > 11
                          ? { year: v.year + 1, month: 0 }
                          : { ...v, month: m };
                      })
                    }
                    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-[3px] border border-transparent bg-transparent text-[var(--fg-muted)] hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                  >
                    <Icon name="chevron-right" size={14} />
                  </button>
                </div>
                <CalendarPanel
                  year={next.year}
                  month={next.month}
                  range={[draftStart, draftEnd]}
                  onPick={pick}
                  today={today}
                  className="border-0"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] bg-[var(--surface-alt)] px-6 py-4">
              <div className="text-[13px] text-[var(--foreground)]">
                {draftStart ? (
                  fmt(draftStart)
                ) : (
                  <span className="text-[var(--foreground-subtle)]">
                    Start date
                  </span>
                )}
                <span className="mx-2 text-[var(--foreground-subtle)]">
                  &rarr;
                </span>
                {draftEnd ? (
                  fmt(draftEnd)
                ) : (
                  <span className="text-[var(--foreground-subtle)]">
                    End date
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clear}
                  className="cursor-pointer rounded-[3px] border border-transparent bg-transparent px-4 py-2 text-[14px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  Clear
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-[3px] border border-[var(--border-strong)] bg-transparent px-4 py-2 text-[14px] font-medium text-[var(--fg-muted)] transition-colors hover:bg-[var(--surface-alt)]"
                >
                  Cancel
                </button>
                <button
                  onClick={apply}
                  disabled={!draftStart || !draftEnd}
                  className="cursor-pointer rounded-[3px] border border-[var(--blue)] bg-[var(--blue)] px-4 py-2 text-[14px] font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--blue-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { DateRangePickerProps };

export interface DateRangePickerPreset {
  id: string;
  label: string;
  getValue: () => [Date, Date];
}
