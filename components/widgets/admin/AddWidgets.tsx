import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { widgetsList } from '@/lib/constants/widgets';

export default function AddWidgets({ handleAddWidget }: { handleAddWidget: (type: string) => void }) {
  return (
    <div className="flex gap-2">
      {widgetsList.map(({ type, title, icon }) => {
        const Icon = icon;
        return (
          <TooltipProvider key={type}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => handleAddWidget(type)}>
                  <span className="px-2">{icon && <Icon className="h-8" />}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
