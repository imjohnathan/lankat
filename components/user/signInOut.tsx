import { signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function SignIn({
  provider,
  children,
  className
}: {
  provider?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <form
        className={className}
        action={async () => {
          'use server';
          //const url = await signIn(provider, { redirect: false });
          redirect('/login');
        }}
      >
        {children}
      </form>
    </>
  );
}

export async function SignOut({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <form
      className={className}
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      {children}
    </form>
  );
}
