'use client';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import IconHamburger from '~icons/solar/hamburger-menu-linear';
import { SideMenuContext } from './SideMenu';

export default function SideMenuButton() {
  const { isOpen, setIsOpen } = useContext(SideMenuContext);
  return (
    <button
      className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-base rounded-full p-2.5 h-10 w-10 md:hidden')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <IconHamburger className="h-6 w-6" />
    </button>
  );
}
