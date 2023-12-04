import { Metadata } from "next";

import { SidebarNav } from "@/app/(admin)/admin/setting/components/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import Client from "./layout.client";

export const metadata: Metadata = {
  title: "個人設定 | Lank.at 任意門",
  description: "個人設定 | Lank.at 任意門",
};

const sidebarNavItems = [
  {
    title: "個人檔案",
    href: "/admin/setting",
  },
  {
    title: "頁面風格",
    href: "/admin/setting/themes",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Client>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">個人設定</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </Client>
  );
}
