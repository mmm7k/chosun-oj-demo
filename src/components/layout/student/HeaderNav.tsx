'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function HeaderNav() {
  const pathname = usePathname();

  // 분반 경로
  const classPath = pathname.split('/').slice(0, 3).join('/');
  if (pathname.includes('/problems/')) {
    return null; // 헤더를 렌더링하지 않음
  }
  return (
    <nav className="min-w-screen h-16 bg-white text-secondary shadow-md flex justify-center">
      <div className="w-[70%] h-full flex justify-between items-center">
        {/* 로고 */}
        <section className="flex items-center text-lg font-semibold">
          <div className="w-9 h-9 relative">
            <Image
              src={'/commons/symbol.png'}
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-primary">&nbsp;Chosun&nbsp;</span>
          <span>Online Judge</span>
        </section>
        {/* 메뉴 */}
        {pathname !== '/student/selectclass' && (
          <section className="lg:mr-28 xl:mr-52 2xl:mr-60 space-x-28 ">
            <Link href={`${classPath}/problems`}>
              <span
                className={`cursor-pointer transition ${
                  pathname === `${classPath}/problems`
                    ? 'text-primary border-b-4 border-primary pb-[1.1rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                문제
              </span>
            </Link>
            <Link href={`${classPath}/grade`}>
              <span
                className={`cursor-pointer transition ${
                  pathname === `${classPath}/grade`
                    ? 'text-primary border-b-4 border-primary pb-[1.1rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                성적
              </span>
            </Link>
            <Link href={`${classPath}/questions`}>
              <span
                className={`cursor-pointer transition ${
                  pathname === `${classPath}/questions`
                    ? 'text-primary border-b-4 border-primary pb-[1.1rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                Q&A
              </span>
            </Link>
          </section>
        )}
        {/* 분반 , 로그아웃 */}
        <section className="flex items-center">
          {pathname !== '/student/selectclass' && (
            <div className="flex items-center transition hover:text-secondaryHover cursor-pointer mr-7">
              <span>분반</span>
              <RiArrowDropDownLine className="text-4xl" />
            </div>
          )}
          <Link href="/">
            <div className="flex items-center transition hover:text-secondaryHover cursor-pointer">
              <span> 로그아웃</span>
              <MdLogout className="text-xl ml-2 " />
            </div>
          </Link>
        </section>
      </div>
    </nav>
  );
}
