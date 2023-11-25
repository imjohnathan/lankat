import Banner from "@/components/widgets/preview/Banner";
import Links from "@/components/widgets/preview/Buttons";
import { type Widgets } from "@/gql/graphql";

type WidgetListType = {
  type: string;
  render: React.ComponentType<{ widget: Widgets }>;
};

const widgetsList: WidgetListType[] = [
  {
    type: "links",
    render: (props: any) => (
      <Links type="page" className="w-full max-w-full" {...props} />
    ),
  },
  {
    type: "banner",
    render: (props: any) => <Banner {...props} />,
  },
];

export default function Widgets({ widgets }: { widgets: Widgets[] }) {
  return (
    <div className="grid w-full gap-4">
      {widgets.map((widget) => {
        const { type, id } = widget;
        const Component = widgetsList.find((w) => w.type === type)?.render;
        if (!Component) {
          return <div key={id} />;
        }
        return <Component key={id} widget={widget} />;
      })}
    </div>
  );
}
