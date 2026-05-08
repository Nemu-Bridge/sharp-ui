"use client";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-3 text-[14px] text-[var(--foreground)] select-none ${disabled ? "cursor-not-allowed text-[var(--foreground-subtle)]" : ""} ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer hidden"
        {...props}
      />
      <span
        className={`inline-flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-[var(--border-strong)] bg-[var(--background)] transition-[background-color,border-color] duration-300 peer-checked:border-[var(--blue)] peer-checked:bg-[var(--blue)] ${!disabled ? "peer-hover:border-[var(--muted-foreground)]" : ""} peer-disabled:border-[var(--border)] peer-disabled:bg-[var(--surface-alt)] peer-disabled:peer-checked:border-[var(--border-strong)] peer-disabled:peer-checked:bg-[var(--border-strong)]`}
      >
        {checked && (
          <span className="h-[6px] w-[10px] rotate-[-45deg] border-b-2 border-l-2 border-[var(--primary-foreground)]" />
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

export type { CheckboxProps };
