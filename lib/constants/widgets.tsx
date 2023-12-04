import Banner from "@/components/widgets/preview/Banner";
import Links from "@/components/widgets/preview/Buttons";
import Separator from "@/components/widgets/preview/Separator";
import { type Widgets } from "@/gql/graphql";

type WidgetListType = {
  type: string;
  title: string;
  render: React.ComponentType<{ widget: Widgets; type: string }>;
};

export const widgetsList: WidgetListType[] = [
  {
    type: "links",
    title: "連結列表",
    render: (props: any) => <Links {...props} />,
  },
  {
    type: "banner",
    title: "圖片看板",
    render: (props: any) => <Banner {...props} />,
  },
  {
    type: "separator",
    title: "分隔線",
    render: ({ widget: { config }, ...props }) => (
      <Separator config={config} {...props} />
    ),
  },
];
