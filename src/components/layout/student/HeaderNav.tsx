'use client';

import { usePathname } from 'next/navigation';

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="min-w-screen h-16 bg-white text-primaryFont shadow-md text-sm font-semibold">
      Header
    </nav>
  );
}
