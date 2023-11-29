"use client";

import { Button } from "@/components/ui/button";
import { type Widgets } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";

interface WidgetLinkProps {
  isShow: boolean;
  name: string;
  url: string;
  urlKey?: string;
  isPreview: boolean;
}

export function PreviewItem({
  isShow,
  url,
  name,
  urlKey,
  isPreview,
}: WidgetLinkProps) {
  const recordClick = () => {
    if (!isPreview && urlKey) {
      fetch(`/s/${urlKey}?logger`, {
        method: "POST",
      });
    }
  };
  return (
    <div className="w-full">
      <Button
        onClick={recordClick}
        asChild
        variant="outline"
        className={clsx(
          "linkButton h-auto w-full border-2 border-black py-3 text-base",
          {
            "opacity-50": !isShow,
          },
        )}
      >
        <a href={url} target="_blank">
          {name ? name : "..."}
        </a>
      </Button>
    </div>
  );
}

export default function ButtonPreview({
  widget,
  className,
  isPreview = false,
  ...props
}: {
  widget: Widgets;
  isPreview: boolean;
  className?: string;
  props?: any;
}) {
  const { widgets_links } = widget;
  const widgetData = widgets_links.length
    ? widgets_links
    : isPreview
      ? [{ isShow: true, id: 1, name: "", link: { url: "" } }]
      : [];
  return (
    <div className={cn("mx-auto grid max-w-xs gap-4", className)}>
      {widgetData.map(({ link: { url, key }, ...rest }, index) => (
        <PreviewItem
          key={index}
          url={url}
          urlKey={key}
          isPreview={isPreview}
          {...rest}
        />
      ))}
    </div>
  );
}
