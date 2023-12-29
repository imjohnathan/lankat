import Header from '@/components/layout/Header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header type="index" />
      {children}
    </>
  );
}
