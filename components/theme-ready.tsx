"use client";

import { useEffect } from "react";

export function ThemeReady() {
  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
  }, []);
  return null;
}
