"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

export function CopyCodeButton({
  name,
  className,
  usage,
}: {
  name: string;
  className?: string;
  usage: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(usage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      aria-label={copied ? `${name} copied` : `Copy ${name} code`}
    >
      {copied ? (
        <Icon name="check" size={14} />
      ) : (
        <Icon name="copy" size={14} />
      )}
    </button>
  );
}
