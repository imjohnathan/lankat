"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import IconTick from "~icons/solar/check-read-outline";
import IconCopy from "~icons/solar/copy-outline";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setCopied(true);
        navigator.clipboard.writeText(value).then(() => {
          toast.success("已複製到剪貼簿！");
        });
        setTimeout(() => setCopied(false), 3000);
      }}
      className={cn(
        "group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95",
        className,
      )}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <IconTick className="text-gray-700 transition-all group-hover:text-blue-800" />
      ) : (
        <IconCopy className="text-gray-700 transition-all group-hover:text-blue-800" />
      )}
    </button>
  );
}
