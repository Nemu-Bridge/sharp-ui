"use client";

interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export function Switch({
  label,
  checked,
  onChange,
  disabled,
  className = "",
  ...props
}: SwitchProps) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-3 text-[14px] select-none ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
        {...props}
      />
      <span
        className="relative h-[22px] w-10 flex-shrink-0 rounded-[3px] transition-colors duration-150"
        style={{ background: checked ? "var(--blue)" : "var(--border-strong)" }}
      >
        <span
          className="absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-[2px] bg-[var(--background)] transition-transform duration-[180ms]"
          style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
        />
      </span>
      {label && (
        <span
          className={
            disabled
              ? "text-[var(--foreground-subtle)]"
              : "text-[var(--foreground)]"
          }
        >
          {label}
        </span>
      )}
    </label>
  );
}

export type { SwitchProps };
