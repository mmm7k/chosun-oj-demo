import HeaderNav from '@/components/layout/student/HeaderNav';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F9F9F9] min-w-screen min-h-screen">
      <HeaderNav />
      {children}
    </div>
  );
}
