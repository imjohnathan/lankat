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
        <div></div>
        <UserNav className="flex justify-end" />
      </header>
      <div className="h-[65px]"></div>
    </>
  );
}
