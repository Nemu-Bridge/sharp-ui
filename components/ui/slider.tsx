"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  className,
}: SliderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [local, setLocal] = useState(value);
  useEffect(() => {
    setLocal(value);
  }, [value]);

  const update = useCallback(
    (clientX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setLocal(Math.round(min + pct * (max - min)));
    },
    [min, max],
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const up = () => {
      if (dragging.current) {
        dragging.current = false;
        onChange?.(local);
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [local, onChange, update]);

  const pct = ((local - min) / (max - min)) * 100;

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-1.5 w-full cursor-pointer rounded-[2px] bg-[var(--muted)]",
        className,
      )}
      onMouseDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
    >
      <div
        className="absolute h-full rounded-[2px] bg-[var(--primary)]"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 h-[18px] w-[18px] cursor-grab rounded-[2px] border-2 border-[var(--primary)] bg-[var(--background)] active:cursor-grabbing"
        style={{ left: `${pct}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

export type { SliderProps };
