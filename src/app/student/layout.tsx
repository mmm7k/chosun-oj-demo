import Footer from '@/components/layout/student/Footer';
import HeaderNav from '@/components/layout/student/HeaderNav';
import ScrollToTopButton from '@/components/layout/student/ScrollToTopButton';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-w-screen overflow-hidden min-h-[100dvh]">
      <HeaderNav />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
