"use client";

import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog";
import { cn } from "@/lib/cn";
import React from "react";
import { Icon } from "@/components/ui/icon";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose?.();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[1000] animate-[overlay-show_0.22s_ease_both] bg-[var(--modal-overlay)] data-[ending-style]:animate-[overlay-hide_0.2s_ease_both]" />
        <DialogPrimitive.Popup className="fixed inset-0 z-[1000] flex animate-[content-show_0.28s_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-center p-6 outline-none data-[ending-style]:animate-[content-hide_0.2s_ease_both]">
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({
  children,
  className = "",
}: DialogContentProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[520px] overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--background)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface DialogCloseProps {
  className?: string;
}

export function DialogClose({ className = "" }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      className={cn(
        "absolute top-4 right-4 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-[3px] border-none bg-transparent text-[var(--foreground-subtle)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]",
        className,
      )}
    >
      <Icon name="x" size={16} />
    </DialogPrimitive.Close>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return <div className={cn("px-8 pt-8", className)}>{children}</div>;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return (
    <h3
      className={cn(
        "m-0 mb-2 text-[20px] font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({
  children,
  className = "",
}: DialogDescriptionProps) {
  return (
    <p
      className={cn(
        "m-0 text-[14px] leading-relaxed text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogBody({ children, className = "" }: DialogBodyProps) {
  return (
    <div
      className={cn(
        "px-8 py-6 text-[14px] leading-relaxed text-[var(--foreground)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex justify-end gap-3 border-t border-[var(--border)] bg-[var(--surface-alt)] px-8 py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type { DialogProps };
