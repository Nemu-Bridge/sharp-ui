"use client";

import React from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface StepperProps {
  children?: React.ReactNode;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export function Stepper({
  children,
  currentStep = 0,
  onStepChange,
  className,
}: StepperProps) {
  const steps = React.Children.toArray(children) as React.ReactElement[];
  return (
    <div className={cn("flex items-start gap-0", className)}>
      {steps.map((step, i) => {
        const stepProps = step.props as StepperStepProps;
        const state =
          i < currentStep ? "done" : i === currentStep ? "current" : "todo";
        return (
          <div key={i} className="relative flex flex-1 flex-col items-center">
            <div
              className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-all duration-200"
              onClick={() => onStepChange?.(i)}
              style={
                state === "current"
                  ? {
                      borderColor: "var(--primary)",
                      color: "var(--primary)",
                      boxShadow:
                        "0 0 0 3px var(--blue-soft-border), 0 0 14px 3px var(--blue-soft-border)",
                      background: "var(--background)",
                    }
                  : state === "done"
                    ? {
                        background: "var(--primary)",
                        borderColor: "var(--primary)",
                        color: "white",
                      }
                    : {
                        borderColor: "var(--input)",
                        color: "var(--muted-foreground)",
                        background: "var(--background)",
                      }
              }
            >
              {state === "done" ? (
                <Icon
                  name="check"
                  size={14}
                  className="text-[var(--primary-foreground)]"
                />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div
              className="mt-2 text-[13px]"
              style={{
                color:
                  state === "todo"
                    ? "var(--muted-foreground)"
                    : "var(--foreground)",
                fontWeight: state === "current" ? 500 : 400,
              }}
            >
              {stepProps.label}
            </div>
            {i < steps.length - 1 && (
              <div
                className="absolute top-4 left-1/2 -z-0 h-[3px] w-full"
                style={{
                  background:
                    i < currentStep ? "var(--primary)" : "var(--input)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface StepperStepProps {
  label: string;
  className?: string;
}

export function StepperStep({ label, className = "" }: StepperStepProps) {
  return <div className={className}>{label}</div>;
}

export type { StepperProps, StepperStepProps };
