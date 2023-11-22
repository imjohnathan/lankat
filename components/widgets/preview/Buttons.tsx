import { Button } from "@/components/ui/button";
import { type Widgets } from "@/gql/graphql";
export default function ButtonPreview({
  widget,
  ...props
}: {
  widget: Widgets;
}) {
  const { widgets_links } = widget;
  const widgetData = widgets_links.length
    ? widgets_links
    : [{ id: 0, name: "", link: { url: "" } }];
  return (
    <div>
      <div className="mx-auto grid max-w-xs gap-4">
        {widgetData.map(({ id, isShow, name, link: { url } }, index) => (
          <div key={index} className="w-full">
            <Button asChild variant="outline" className="w-full">
              <a href={url}>{name ? name : "..."}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
