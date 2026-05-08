"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import type { ThemeRegistrationRaw } from "shiki";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/icon";
import { motion } from "motion/react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const sharpLightTheme: ThemeRegistrationRaw = {
  name: "sharp-ui-light",
  type: "light",
  fg: "#0f172a",
  bg: "#f8fafc",
  colors: {
    "editor.background": "#f8fafc",
    "editor.foreground": "#0f172a",
    "editorLineNumber.foreground": "#64748b",
    "editor.selectionBackground": "#eff4ff",
    "editor.selectionHighlightBackground": "#eff4ff",
  },
  settings: [
    {
      settings: {
        foreground: "#0f172a",
        background: "#f8fafc",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#64748b", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.template"],
      settings: { foreground: "#16a34a" },
    },
    {
      scope: ["keyword", "storage", "storage.type"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#7c3aed" },
    },
    {
      scope: [
        "constant",
        "constant.language",
        "constant.numeric",
        "support.constant",
      ],
      settings: { foreground: "#d97706" },
    },
    {
      scope: ["variable", "identifier"],
      settings: { foreground: "#0f172a" },
    },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class"],
      settings: { foreground: "#dc2626" },
    },
    {
      scope: ["tag", "entity.name.tag"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "#64748b" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold", foreground: "#0f172a" },
    },
    {
      scope: ["meta.tag", "meta.jsx.children", "meta.jsx.tag-group"],
      settings: { foreground: "#0f172a" },
    },
  ],
};

const sharpDarkTheme: ThemeRegistrationRaw = {
  name: "sharp-ui-dark",
  type: "dark",
  fg: "#ecedee",
  bg: "#16181c",
  colors: {
    "editor.background": "#16181c",
    "editor.foreground": "#ecedee",
    "editorLineNumber.foreground": "#6f7378",
    "editor.selectionBackground": "#0f1a33",
    "editor.selectionHighlightBackground": "#0f1a33",
  },
  settings: [
    {
      settings: {
        foreground: "#ecedee",
        background: "#16181c",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#6f7378", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.template"],
      settings: { foreground: "#4ade80" },
    },
    {
      scope: ["keyword", "storage", "storage.type"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#a78bfa" },
    },
    {
      scope: [
        "constant",
        "constant.language",
        "constant.numeric",
        "support.constant",
      ],
      settings: { foreground: "#fbbf24" },
    },
    {
      scope: ["variable", "identifier"],
      settings: { foreground: "#ecedee" },
    },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class"],
      settings: { foreground: "#f87171" },
    },
    {
      scope: ["tag", "entity.name.tag"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "#6f7378" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold", foreground: "#ecedee" },
    },
    {
      scope: ["meta.tag", "meta.jsx.children", "meta.jsx.tag-group"],
      settings: { foreground: "#ecedee" },
    },
  ],
};

const lang = "tsx";

export function CodeBlock({ code }: CodeBlockProps) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    codeToHtml(code, {
      lang: "tsx",
      theme: resolvedTheme === "dark" ? sharpDarkTheme : sharpLightTheme,
    }).then((result) => {
      if (!cancelled) {
        setHtml(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground-subtle)]">
          tsx
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-[3px] px-2 py-1 text-[11px] text-[var(--foreground-subtle)] opacity-0 transition-all group-hover:opacity-100 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        >
          <Icon name={copied ? "check" : "copy"} size={12} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div
        className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_.shiki]:min-w-full [&_.shiki_pre]:!bg-transparent [&_.shiki_pre]:m-0 [&_.shiki_pre]:font-mono [&_.shiki_pre]:text-[13px] [&_.shiki_pre]:leading-relaxed [&_.shiki_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  );
}
