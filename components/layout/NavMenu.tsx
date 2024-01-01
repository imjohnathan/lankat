'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SolarSquareTopDownLinear from '~icons/solar/square-top-down-linear';
import { useSideMenu } from './SideMenu';

const NavLink = ({
  href,
  children,
  className,
  target,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  props?: any;
}) => {
  const currentRoute = usePathname();
  const isActive = currentRoute === href;
  const { setIsOpen } = useSideMenu();

  return (
    <NavigationMenuItem>
      <Link href={href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-base', className)}
          active={isActive}
          target={target}
          {...props}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default function NavMenu({
  url_key,
  WrapperClassName,
  isSlide
}: {
  url_key: string;
  WrapperClassName?: string;
  isSlide?: boolean;
}) {
  return (
    <NavigationMenu className={cn({ '<md:hidden': !isSlide })}>
      <ul className={cn('flex gap-2', WrapperClassName)}>
        <NavLink href="/admin">任意門</NavLink>
        <NavLink href="/admin/links">連結</NavLink>
        <NavLink href="/admin/analytics">分析</NavLink>
        <NavLink className="flex items-center gap-1" href={`/u/${url_key}`} target="_blank">
          我的任意門 <SolarSquareTopDownLinear className="h-4 w-4" />
        </NavLink>
      </ul>
    </NavigationMenu>
  );
}
