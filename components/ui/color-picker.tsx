"use client";

import { useState } from "react";

interface ColorPickerProps {
  hue?: number;
  saturation?: number;
  lightness?: number;
  onChange?: (h: number, s: number, l: number) => void;
  className?: string;
}

export function ColorPicker({
  hue: initH = 216,
  saturation: initS = 100,
  lightness: initL = 50,
  onChange,
  className = "",
}: ColorPickerProps) {
  const [hue] = useState(initH);
  const [sat, setSat] = useState(initS);
  const [lit, setLit] = useState(initL);
  const update = (h: number, s: number, l: number) => onChange?.(h, s, l);

  const hex = `hsl(${hue}, ${sat}%, ${lit}%)`;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div
          className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-[var(--border)]"
          style={{ background: hex }}
        />
        <div className="flex flex-1 flex-col gap-1.5">
          <div>
            <div className="mb-0.5 flex justify-between text-[12px] text-[var(--muted-foreground)]">
              <span>Saturation</span>
              <span className="text-xs tracking-wide">{sat}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sat}
              onChange={(e) => {
                const v = +e.target.value;
                setSat(v);
                update(hue, v, lit);
              }}
              className="h-3.5 w-full cursor-pointer appearance-none rounded-[2px] border border-[var(--border)] outline-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--foreground)] [&::-webkit-slider-thumb]:bg-[var(--background)]"
              style={{
                background: `linear-gradient(to right, hsl(${hue} 0% ${lit}%), hsl(${hue} 100% ${lit}%))`,
              }}
            />
          </div>
          <div>
            <div className="mb-0.5 flex justify-between text-[12px] text-[var(--muted-foreground)]">
              <span>Lightness</span>
              <span className="text-xs tracking-wide">{lit}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              value={lit}
              onChange={(e) => {
                const v = +e.target.value;
                setLit(v);
                update(hue, sat, v);
              }}
              className="h-3.5 w-full cursor-pointer appearance-none rounded-[2px] border border-[var(--border)] outline-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--foreground)] [&::-webkit-slider-thumb]:bg-[var(--background)]"
              style={{
                background: `linear-gradient(to right, hsl(${hue} ${sat}% 5%), hsl(${hue} ${sat}% 95%))`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="rounded-[2px] border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 text-center text-xs tracking-wide text-[var(--foreground)]">
        {hex}
      </div>
    </div>
  );
}

export type { ColorPickerProps };
