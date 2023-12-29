import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Bg from './components/logo-bg';
import { UserAuthForm } from './components/user-auth-form';

export const metadata: Metadata = {
  title: '登入/註冊 | Lank.at 任意門',
  description: '登入/註冊 | Lank.at 任意門'
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session?.user) redirect('/admin');
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
        >
          回首頁
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Bg />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="md:hidden text-xl font-semibold tracking-tight">歡迎來到 Lank.at 任意門</h1>
              <h1 className="text-2xl font-semibold tracking-tight">註冊 / 登入帳號</h1>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              點選登入按鈕後，表示您同意我們的
              <br />
              <Link href="/" className="underline underline-offset-4 hover:text-primary">
                服務條款
              </Link>{' '}
              以及{' '}
              <Link href="/" className="underline underline-offset-4 hover:text-primary">
                隱私權政策
              </Link>
              。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
