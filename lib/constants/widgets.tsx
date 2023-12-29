import Banners from '@/components/widgets/preview/Banners';
import Links from '@/components/widgets/preview/Buttons';
import Separator from '@/components/widgets/preview/Separator';
import Text from '@/components/widgets/preview/Text';
import { type Widgets } from '@/gql/graphql';
import MaterialSymbolsImagesmodeOutlineSharp from '~icons/material-symbols/imagesmode-outline-sharp';
import SolarLinkLinear from '~icons/solar/link-linear';
import SolarParagraphSpacingOutline from '~icons/solar/paragraph-spacing-outline';
import SolarTextBold from '~icons/solar/text-bold';

type WidgetListType = {
  type: string;
  title: string;
  icon: React.ComponentType<any>;
  render: React.ComponentType<{ widget: Widgets; type: string }>;
};

export const widgetsList: WidgetListType[] = [
  {
    type: 'links',
    title: '連結列表',
    icon: SolarLinkLinear,
    render: (props: any) => <Links {...props} />
  },
  {
    type: 'banner',
    title: '圖片看板',
    icon: MaterialSymbolsImagesmodeOutlineSharp,
    render: (props) => {
      const { widget }: { widget: Widgets } = props;
      const { config, widgets_links } = widget;
      const data = {
        config,
        links: widgets_links.map(({ name, isShow, link }) => {
          return {
            name: name ?? '',
            image: link?.image ?? '',
            url: link?.url ?? '',
            key: link?.key ?? '',
            isShow: isShow ?? true
          };
        })
      };
      return <Banners data={data} {...props} />;
    }
  },
  {
    type: 'text',
    title: '文字看板',
    icon: SolarTextBold,
    render: ({ widget: { config }, ...props }) => <Text config={config} {...props} />
  },
  {
    type: 'separator',
    title: '分隔線',
    icon: SolarParagraphSpacingOutline,
    render: ({ widget: { config }, ...props }) => <Separator config={config} {...props} />
  }
];
