import Modal from "@/components/Modal";
import { auth } from "@/lib/auth";
import { constructMetadata } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import ClientLayout from "./client/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Lank.at 任意門 | 用你最喜歡的樣子，展現你的網路人格",
//   description:
//     "Lank.at 任意門 使用在宣傳個人社群媒體的管道、或是正在開團購的連結全部放這一個頁面中，簡單的分享給你的朋友們",
//     openGraph: {
//       images: ['/some-specific-page-image.jpg'],
//     },
// };

export async function generateMetadata() {
  return constructMetadata();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ClientLayout>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
            <Modal />
          </body>
        </html>
      </ClientLayout>
    </SessionProvider>
  );
}
