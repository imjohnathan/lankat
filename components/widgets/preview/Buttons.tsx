'use client';

import { Button } from '@/components/ui/button';
import { type Widgets } from '@/gql/graphql';
import { cn } from '@/lib/utils';

interface WidgetLinkProps {
  isShow: boolean;
  name: string;
  url: string;
  urlKey?: string;
  isPreview: boolean;
}

export function PreviewItem({ isShow, url, name, urlKey, isPreview }: WidgetLinkProps) {
  const recordClick = () => {
    if (!isPreview && urlKey) {
      fetch(`/s/${urlKey}?logger`, {
        method: 'POST'
      });
    }
  };
  return (
    <div className="w-full">
      <Button
        onClick={recordClick}
        asChild
        variant="outline"
        className={cn(
          'linkButton mx-auto h-auto w-full overflow-hidden truncate border-2 border-black py-3 text-base',
          {
            hidden: !isShow
          }
        )}
      >
        <a href={url} target="_blank">
          <p>{name ? name : '...'}</p>
        </a>
      </Button>
    </div>
  );
}

export default function ButtonPreview({
  widget,
  className,
  isPreview = false
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
      ? [{ isShow: true, id: 1, name: '', link: { url: '', key: '' } }]
      : [];
  return (
    <div className={cn('mx-auto grid w-full max-w-full grid-cols-1 gap-4', className)}>
      {widgetData.length &&
        widgetData.map(({ link, name, isShow }, index) => (
          <PreviewItem
            key={index}
            name={name ?? '...'}
            url={link?.url ?? ''}
            urlKey={link?.key ?? ''}
            isShow={isShow ?? true}
            isPreview={isPreview}
          />
        ))}
    </div>
  );
}
