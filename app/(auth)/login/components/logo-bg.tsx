"use client";
import Logo from "@/components/logo";
import Link from "next/link";
export default function Bg() {
  return (
    <>
      <>
        <div className="absolute inset-0" />
        <style jsx>
          {`
            div {
              background: linear-gradient(
                -45deg,
                #536976,
                #16222a,
                #3a6073,
                #292e49
              );
              background-size: 500% 500%;
              animation: gradient 10s ease infinite;
            }

            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }

              50% {
                background-position: 100% 50%;
              }

              100% {
                background-position: 0% 50%;
              }
            }
          `}
        </style>
      </>
      <Link
        href="/"
        className="relative z-20 my-auto grid place-items-center gap-4"
      >
        <Logo className="h-10 fill-white" />
        <h2 className="text-xl font-medium">從這邊到那邊，總共5步</h2>
      </Link>
    </>
  );
}
