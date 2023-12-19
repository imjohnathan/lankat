import Logo from "@/components/logo";
import { UserNav } from "@/components/user/UserNav";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavMenu from "./NavMenu";

export default async function Header({ type }: { type?: string }) {
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
            <div className="col-span-3 flex justify-center">
              {session?.user.url_key && (
                <NavMenu url_key={session?.user.url_key} />
              )}
            </div>
            <UserNav className="flex justify-end" />
          </>
        )}
      </div>
    </header>
  );
}
