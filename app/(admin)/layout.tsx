import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
