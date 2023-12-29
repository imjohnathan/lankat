'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import IonLogoGoogle from '~icons/ion/logo-google';
import IconLoading from '~icons/line-md/loading-twotone-loop';
import SolarUserHeartBold from '~icons/solar/user-heart-bold';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const testUsers = ['kol', 'sat', 'broker', 'robert'];

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const isTest = searchParams.has('test');
  const [isTestCookie, setIsTestCookie] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function loginWithProvider(provider: string) {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: '/admin' });
  }

  async function loginTestUser(type: string = 'test') {
    setIsLoading(true);
    await signIn('credentials', {
      email: type + '@lank.at',
      password: 'testtest',
      callbackUrl: '/admin/hello'
    });
  }

  React.useEffect(() => {
    const getCsrf = async () => {
      setIsLoading(true);
      await fetch('/api/auth/csrf');
      setIsLoading(false);
    };
    getCsrf();

    if (isTest) Cookies.set('isTest', 'true');
    const testCookie = Cookies.get('isTest') || false;
    if (testCookie) {
      setIsTestCookie(true);
    }
  }, []);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {isTestCookie && (
        <div className="grid gap-3">
          {testUsers.map((user) => (
            <Button
              key={user}
              onClick={() => {
                loginTestUser(user);
              }}
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <IconLoading className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SolarUserHeartBold className="mr-2 h-4 w-4" />
              )}{' '}
              {user} 登入
            </Button>
          ))}
        </div>
      )}
      <Button onClick={() => loginTestUser('test')} variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <IconLoading className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <SolarUserHeartBold className="mr-2 h-4 w-4" />
        )}{' '}
        測試使用者登入
      </Button>
      <Button
        onClick={() => {
          loginWithProvider('google');
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? <IconLoading className="mr-2 h-4 w-4 animate-spin" /> : <IonLogoGoogle className="mr-2 h-4 w-4" />}{' '}
        使用 Google 繼續
      </Button>
    </div>
  );
}
