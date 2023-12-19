"use client";

import { cn } from "@/lib/utils";

const bgStyles = {
  transparent: "bg-transparent",
  card: "rounded-lg border bg-card text-card-foreground shadow-sm py-2 px-4",
};
export default function Text({
  config,
  isPreview = false,
  isDraggableArea = false,
  ...props
}: {
  isPreview?: boolean;
  isDraggableArea?: boolean;
  config: {
    style: keyof typeof bgStyles;
    textContent: string;
  };
}) {
  const bgStyle = bgStyles[config?.style || "solid"];
  return (
    <div
      className={cn({
        "grid h-full w-full place-items-center rounded-lg bg-slate-100 p-4":
          isPreview && !isDraggableArea,
      })}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            config?.textContent ||
            `<h3 class="ql-align-center">這是一段測試文字</h3>`,
        }}
        className={cn("prose prose-sm mx-auto w-full break-words", bgStyle)}
      />
      <style jsx>{`
        div :global(.ql-align-center) {
          text-align: center;
        }
        div :global(.ql-align-justify) {
          text-align: justify;
        }
        div :global(.ql-align-right) {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
