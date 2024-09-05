'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-52 h-full bg-white fixed left-0 top-0 text-primaryFont text-sm font-semibold">
      <div className="flex flex-col items-center w-full h-full">
        {/* 로고 이미지 */}
        <div className="w-16 h-16 relative mt-11">
          <Image
            src="/commons/symbol.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* 메뉴 */}
        <div className="w-full px-[15%] space-y-11 mt-12">
          <div
            className={
              pathname === '/admin/dashboard'
                ? 'text-primary'
                : 'text-primaryFont'
            }
          >
            대시보드
          </div>
          <div
            className={
              pathname === '/admin/student'
                ? 'text-primary'
                : 'text-primaryFont'
            }
          >
            학생
          </div>
          <div
            className={
              pathname === '/admin/problems'
                ? 'text-primary'
                : 'text-primaryFont'
            }
          >
            문제
          </div>
          <div
            className={
              pathname === '/admin/example'
                ? 'text-primary'
                : 'text-primaryFont'
            }
          >
            example
          </div>
        </div>
      </div>
    </nav>
  );
}
