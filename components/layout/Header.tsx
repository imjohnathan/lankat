import Logo from "@/components/logo";
import { UserNav } from "@/components/user/UserNav";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default async function Header({ type }: { type: string }) {
  const session = await auth();
  const isHome = type && type === "index";
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        {
          "border-gray-700 text-white supports-[backdrop-filter]:bg-background/0":
            isHome,
        },
      )}
    >
      <div className="container grid h-[65px] grid-cols-5 items-center justify-center">
        <Link href="/">
          <Logo
            className={cn("h-6", {
              "fill-white": isHome,
            })}
          />
        </Link>
        {session?.user && (
          <>
            <div className="col-span-3">
              {session?.user.url_key && (
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
              )}
            </div>
            <UserNav className="flex justify-end" />{" "}
          </>
        )}
      </div>
    </header>
  );
}
