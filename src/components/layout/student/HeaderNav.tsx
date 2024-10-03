'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function HeaderNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // 분반 경로
  const classPath = pathname.split('/').slice(0, 3).join('/');

  if (pathname.includes('/problems/')) {
    return null; // 헤더를 렌더링하지 않음
  }

  const isSelectClassPage = pathname === '/student/selectclass';

  return (
    <nav className="min-w-screen h-20 lg:h-16 bg-white text-secondary border-b border-gray-200 flex justify-center">
      <div className="w-[90%] md:[90%] lg:w-[62%] h-full flex  items-center">
        {/* 로고 */}
        {/* <section className="flex items-center text-lg font-semibold"> */}
        <Link
          href="/student"
          className="flex items-center text-lg font-semibold"
        >
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
        </Link>
        {/* </section> */}

        {/* 햄버거 메뉴 */}
        <div className="sm:hidden ml-auto">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* 메뉴 (sm 이상에서만 표시) */}
        {!isSelectClassPage && (
          <section className="hidden sm:flex ml-[10%] space-x-28">
            {/* <Link href={`${classPath}/problems`}> */}
            <Link href={'/student/problems'}>
              <span
                className={`cursor-pointer transition ${
                  // pathname === `${classPath}/problems`
                  pathname === '/student/problems'
                    ? 'text-primary border-b-4 border-primary pb-[1rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                문제
              </span>
            </Link>
            {/* <Link href={`${classPath}/analysis`}>
              <span
                className={`cursor-pointer transition ${
                  pathname === `${classPath}/analysis`
                    ? 'text-primary border-b-4 border-primary pb-[0.9rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                분석
              </span>
            </Link> */}
            {/* <Link href={`${classPath}/questions`}> */}
            <Link href={'/student/questions'}>
              <span
                className={`cursor-pointer transition ${
                  // pathname === `${classPath}/questions`
                  pathname === '/student/questions'
                    ? 'text-primary border-b-4 border-primary pb-[1rem] hover:text-primaryHover hover:border-primaryHover'
                    : 'hover:text-secondaryHover'
                }`}
              >
                Q&A
              </span>
            </Link>
          </section>
        )}

        {/* 분반 및 로그아웃 (sm 이상에서만 표시) */}
        {/* {!isSelectClassPage ? ( */}
        <section className="hidden sm:flex items-center ml-auto">
          <div className="flex items-center transition hover:text-secondaryHover cursor-pointer mr-7">
            <span>분반</span>
            <RiArrowDropDownLine className="text-4xl" />
          </div>
          <Link href="/">
            <div className="flex items-center transition hover:text-secondaryHover cursor-pointer">
              <span> 로그아웃</span>
              <MdLogout className="text-xl ml-2" />
            </div>
          </Link>
        </section>
        {/* ) : ( */}
        {/* <section className="hidden sm:flex items-center">
            <Link href="/">
              <div className="flex items-center transition hover:text-secondaryHover cursor-pointer">
                <span> 로그아웃</span>
                <MdLogout className="text-xl ml-2" />
              </div>
            </Link>
          </section> */}
        {/* )} */}
      </div>
      {/* 모바일 메뉴 (햄버거 메뉴 클릭 시 열림) */}
      <section
        className={`absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 sm:hidden z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? 'max-h-80 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        {/* {!isSelectClassPage && ( */}
        {/* <> */}
        <Link
          // href={`${classPath}/problems`}
          href={'/student/problems'}
          className={`w-full flex justify-center items-center py-3 hover:bg-gray-100  ${
            // pathname === `${classPath}/problems` &&
            pathname === '/student/problems' && 'text-primary font-semibold  '
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="cursor-pointer transition ">문제</span>
        </Link>
        {/* <Link
              href={`${classPath}/analysis`}
              className={`w-full flex justify-center items-center py-3 hover:bg-gray-100  ${
                pathname === `${classPath}/analysis` &&
                'text-primary font-semibold  '
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="cursor-pointer transition ">분석</span>
            </Link> */}
        <Link
          // href={`${classPath}/questions`}
          href={'/student/questions'}
          className={`w-full flex justify-center items-center py-3 hover:bg-gray-100  ${
            // pathname === `${classPath}/questions` &&
            pathname === '/student/questions' && 'text-primary font-semibold  '
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="cursor-pointer transition ">Q&A</span>
        </Link>

        <div className="w-full flex justify-center items-center py-3 hover:bg-gray-100 ">
          <span className="cursor-pointer transition flex items-center">
            분반 <RiArrowDropDownLine className="text-2xl" />
          </span>
        </div>
        {/* </> */}
        {/* )} */}

        {/* 로그아웃은 항상 표시 */}
        <Link
          href="/"
          className="w-full flex justify-center items-center py-3 hover:bg-gray-100 "
        >
          <span className="cursor-pointer transition flex items-center">
            로그아웃 <MdLogout className="text-lg ml-2" />
          </span>
        </Link>
      </section>
    </nav>
  );
}
