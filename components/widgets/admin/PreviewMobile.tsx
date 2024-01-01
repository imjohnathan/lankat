import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Preview from '@/components/widgets/admin/Preview';

export default function PreviewMobile({ session }: { session?: any }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="sm:hidden fixed z-50 right-2 bottom-2 items-center grid place-items-center rounded-full border h-12 w-12 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          預覽
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100dvh-4rem)]">
        <div className="relative mx-auto grid grid-cols-1 place-items-center overflow-y-auto">
          <Preview
            session={session}
            classes={{
              header: 'mb-[-100px]',
              preview: '',
              footer: 'mt-[-100px]'
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
