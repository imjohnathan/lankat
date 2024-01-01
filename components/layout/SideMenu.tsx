'use client';

import Logo from '@/components/logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';
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
              <NavMenu WrapperClassName="flex-col text-left" url_key={session?.user.url_key ?? ''} isSlide />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </SideMenuContext.Provider>
  );
}

export const useSideMenu = () => {
  const cxt = useContext(SideMenuContext);
  if (cxt === undefined) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return cxt;
};
