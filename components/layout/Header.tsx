import Logo from '@/components/logo';
import { UserNav } from '@/components/user/UserNav';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import NavMenu from './NavMenu';
import { SideMenuProvider } from './SideMenu';
import SideMenuButton from './SideMenuButton';

export default async function Header({ type }: { type?: string }) {
  const session = await auth();
  const isHome = type && type === 'index';
  return (
    <SideMenuProvider>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          {
            'border-gray-700 text-white supports-[backdrop-filter]:bg-background/0': isHome
          }
        )}
      >
        <div className="container grid h-[65px] grid-cols-5 items-center justify-center">
          <Link href="/">
            <Logo
              className={cn('h-6', {
                'fill-white': isHome
              })}
            />
          </Link>
          <div className="col-span-3 flex justify-center">
            {session?.user.url_key && <NavMenu url_key={session?.user.url_key} />}
          </div>
          <div className="flex justify-end gap-2">
            <UserNav className="flex justify-end" />
            {session?.user && <SideMenuButton />}
          </div>
        </div>
      </header>
    </SideMenuProvider>
  );
}
