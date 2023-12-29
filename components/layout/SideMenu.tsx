'use client';

import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSession } from 'next-auth/react';
import { createContext, useState } from 'react';
import NavMenu from './NavMenu';

export const SideMenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {}
});

export function SideMenuProvider({ children }: { children: React.ReactNode }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <SideMenuContext.Provider
      value={{
        isOpen: isSideMenuOpen,
        setIsOpen: setIsSideMenuOpen
      }}
    >
      {children}
      <Sheet open={isSideMenuOpen} onOpenChange={setIsSideMenuOpen}>
        <SheetContent className="sm:max-w-[20rem]">
          <SheetHeader>
            <SheetTitle className="flex justify-center">
              <Logo className="h-6" />
            </SheetTitle>
            <div className="pl-4 pt-4">
              <NavMenu WrapperClassName="flex-col" url_key={session?.user.url_key ?? ''} isSlide />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </SideMenuContext.Provider>
  );
}
