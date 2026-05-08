"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  className = "",
  disabled = false,
  size = "md",
}: RatingProps) {
  const sizes = {
    sm: 14,
    md: 20,
    lg: 26,
  };

  const iconSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, i) => {
        const rating = i + 1;
        const filled = rating <= value;

        return (
          <motion.button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange?.(rating)}
            className={cn(
              "relative cursor-pointer rounded-[3px] p-0.5",
              disabled && "cursor-not-allowed",
            )}
            whileHover={!disabled ? { scale: 1.1 } : undefined}
            whileTap={!disabled ? { scale: 0.9 } : undefined}
          >
            <motion.div
              animate={{
                scale: filled ? 1 : 0.85,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Icon
                name={filled ? "star-filled" : "star"}
                size={iconSize}
                className={cn(
                  "block transition-colors duration-150",
                  filled
                    ? "text-[var(--amber)]"
                    : "text-[var(--border-strong)]",
                )}
              />
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

export type { RatingProps };
