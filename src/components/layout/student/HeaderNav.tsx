'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="min-w-screen h-16 bg-white text-secondary shadow-md  font-semibold flex justify-center">
      <div className="w-[70%] h-full flex justify-between items-center">
        {/* 로고 */}
        <section className="flex items-center text-lg">
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
          <section className="mr-64 space-x-28 ">
            <span
              className={`cursor-pointer transition ${
                pathname === '/student/problems'
                  ? 'text-primary border-b-4 border-primary pb-[1.1rem]  hover:text-primaryHover hover:border-primaryHover'
                  : 'hover:text-secondaryHover'
              }`}
            >
              문제
            </span>
            <span
              className={`cursor-pointer transition ${
                pathname === '/student/grade'
                  ? 'text-primary border-b-4 border-primary pb-[1.1rem]  hover:text-primaryHover hover:border-primaryHover'
                  : 'hover:text-secondaryHover'
              }`}
            >
              성적
            </span>
            <span
              className={`cursor-pointer transition ${
                pathname === '/student/questions'
                  ? 'text-primary border-b-4 border-primary pb-[1.1rem]  hover:text-primaryHover hover:border-primaryHover'
                  : 'hover:text-secondaryHover'
              }`}
            >
              Q&A
            </span>
          </section>
        )}
        {/* 분반 , 로그아웃 */}

        <section className="flex items-center">
          {pathname !== '/student/selectclass' && (
            <div className="flex items-center transition  hover:text-secondaryHover cursor-pointer mr-7">
              <span>분반</span>
              <RiArrowDropDownLine className="text-4xl" />
            </div>
          )}
          <Link href="/">
            <div className="flex items-center transition  hover:text-secondaryHover cursor-pointer">
              <span> 로그아웃</span>
              <MdLogout className="text-xl ml-2 " />
            </div>
          </Link>
        </section>
      </div>
    </nav>
  );
}
