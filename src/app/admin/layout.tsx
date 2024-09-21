import SideNav from '@/components/layout/admin/SideNav';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#f0f4fc] flex flex-col 2xl:flex-row min-w-screen 2xl:min-h-screen">
      <SideNav />

      <main className="w-full 2xl:pl-52">{children}</main>
    </div>
  );
}
