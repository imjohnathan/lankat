import HeroMockUp from '@/components/home/Hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="mt-[-66px] flex min-h-screen flex-col items-center justify-between">
      <div className="grid h-screen w-full lg:place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_center_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 <lg:pt-20">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl font-bold  !leading-[1.2] text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">用你最喜歡的樣子</span>
                  <span className="block text-indigo-400">展現你的網路人格</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  你可以將 Lank.at 任意門
                  使用在宣傳個人社群媒體的管道、或是正在開團購的連結全部放這一個頁面中，簡單的分享給你的朋友們
                </p>
                <div className="mt-10 sm:mt-12">
                  <div className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="flex <lg:justify-center">
                      <div className="mt-3 sm:ml-3 sm:mt-0">
                        <Button className="h-12 text-lg" variant={'outline'} asChild>
                          <Link href="/login">馬上開始</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-48 lg:relative lg:m-0">
              <div className="mx-auto px-4 max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <HeroMockUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
