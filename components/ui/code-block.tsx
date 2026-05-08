"use client";

import { useState, useEffect, useCallback } from "react";
import { codeToHtml } from "shiki";
import type { BundledLanguage, ThemeRegistrationRaw } from "shiki";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type { BundledLanguage as CodeLang };

const sharpLightTheme: ThemeRegistrationRaw = {
  name: "sharp-ui-light",
  type: "light",
  fg: "#0f172a",
  bg: "#f8fafc",
  colors: {
    "editor.background": "#f8fafc",
    "editor.foreground": "#0f172a",
    "editorLineNumber.foreground": "#94a3b8",
    "editor.selectionBackground": "#eff4ff",
    "editor.selectionHighlightBackground": "#eff4ff80",
  },
  settings: [
    { settings: { foreground: "#0f172a", background: "#f8fafc" } },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#94a3b8", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.template", "string.quoted"],
      settings: { foreground: "#16a34a" },
    },
    {
      scope: ["string.regexp", "constant.regexp"],
      settings: { foreground: "#dc2626" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.other",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#005bff" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "support.function.dom",
      ],
      settings: { foreground: "#7c3aed" },
    },
    {
      scope: [
        "constant",
        "constant.language",
        "constant.numeric",
        "constant.other",
        "support.constant",
        "variable.other.constant",
      ],
      settings: { foreground: "#d97706" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "entity.other.inherited-class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#dc2626" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#7c3aed" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#0f172a" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "#64748b" },
    },
    {
      scope: ["operator", "keyword.operator"],
      settings: { foreground: "#475569" },
    },
    {
      scope: ["meta.import", "keyword.control.import", "keyword.control.from"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["support.type.property-name", "entity.name.tag.css"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["support.type.primitive", "support.type.builtin"],
      settings: { foreground: "#005bff" },
    },
    {
      scope: ["markup.heading"],
      settings: { foreground: "#005bff", fontStyle: "bold" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold", foreground: "#0f172a" },
    },
    {
      scope: ["markup.italic"],
      settings: { fontStyle: "italic" },
    },
    {
      scope: ["markup.inline.raw", "markup.fenced_code.block"],
      settings: { foreground: "#dc2626" },
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
    "editor.selectionHighlightBackground": "#0f1a3380",
  },
  settings: [
    { settings: { foreground: "#ecedee", background: "#16181c" } },
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: { foreground: "#6f7378", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.template", "string.quoted"],
      settings: { foreground: "#4ade80" },
    },
    {
      scope: ["string.regexp", "constant.regexp"],
      settings: { foreground: "#f87171" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.other",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "support.function.dom",
      ],
      settings: { foreground: "#a78bfa" },
    },
    {
      scope: [
        "constant",
        "constant.language",
        "constant.numeric",
        "constant.other",
        "support.constant",
        "variable.other.constant",
      ],
      settings: { foreground: "#fbbf24" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "entity.other.inherited-class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#f87171" },
    },
    {
      scope: ["entity.name.tag", "meta.tag"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#a78bfa" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#ecedee" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "#9ba1a6" },
    },
    {
      scope: ["operator", "keyword.operator"],
      settings: { foreground: "#9ba1a6" },
    },
    {
      scope: ["meta.import", "keyword.control.import", "keyword.control.from"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["support.type.property-name", "entity.name.tag.css"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["support.type.primitive", "support.type.builtin"],
      settings: { foreground: "#4f8cff" },
    },
    {
      scope: ["markup.heading"],
      settings: { foreground: "#4f8cff", fontStyle: "bold" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold", foreground: "#ecedee" },
    },
    {
      scope: ["markup.italic"],
      settings: { fontStyle: "italic" },
    },
    {
      scope: ["markup.inline.raw", "markup.fenced_code.block"],
      settings: { foreground: "#f87171" },
    },
  ],
};

const LANGUAGES: { value: BundledLanguage; label: string }[] = [
  { value: "tsx", label: "TSX" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "jsx", label: "JSX" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "toml", label: "TOML" },
  { value: "markdown", label: "Markdown" },
  { value: "mdx", label: "MDX" },
  { value: "python", label: "Python" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "scala", label: "Scala" },
  { value: "elixir", label: "Elixir" },
  { value: "haskell", label: "Haskell" },
  { value: "lua", label: "Lua" },
  { value: "r", label: "R" },
  { value: "bash", label: "Bash" },
  { value: "sh", label: "Shell" },
  { value: "powershell", label: "PowerShell" },
  { value: "sql", label: "SQL" },
  { value: "graphql", label: "GraphQL" },
  { value: "prisma", label: "Prisma" },
  { value: "docker", label: "Dockerfile" },
  { value: "xml", label: "XML" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "astro", label: "Astro" },
  { value: "glsl", label: "GLSL" },
  { value: "wgsl", label: "WGSL" },
  { value: "ini", label: "INI" },
  { value: "diff", label: "Diff" },
  { value: "nginx", label: "Nginx" },
  { value: "http", label: "HTTP" },
  { value: "proto", label: "Protobuf" },
  { value: "regex", label: "Regex" },
  { value: "terraform", label: "Terraform" },
  { value: "mermaid", label: "Mermaid" },
];

function useResolvedTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const get = (): "light" | "dark" =>
      document.documentElement.classList.contains("dark") ? "dark" : "light";

    setTheme(get());

    const observer = new MutationObserver(() => setTheme(get()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
  filename?: string;
  showLanguageSelector?: boolean;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  lang: langProp = "tsx",
  filename,
  showLanguageSelector = false,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const resolvedTheme = useResolvedTheme();
  const [lang, setLang] = useState<BundledLanguage>(langProp);
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setLang(langProp), [langProp]);

  const highlight = useCallback(
    async (cancelled: { current: boolean }) => {
      const theme = resolvedTheme === "dark" ? sharpDarkTheme : sharpLightTheme;
      const result = await codeToHtml(code, { lang, theme });
      if (!cancelled.current) setHtml(result);
    },
    [code, lang, resolvedTheme],
  );

  useEffect(() => {
    const cancelled = { current: false };
    highlight(cancelled);
    return () => {
      cancelled.current = true;
    };
  }, [highlight]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayLabel =
    LANGUAGES.find((l) => l.value === lang)?.label ?? lang.toUpperCase();

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-[3px] border border-[var(--border)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-3 py-2">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono text-[11px] text-[var(--foreground-subtle)]">
              {filename}
            </span>
          ) : null}
          {showLanguageSelector ? (
            <Select
              value={lang}
              onValueChange={(v) => setLang(v as BundledLanguage)}
            >
              <SelectTrigger className="h-6 min-w-0 gap-1.5 rounded-[2px] border-[var(--border)] bg-[var(--surface-alt)] px-2 py-0 pr-5 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--foreground-subtle)] hover:border-[var(--border-strong)]">
                <span>{displayLabel}</span>
              </SelectTrigger>
              <SelectContent className="max-h-[220px] min-w-[120px]">
                {LANGUAGES.map((l) => (
                  <SelectItem
                    key={l.value}
                    value={l.value}
                    className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em]"
                  >
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--foreground-subtle)]">
              {displayLabel}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-[2px] px-2 py-1 font-mono text-[11px] text-[var(--foreground-subtle)] opacity-0 transition-all group-hover:opacity-100 hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
        >
          <Icon name={copied ? "check" : "copy"} size={12} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {showLineNumbers && (
        <style>{`
          .sharp-cb-ln code { counter-reset: line; }
          .sharp-cb-ln .line { display: block; padding-left: 3rem; position: relative; }
          .sharp-cb-ln .line::before {
            counter-increment: line;
            content: counter(line);
            position: absolute;
            left: 0;
            width: 2.25rem;
            text-align: right;
            color: var(--foreground-subtle);
            user-select: none;
            font-size: 12px;
            padding-right: 0.75rem;
          }
        `}</style>
      )}
      <div
        className={cn(
          "overflow-x-auto bg-[var(--surface-alt)] p-4 text-[13px] leading-relaxed",
          "[&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:font-[var(--font-mono,monospace)] [&_pre]:text-[13px] [&_pre]:leading-relaxed",
          "[&_code]:font-[var(--font-mono,monospace)]",
          showLineNumbers && "sharp-cb-ln",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
