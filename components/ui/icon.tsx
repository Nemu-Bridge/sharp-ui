"use client";

import { cn } from "@/lib/cn";
import React from "react";
import * as icons from "@tabler/icons-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 20, className, style }: IconProps) {
  const pascalName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const iconKey = `Icon${pascalName}` as keyof typeof icons;
  const IconComponent = icons[iconKey] as React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComponent size={size} className={cn(className)} style={style} />;
}

export type { IconProps };
export { icons };
