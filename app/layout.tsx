import Modal from '@/components/Modal';
import { auth } from '@/lib/auth';
import { constructMetadata } from '@/lib/utils';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import ClientLayout from './client/layout';
import './globals.css';
import StyledJsxRegistry from './registry';

export async function generateMetadata() {
  return constructMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <StyledJsxRegistry>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <ClientLayout>
          <html lang="en">
            <body>
              {children}
              <Toaster />
              <Modal />
            </body>
          </html>
        </ClientLayout>
      </SessionProvider>
    </StyledJsxRegistry>
  );
}
