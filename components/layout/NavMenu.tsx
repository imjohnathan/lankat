"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SolarSquareTopDownLinear from "~icons/solar/square-top-down-linear";

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

  return (
    <NavigationMenuItem>
      <Link href={href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent text-base",
            className,
          )}
          active={isActive}
          target={target}
          {...props}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default function NavMenu({ url_key }: { url_key: string }) {
  return (
    <NavigationMenu>
      <ul className="flex gap-2">
        <NavLink href="/admin">任意門</NavLink>
        <NavLink href="/admin/links">連結</NavLink>
        <NavLink href="/admin/analytics">分析</NavLink>
        <NavLink
          className="flex items-center gap-1"
          href={`/u/${url_key}`}
          target="_blank"
        >
          我的任意門 <SolarSquareTopDownLinear className="h-4 w-4" />
        </NavLink>
      </ul>
    </NavigationMenu>
  );
}
