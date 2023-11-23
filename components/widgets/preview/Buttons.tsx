import { Button } from "@/components/ui/button";
import { type Widgets } from "@/gql/graphql";
import { clsx } from "clsx";

interface WidgetLinkProps {
  isShow: boolean;
  name: string;
  url: string;
}

export function PreviewItem({ isShow, url, name }: WidgetLinkProps) {
  return (
    <div className="w-full">
      <Button
        asChild
        variant="outline"
        className={clsx("w-full", { "opacity-50": !isShow })}
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
  ...props
}: {
  widget: Widgets;
}) {
  const { widgets_links } = widget;
  const widgetData = widgets_links.length
    ? widgets_links
    : [{ isShow: true, id: 1, name: "", link: { url: "" } }];
  return (
    <div>
      <div className="mx-auto grid max-w-xs gap-4">
        {widgetData.map(({ link: { url }, ...rest }, index) => (
          <PreviewItem key={index} {...url} {...rest} />
        ))}
      </div>
    </div>
  );
}
