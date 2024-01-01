import { type Widgets } from '@/gql/graphql';
import { widgetsList } from '@/lib/constants/widgets';

export default function Widgets({ widgets }: { widgets: Partial<Widgets>[] }) {
  return (
    <div className="grid w-full grid-cols-1  gap-4 transition-all duration-300">
      {widgets.map((widget) => {
        const { type, id, widgets_links } = widget;
        if (type === 'links' && widgets_links?.length === 0) {
          return;
        }
        const Component = widgetsList.find((w) => w.type === type)?.render;
        if (!Component) {
          return <div key={id} />;
        }
        return <Component key={id} type="page" widget={widget} />;
      })}
    </div>
  );
}
