"use client";

import { forwardRef } from "react";
import { Button as ButtonPrimitive } from "@base-ui-components/react/button";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "destructive-outline"
  | "ghost"
  | "link"
  | "warning"
  | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--blue)] text-[var(--primary-foreground)] border-[var(--blue)] hover:bg-[var(--blue-hover)] hover:border-[var(--blue-hover)] active:bg-[var(--blue-active)]",
  secondary:
    "bg-[var(--background)] text-[var(--foreground)] border-[var(--border-strong)] hover:bg-[var(--surface-alt)] active:bg-[var(--surface-hover)]",
  destructive:
    "bg-[var(--background)] text-[var(--destructive)] border-[var(--border-strong)] hover:bg-[var(--destructive)] hover:text-[var(--destructive-foreground)] hover:border-[var(--destructive)]",
  "destructive-outline":
    "bg-transparent text-[var(--destructive)] border-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-[var(--destructive-foreground)]",
  ghost:
    "bg-transparent text-[var(--foreground)] border-transparent hover:bg-[var(--surface-alt)]",
  link: "bg-transparent text-[var(--blue)] border-none px-1 py-0.5 text-[13px] font-medium inline hover:text-[var(--blue-hover)]",
  warning:
    "bg-[var(--amber-soft)] text-[var(--amber)] border-[var(--amber-soft-border)] hover:bg-[var(--amber)] hover:text-[var(--warning-foreground)] hover:border-[var(--amber)]",
  success:
    "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green-soft-border)] hover:bg-[var(--green)] hover:text-[var(--success-foreground)] hover:border-[var(--green)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-14 px-8 text-[15px]",
  lg: "h-16 px-10 text-[16px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      disabled,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        ref={ref}
        disabled={disabled || loading}
        data-loading={loading || undefined}
        className={`inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-[3px] border font-medium tracking-tight whitespace-nowrap transition-all duration-300 select-none active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${loading ? "pointer-events-none relative !text-transparent" : ""} ${variant === "link" ? "btn-link" : ""} ${className}`}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="block h-[18px] w-[18px] animate-spin rounded-full border-2 border-[var(--primary-foreground)]/80 border-t-transparent" />
          </span>
        )}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "Button";

export type { ButtonProps, ButtonVariant, ButtonSize };
