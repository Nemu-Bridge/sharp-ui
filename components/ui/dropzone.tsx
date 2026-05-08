"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
}

interface DropzoneProps {
  onFilesChange?: (files: UploadedFile[]) => void;
  maxSize?: number;
  className?: string;
}

export function Dropzone({
  onFilesChange,
  maxSize = 25,
  className,
}: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (incoming: File[]) => {
      const newFiles = incoming.slice(0, 3).map((f) => ({
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(1) + " MB",
        progress: 100,
      }));
      const updated = [...files, ...newFiles];
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, onFilesChange],
  );

  const removeFile = useCallback(
    (i: number) => {
      const u = files.filter((_, j) => j !== i);
      setFiles(u);
      onFilesChange?.(u);
    },
    [files, onFilesChange],
  );

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "cursor-pointer rounded-[var(--radius)] border-2 border-dashed bg-[var(--muted)] p-12 text-center transition-all duration-200",
          dragOver
            ? "border-[var(--primary)] bg-[var(--blue-soft)]"
            : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--blue-soft)]",
        )}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(Array.from(e.dataTransfer.files));
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(Array.from(e.target.files));
          }}
        />
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]">
          <Icon name="cloud-upload" size={28} />
        </div>
        <div className="mb-1 text-[16px] font-medium">Drop files to upload</div>
        <div className="text-[13px] text-[var(--muted-foreground)]">
          or{" "}
          <span className="cursor-pointer text-[var(--primary)] underline">
            browse from device
          </span>{" "}
          &middot; max {maxSize} MB per file
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)]">
          {files.map((f, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3 border-b border-[var(--border)] p-3.5 last:border-b-0"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[var(--radius)] bg-[var(--muted)] text-[var(--muted-foreground)]">
                <Icon name="file" size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium">{f.name}</div>
                <div className="mt-0.5 flex gap-1.5 text-xs tracking-wide text-[var(--muted-foreground)]">
                  <span>{f.size}</span>
                  {f.progress < 100 ? (
                    <span className="text-[var(--primary)]">
                      &middot; uploading {f.progress}%
                    </span>
                  ) : (
                    <span className="text-[var(--success)]">
                      &middot; complete
                    </span>
                  )}
                </div>
                {f.progress < 100 && (
                  <div className="mt-2 h-[3px] overflow-hidden rounded-[2px] bg-[var(--border)]">
                    <div
                      className="h-full bg-[var(--primary)] transition-all duration-300"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(i)}
                className="cursor-pointer rounded-[2px] border-none bg-transparent p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                aria-label="Remove"
              >
                <Icon name="circle-x" size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export type { DropzoneProps, UploadedFile };
