import Logo from "@/components/logo";
import { UserNav } from "@/components/user/UserNav";
import { auth } from "@/lib/auth";
import Link from "next/link";
export default async function Header() {
  const session = await auth();
  return (
    <>
      <header className="fixed z-50 grid h-[65px] w-full grid-cols-3 items-center justify-center border-b bg-white px-6">
        <Link href="/">
          <Logo className="h-6" />
        </Link>
        <ul className="flex gap-8 text-lg font-medium">
          <li>
            <Link href="/admin/hello">你好</Link>
          </li>
          <li>
            <Link href="/admin">頁面</Link>
          </li>
          <li>
            <Link href="/admin/links">連結</Link>
          </li>
          <li>
            <Link href="/admin/analytics">分析</Link>
          </li>
          <li>
            <Link target="_blank" href={`/u/${session?.user.url_key}`}>
              我的頁面
            </Link>
          </li>
        </ul>
        <UserNav className="flex justify-end" />
      </header>
      <div className="h-[65px]"></div>
    </>
  );
}
