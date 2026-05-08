"use client";

import * as React from "react";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { CopyCodeButton } from "@/components/copy-code-button";
import { ComponentPreview } from "@/components/previews";
import { DocumentationDrawer } from "@/components/documentation-drawer";
import { getComponentDocs } from "@/lib/component-docs";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import registry from "@/registry.json";

const PKG_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const;
type PkgManager = (typeof PKG_MANAGERS)[number];

function getPkgPrefix(pm: PkgManager): string {
  if (pm === "bun") return "bunx shadcn@latest add";
  if (pm === "pnpm") return "pnpm dlx shadcn@latest add";
  if (pm === "yarn") return "yarn dlx shadcn@latest add";
  return "npx shadcn@latest add";
}

const PkgManagerContext = createContext<{
  manager: PkgManager;
  setManager: (m: PkgManager) => void;
}>({ manager: "bun", setManager: () => {} });

function usePkgManager() {
  return useContext(PkgManagerContext);
}

function PkgManagerProvider({ children }: { children: React.ReactNode }) {
  const [manager, setManagerState] = useState<PkgManager>(() => {
    const stored = localStorage.getItem(
      "sharp-pkg-manager",
    ) as PkgManager | null;
    if (stored && PKG_MANAGERS.includes(stored)) return stored;
    return "bun";
  });

  const setManager = useCallback((m: PkgManager) => {
    setManagerState(m);
    localStorage.setItem("sharp-pkg-manager", m);
  }, []);

  return (
    <PkgManagerContext.Provider value={{ manager, setManager }}>
      {children}
    </PkgManagerContext.Provider>
  );
}

function PackageManagerSwitcher() {
  const { manager, setManager } = usePkgManager();
  return (
    <div className="flex items-center rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)] p-0.5">
      {PKG_MANAGERS.map((pm) => (
        <button
          key={pm}
          onClick={() => setManager(pm)}
          className={`rounded-[2px] px-2.5 py-1 font-mono text-[11px] transition-colors ${
            manager === pm
              ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
          }`}
        >
          {pm}
        </button>
      ))}
    </div>
  );
}

const HIDDEN = new Set([
  "icon",
  "sharp-ui-styles",
  "utils",
  "stat-card",
  "toast",
]);

const USAGE_EXAMPLES: Record<string, string> = {
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion defaultOpen={["a"]}>
  <AccordionItem value="a">
    <AccordionTrigger>What is Sharp UI?</AccordionTrigger>
    <AccordionContent>A sharp-edged component registry.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>A new region is available.</AlertDescription>
</Alert>`,
  avatar: `import { Avatar, AvatarStack } from "@/components/ui/avatar";

<Avatar initials="JM" />
<AvatarStack avatars={[{ initials: "JM" }, { initials: "RA" }]} max={3} />`,
  badge: `import { Badge } from "@/components/ui/badge";

<Badge variant="primary">Active</Badge>
<Badge variant="success" dot>Online</Badge>`,
  "code-block": `import { CodeBlock } from "@/components/ui/code-block";

<CodeBlock
  code={yourCode}
  lang="typescript"
  filename="example.ts"
  showLanguageSelector
  showLineNumbers
/>`,
  button: `import { Button } from "@/components/ui/button";

<Button>Deploy</Button>
<Button variant="destructive">Delete</Button>`,
  checkbox: `import { Checkbox } from "@/components/ui/checkbox";

<Checkbox label="Email notifications" />`,
  dialog: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from "@/components/ui/dialog";

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogContent>
    <DialogHeader><DialogTitle>Confirm</DialogTitle></DialogHeader>
    <DialogBody><p>Are you sure?</p></DialogBody>
    <DialogFooter><Button>Confirm</Button></DialogFooter>
  </DialogContent>
</Dialog>`,
  input: `import { Input } from "@/components/ui/input";

<Input label="Email" placeholder="john@example.com" />`,
  select: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="nyc1">New York</SelectItem>
  </SelectContent>
</Select>`,
  switch: `import { Switch } from "@/components/ui/switch";

<Switch label="Two-factor auth" />`,
  rating: `import { Rating } from "@/components/ui/rating";

<Rating value={4} onChange={setValue} />`,
  toggle: `import { Toggle } from "@/components/ui/toggle";

<Toggle pressed={pressed} onPressedChange={setPressed} label="Notifications" />`,
  "data-table": `import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<{ name: string; email: string }>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
];

<DataTable columns={columns} data={data} />`,
  "command-palette": `import { CommandPalette, CommandGroup, CommandItem } from "@/components/ui/command-palette";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <CommandPalette open={open} onClose={() => setOpen(false)}>
    <CommandGroup label="Actions">
      <CommandItem label="New file" shortcut={["N"]} />
      <CommandItem label="Search" shortcut={["S"]} />
    </CommandGroup>
  </CommandPalette>
</>`,
  "date-range-picker": `import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";

const [range, setRange] = useState<[Date, Date]>([new Date(), new Date()]);

<DateRangePicker value={range} onChange={setRange} />`,
  dropzone: `import { Dropzone } from "@/components/ui/dropzone";

<Dropzone maxSize={25} />`,
  frame: `import { Frame, FrameHeader, FrameTitle, FrameAction, FrameContent } from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

<Frame>
  <FrameHeader>
    <FrameTitle>Settings</FrameTitle>
    <FrameAction>
      <Button size="sm">Save</Button>
    </FrameAction>
  </FrameHeader>
  <FrameContent>
    <Switch label="Notifications" />
  </FrameContent>
</Frame>`,
  radio: `import { Radio } from "@/components/ui/radio";

<Radio name="plan" value="free" label="Free plan" />`,
  "switch-row": `import { SwitchRow } from "@/components/ui/switch-row";

<SwitchRow label="Notifications" checked onChange={() => {}} />`,
  chip: `import { Chip } from "@/components/ui/chip";

<Chip label="react" variant="info" onRemove={() => {}} />`,
  banner: `import { Banner, BannerTitle, BannerDescription, BannerAction } from "@/components/ui/banner";

<Banner>
  <BannerTitle>Update available</BannerTitle>
  <BannerDescription>A new version is ready.</BannerDescription>
  <BannerAction><Button>Update</Button></BannerAction>
</Banner>`,
};

function getUsageCode(name: string): string {
  if (USAGE_EXAMPLES[name]) return USAGE_EXAMPLES[name];
  const componentName = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return `import { ${componentName} } from "@/components/ui/${name}";\n\n<${componentName} />`;
}

const uiItems = registry.items.filter(
  (item) => item.type === "registry:ui" && !HIDDEN.has(item.name),
);

function CopyCommand({ name }: { name: string }) {
  const { manager } = usePkgManager();
  const cmd = `${getPkgPrefix(manager)} ${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}`;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex w-full cursor-pointer items-center gap-2 rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 text-left font-mono text-[11px] text-[var(--foreground-subtle)] transition-colors hover:border-[var(--foreground)]"
    >
      <span className="truncate">{cmd}</span>
      {copied ? (
        <Icon
          name="check"
          size={12}
          className="flex-shrink-0 text-[var(--success)]"
        />
      ) : (
        <Icon name="copy" size={12} className="flex-shrink-0" />
      )}
    </button>
  );
}

function ItemCard({
  item,
  onDocsClick,
}: {
  item: (typeof registry.items)[0];
  onDocsClick: (item: (typeof registry.items)[0]) => void;
}) {
  const { manager } = usePkgManager();
  const usage = getUsageCode(item.name);

  return (
    <div className="flex flex-col overflow-hidden rounded-[3px] border border-[var(--border)] transition-colors duration-150 hover:border-[var(--border-strong)]">
      <div className="flex min-h-[240px] flex-1 items-center justify-center border-b border-[var(--border)] bg-[var(--background)]/30 p-6">
        <ComponentPreview name={item.name} />
      </div>
      <div className="flex w-full flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-[13px] font-medium text-[var(--foreground)]">
              {item.title ?? item.name}
            </p>
            {"dependencies" in item &&
              item.dependencies &&
              item.dependencies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="rounded-[3px] border border-[var(--blue-soft-border)] bg-[var(--blue-soft)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--blue)]"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              )}
          </div>

          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onDocsClick(item)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground-subtle)] transition-colors duration-150 hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                >
                  <Icon name="book" size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Documentation</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <CopyCodeButton
                  name={item.name}
                  usage={usage}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground-subtle)] transition-colors duration-150 hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                />
              </TooltipTrigger>
              <TooltipContent>Copy code</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    const cmd = `${getPkgPrefix(manager)} ${process.env.NEXT_PUBLIC_BASE_URL}/r/${item.name}`;
                    navigator.clipboard.writeText(cmd);
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground-subtle)] transition-colors duration-150 hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                >
                  <Icon name="terminal" size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy install command</TooltipContent>
            </Tooltip>
          </div>
        </div>
        {item.description && (
          <p className="text-[12px] leading-relaxed text-[var(--muted-foreground)]">
            {item.description}
          </p>
        )}
        <div className="mt-1">
          <CopyCommand name={item.name} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-subtle)]">
        {label}
      </h2>
      <span className="font-mono text-[11px] text-[var(--foreground-subtle)]">
        {count}
      </span>
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="no-theme-transition relative inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground-subtle)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Icon name={isDark ? "moon" : "sun"} size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function HomeContent() {
  const { manager } = usePkgManager();
  const [search, setSearch] = useState("");
  const [docsItem, setDocsItem] = useState<(typeof registry.items)[0] | null>(
    null,
  );

  const filteredItems = uiItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(search.toLowerCase())),
  );

  const docs = docsItem ? getComponentDocs(docsItem.name) : null;
  const usage = docsItem ? getUsageCode(docsItem.name) : "";

  return (
    <div className="mx-auto max-w-[1600px] px-8 py-12">
      <header className="mb-12 border-b border-[var(--border)] pb-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-[32px] font-semibold leading-tight tracking-tight text-[var(--foreground)]">
              Sharp UI
            </h1>
            <p className="text-[14px] text-[var(--muted-foreground)]">
              A sharp-edged component registry for React
            </p>
          </div>
          <div className="flex items-center gap-2">
            <code className="rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 font-mono text-[11px] text-[var(--foreground-subtle)]">
              {getPkgPrefix(manager)} {process.env.NEXT_PUBLIC_BASE_URL}
              /r/[component]
            </code>
            <PackageManagerSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="relative">
          <Icon
            name="search"
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="h-12 w-full rounded-[3px] border border-[var(--border-strong)] bg-[var(--background)] pl-11 pr-4 text-[14px] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--foreground-subtle)] focus:border-[var(--blue)] focus:shadow-[inset_0_0_0_1px_var(--blue)]"
          />
        </div>
      </header>

      <main className="flex flex-col gap-12">
        <section>
          <SectionHeader label="Components" count={filteredItems.length} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard key={item.name} item={item} onDocsClick={setDocsItem} />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-[14px] text-[var(--foreground-subtle)]">
              No components found matching &ldquo;{search}&rdquo;
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 border-t border-[var(--border)] pt-8 text-[12px] text-[var(--foreground-subtle)]">
        <div className="flex items-center justify-between">
          <span>Sharp UI · {registry.items.length} registry items</span>
          <a
            href="https://github.com/hiraeeth/sharp-ui"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
        </div>
      </footer>

      <DocumentationDrawer
        open={!!docsItem}
        onClose={() => setDocsItem(null)}
        componentName={docsItem?.name || ""}
        title={docsItem?.title || docsItem?.name || ""}
        description={docsItem?.description}
        docs={docs || { props: [] }}
        usage={usage}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <PkgManagerProvider>
      <HomeContent />
    </PkgManagerProvider>
  );
}
