'use client';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import PreviewPage from '@/components/userpage/Preview';
import { cn, getUserPageUrl } from '@/lib/utils';
import Link from 'next/link';
import SolarPaintRollerLinear from '~icons/solar/paint-roller-linear';
import SolarPenNewSquareOutline from '~icons/solar/pen-new-square-outline';

export default function Preview({
  session,
  classes
}: {
  session?: any;
  classes?: { header: string; preview: string; footer: string };
}) {
  return (
    <>
      {session?.user && (
        <Badge className={cn('mb-[-111px] flex gap-2 px-3 py-1 justify-center', classes?.header)} variant="outline">
          <Link className="max-w-[200px] truncate" target="_blank" href={getUserPageUrl(session?.user?.url_key ?? '')}>
            {getUserPageUrl(session?.user?.url_key ?? '')}
          </Link>
          <div>
            <CopyButton value={getUserPageUrl(session?.user?.url_key ?? '')} />
          </div>
        </Badge>
      )}
      <PreviewPage wrapperClass={cn('scale-[.7] mt-[-40px]', classes?.preview)} isFloating={false} />
      {session?.user && (
        <div className={cn('mt-[-120px] flex justify-center', classes?.footer)}>
          <Link href="/admin/setting" className={cn(buttonVariants({ variant: 'ghost' }), 'px-3')}>
            <SolarPenNewSquareOutline className="mr-2 h-4 w-4" />
            編輯個人檔案
          </Link>
          <Link href="/admin/setting/themes" className={cn(buttonVariants({ variant: 'ghost' }), 'px-3')}>
            <SolarPaintRollerLinear className="mr-2 h-4 w-4" />
            自訂風格
          </Link>
        </div>
      )}
    </>
  );
}
