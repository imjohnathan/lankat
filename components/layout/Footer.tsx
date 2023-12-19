import Logo from "@/components/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t py-6">
      <Link
        className="mx-auto flex max-w-[180px] items-center justify-center rounded-full border border-transparent bg-white/90 px-2.5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        href={"/"}
      >
        <Logo className="h-5" />
      </Link>
      <ul className="mt-4 flex gap-4 text-xs font-medium text-gray-500">
        <li>
          <Link href={"/"}>服務條款</Link>
        </li>
        <li>
          <Link href={"/"}>隱私權政策</Link>
        </li>
        <li>
          <Link href={"/"}>聯絡我們</Link>
        </li>
      </ul>
    </footer>
  );
}
