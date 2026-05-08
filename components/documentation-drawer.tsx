"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";

interface PropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description?: string;
}

interface VariantPreview {
  name: string;
  preview: React.ReactNode;
  code?: string;
}

interface ExampleBlock {
  title: string;
  code: string;
  language?: "typescript" | "javascript";
}

interface IntegrationBlock {
  title: string;
  description?: string;
  code: string;
}

interface ComponentDocs {
  props: PropDoc[];
  compoundComponents?: { name: string; props: PropDoc[] }[];
  variants?: VariantPreview[];
  examples?: ExampleBlock[];
  integrations?: IntegrationBlock[];
  relatedComponents?: string[];
}

interface DocumentationDrawerProps {
  open: boolean;
  onClose: () => void;
  componentName: string;
  title: string;
  description?: string;
  docs: ComponentDocs;
  usage: string;
}

type TabId = "props" | "variants" | "examples" | "integrations";

export function DocumentationDrawer({
  open,
  onClose,
  componentName,
  title,
  description,
  docs,
  usage,
}: DocumentationDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabId>("props");

  const tabs: { id: TabId; label: string }[] = [{ id: "props", label: "API" }];

  if (docs.variants && docs.variants.length > 1) {
    tabs.push({ id: "variants", label: "Variants" });
  }

  if (docs.examples && docs.examples.length > 0) {
    tabs.push({ id: "examples", label: "Examples" });
  }

  if (docs.integrations && docs.integrations.length > 0) {
    tabs.push({ id: "integrations", label: "Integrations" });
  }

  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab("props");
    }
  }, [activeTab, componentName, tabs]);

  useEffect(() => {
    if (open) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[90] bg-[var(--modal-overlay)]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 z-[100] h-full w-full max-w-[720px] border-l border-[var(--border)] bg-[var(--background)] shadow-2xl"
          >
            <div className="flex h-full flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
                <div>
                  <h2 className="text-[18px] font-semibold text-[var(--foreground)]">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-[13px] text-[var(--foreground-subtle)]">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[var(--foreground-subtle)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              <Tabs
                defaultValue={activeTab}
                onValueChange={(val) => setActiveTab(val as TabId)}
                className="flex flex-col flex-1 min-h-0"
              >
                <TabsList
                  variant="underline"
                  className="flex-shrink-0 border-b border-[var(--border)]"
                >
                  {tabs.map((tab) => (
                    <TabsTab key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTab>
                  ))}
                </TabsList>

                <div className="flex-1 overflow-y-auto">
                  <TabsPanel value="props" active={activeTab} className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground-subtle)]">
                          Component Props
                        </h3>
                        <div className="overflow-hidden rounded-[3px] border border-[var(--border)]">
                          <table className="w-full text-[12px]">
                            <thead>
                              <tr className="border-b border-[var(--border)] bg-[var(--surface-alt)]">
                                <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                  Prop
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                  Type
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                  Default
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {docs.props.map((prop) => (
                                <tr
                                  key={prop.name}
                                  className="border-b border-[var(--border)] last:border-b-0"
                                >
                                  <td className="px-4 py-2">
                                    <span className="font-mono text-[var(--blue)]">
                                      {prop.name}
                                    </span>
                                    {prop.required && (
                                      <span className="ml-1 text-[var(--destructive)]">
                                        *
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2">
                                    <span className="font-mono text-[var(--foreground-subtle)]">
                                      {prop.type}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2">
                                    {prop.default ? (
                                      <span className="font-mono text-[var(--success)]">
                                        {prop.default}
                                      </span>
                                    ) : (
                                      <span className="text-[var(--foreground-subtle)]">
                                        -
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2 text-[var(--foreground-subtle)]">
                                    {prop.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {docs.compoundComponents &&
                        docs.compoundComponents.length > 0 && (
                          <div>
                            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground-subtle)]">
                              Compound Components
                            </h3>
                            {docs.compoundComponents.map((comp) => (
                              <div key={comp.name} className="mb-4">
                                <h4 className="mb-2 font-medium text-[var(--foreground)]">
                                  {comp.name}
                                </h4>
                                <div className="overflow-hidden rounded-[3px] border border-[var(--border)]">
                                  <table className="w-full text-[12px]">
                                    <thead>
                                      <tr className="border-b border-[var(--border)] bg-[var(--surface-alt)]">
                                        <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                          Prop
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                          Type
                                        </th>
                                        <th className="px-4 py-2 text-left font-medium text-[var(--foreground)]">
                                          Description
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {comp.props.map((prop) => (
                                        <tr
                                          key={prop.name}
                                          className="border-b border-[var(--border)] last:border-b-0"
                                        >
                                          <td className="px-4 py-2 font-mono text-[var(--blue)]">
                                            {prop.name}
                                          </td>
                                          <td className="px-4 py-2 font-mono text-[var(--foreground-subtle)]">
                                            {prop.type}
                                          </td>
                                          <td className="px-4 py-2 text-[var(--foreground-subtle)]">
                                            {prop.description}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      <div>
                        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground-subtle)]">
                          Usage
                        </h3>
                        <CodeBlock code={usage} />
                      </div>
                    </div>
                  </TabsPanel>

                  <TabsPanel
                    value="variants"
                    active={activeTab}
                    className="p-6"
                  >
                    {docs.variants ? (
                      <div className="space-y-6">
                        {docs.variants.map((variant, index) => (
                          <div key={index}>
                            <h3 className="mb-3 text-[13px] font-medium text-[var(--foreground)]">
                              {variant.name}
                            </h3>
                            <div className="mb-4 flex flex-wrap items-center gap-4 rounded-[3px] border border-[var(--border)] bg-[var(--surface-alt)] p-6">
                              {variant.preview}
                            </div>
                            {variant.code && <CodeBlock code={variant.code} />}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </TabsPanel>

                  <TabsPanel
                    value="examples"
                    active={activeTab}
                    className="p-6"
                  >
                    {docs.examples && docs.examples.length > 0 ? (
                      <div className="space-y-6">
                        {docs.examples.map((example, index) => (
                          <div key={index}>
                            <h3 className="mb-3 text-[13px] font-medium text-[var(--foreground)]">
                              {example.title}
                            </h3>
                            <CodeBlock
                              code={example.code}
                              language={example.language || "typescript"}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </TabsPanel>

                  <TabsPanel
                    value="integrations"
                    active={activeTab}
                    className="p-6"
                  >
                    {docs.integrations && docs.integrations.length > 0 ? (
                      <div className="space-y-6">
                        {docs.integrations.map((integration, index) => (
                          <div key={index}>
                            <h3 className="mb-1 text-[13px] font-medium text-[var(--foreground)]">
                              {integration.title}
                            </h3>
                            {integration.description && (
                              <p className="mb-3 text-[12px] text-[var(--foreground-subtle)]">
                                {integration.description}
                              </p>
                            )}
                            <CodeBlock code={integration.code} />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </TabsPanel>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type {
  ComponentDocs,
  PropDoc,
  VariantPreview,
  ExampleBlock,
  IntegrationBlock,
};
