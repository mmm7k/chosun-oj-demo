import HeaderNav from '@/components/layout/student/HeaderNav';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f0f4fc] min-w-screen  min-h-screen overflow-hidden">
      <HeaderNav />
      {children}
    </div>
  );
}
