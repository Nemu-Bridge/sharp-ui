"use client";

import { useState, useId, forwardRef } from "react";
import { Icon } from "@/components/ui/icon";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label: string;
  error?: string;
  help?: string;
  multiline?: boolean;
  rows?: number;
  iconRight?: React.ReactNode;
  onIconClick?: () => void;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      type = "text",
      value,
      error,
      disabled,
      help,
      multiline,
      rows = 4,
      iconRight,
      onIconClick,
      className = "",
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const effectiveType = isPassword ? (show ? "text" : "password") : type;
    const borderColor = error ? "var(--red)" : "var(--border-strong)";

    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full">
          {multiline ? (
            <textarea
              id={id}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value as string}
              disabled={disabled}
              rows={rows}
              placeholder=""
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              className="peer block min-h-[140px] w-full resize-y rounded-[3px] border bg-[var(--background)] px-4 py-4 text-[15px] leading-relaxed text-[var(--foreground)] placeholder-transparent transition-[border-color,box-shadow] duration-150 outline-none disabled:cursor-not-allowed disabled:bg-[var(--surface-alt)] disabled:text-[var(--foreground-subtle)]"
              style={{ borderColor, boxShadow: "none" }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "var(--red)"
                  : "var(--border-focus)";
                e.currentTarget.style.boxShadow = error
                  ? "0 0 0 1px var(--red)"
                  : "0 0 0 1px var(--border-focus)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          ) : (
            <input
              id={id}
              ref={ref as React.Ref<HTMLInputElement>}
              type={effectiveType}
              value={value as string}
              disabled={disabled}
              placeholder=""
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
              className={`peer block h-14 w-full rounded-[3px] border bg-[var(--background)] px-4 text-[15px] text-[var(--foreground)] placeholder-transparent transition-[border-color,box-shadow] duration-150 outline-none disabled:cursor-not-allowed disabled:bg-[var(--surface-alt)] disabled:text-[var(--foreground-subtle)] ${iconRight || isPassword ? "pr-11" : ""}`}
              style={{ borderColor, boxShadow: "none" }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = error
                  ? "var(--red)"
                  : "var(--border-focus)";
                e.currentTarget.style.boxShadow = error
                  ? "0 0 0 1px var(--red)"
                  : "0 0 0 1px var(--border-focus)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = borderColor;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          )}
          <label
            htmlFor={id}
            className={`pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 px-1 text-[15px] leading-none text-[var(--foreground-subtle)] transition-all duration-[160ms] ease-out peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-[var(--background)] peer-focus:text-[11px] peer-focus:font-medium peer-focus:tracking-[0.06em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-[var(--background)] peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:tracking-[0.06em] peer-[:not(:placeholder-shown)]:uppercase ${multiline ? "top-[24px] -translate-y-0 peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0" : ""} ${error ? "!text-[var(--red)]" : "peer-focus:!text-[var(--border-focus)] peer-[:not(:focus):not(:placeholder-shown)]:text-[var(--muted-foreground)]"}`}
          >
            {label}
          </label>
          {(iconRight || isPassword) && !multiline && (
            <button
              type="button"
              className="absolute top-1/2 right-3 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent p-1 text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
              onClick={isPassword ? () => setShow((s) => !s) : onIconClick}
              tabIndex={-1}
            >
              {iconRight ||
                (show ? (
                  <Icon name="eye" size={18} />
                ) : (
                  <Icon name="lock" size={18} />
                ))}
            </button>
          )}
        </div>
        {(help || error) && (
          <div
            className={`mt-2 text-xs tracking-wide ${error ? "text-[var(--red)]" : "text-[var(--foreground-subtle)]"}`}
          >
            {error || help}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export type { InputProps };
