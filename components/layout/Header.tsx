import Logo from "@/components/logo";
import { UserNav } from "@/components/user/UserNav";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <header className="fixed z-50 grid h-[65px] w-full grid-cols-3 items-center justify-center border-b bg-white px-6">
        <Link href="/">
          <Logo className="h-6" />
        </Link>
        <ul className="flex gap-8 text-lg font-medium">
          <li>
            <Link href="/hello">你好</Link>
          </li>
          <li>
            <Link href="/dnd">頁面</Link>
          </li>
          <li>
            <Link href="/links">連結</Link>
          </li>
        </ul>
        <UserNav className="flex justify-end" />
      </header>
      <div className="h-[65px]"></div>
    </>
  );
}
