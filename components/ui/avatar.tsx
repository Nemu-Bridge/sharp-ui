"use client";

import { cn } from "@/lib/cn";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-8 h-8 text-[11px]",
  md: "w-10 h-10 text-[13px]",
  lg: "w-14 h-14 text-[16px]",
};

export function Avatar({ initials, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] font-semibold text-[var(--foreground)]",
        sizes[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}

interface AvatarStackProps {
  avatars: { initials: string }[];
  max?: number;
  className?: string;
}

export function AvatarStack({ avatars, max, className }: AvatarStackProps) {
  const visible = max ? avatars.slice(0, max) : avatars;
  const remaining = max ? Math.max(0, avatars.length - max) : 0;

  return (
    <div className={cn("inline-flex", className)}>
      {visible.map((a, i) => (
        <div
          key={i}
          className="shadow-[0_0_0_2px_var(--background)]"
          style={{ marginLeft: i === 0 ? 0 : -8 }}
        >
          <Avatar initials={a.initials} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className="shadow-[0_0_0_2px_var(--background)]"
          style={{ marginLeft: -8 }}
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] text-[13px] font-semibold text-[var(--foreground)]">
            +{remaining}
          </div>
        </div>
      )}
    </div>
  );
}

export type { AvatarProps, AvatarStackProps };
