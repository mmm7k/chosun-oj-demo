'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useState } from 'react';
import { PiStudent } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdLogout, MdNotes } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function SideNav() {
  const pathname = usePathname();
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProblemsDropdownOpen, setIsProblemsDropdownOpen] = useState(false);
  const [isExampleDropdownOpen, setIsExampleDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태

  return (
    <nav className="w-screen 2xl:w-52 h-20 2xl:min-h-screen bg-white flex justify-center 2xl:fixed 2xl:left-0 2xl:top-0 text-secondary text-sm font-semibold shadow-xl">
      <div className="flex 2xl:flex-col items-center justify-between 2xl:justify-normal w-[100%] px-[5%] 2xl:px-0 2xl:min-h-screen relative">
        {/* 로고 이미지 */}
        <div className="w-9 2xl:w-16 h-9 2xl:h-16 relative 2xl:mt-11">
          <Link href="/admin/dashboard">
            <Image
              src="/commons/symbol.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>

        {/* 햄버거 메뉴 버튼 (2XL 이하에서만 보임) */}
        <div className="2xl:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* 메뉴 (2XL 이상에서 표시) */}
        <div className="hidden 2xl:block w-full px-[15%] space-y-9 mt-12">
          <Link href="/admin/dashboard">
            <div
              className={`flex justify-between items-center ${
                pathname === '/admin/dashboard'
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
            >
              <div className="flex items-center transition">
                <LuLayoutDashboard className="text-lg mr-2" />
                <span> 대시보드</span>
              </div>
            </div>
          </Link>
          {/* 학생 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname.startsWith('/admin/student')
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
              onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
            >
              <div className="flex items-center transition">
                <PiStudent className="text-xl mr-2" />
                <span>학생</span>
              </div>
              {isStudentDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            <ul
              className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-6 ${
                isStudentDropdownOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <li
                className={`transition mt-5 ${
                  pathname === '/admin/student/overview'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <Link href="/admin/student/overview">학생 개요</Link>
              </li>
            </ul>
          </div>
          {/* 문제 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname.startsWith('/admin/problems')
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
              onClick={() => setIsProblemsDropdownOpen(!isProblemsDropdownOpen)}
            >
              <div className="flex items-center transition">
                <HiOutlinePencilSquare className="text-xl mr-2" />
                <span>문제</span>
              </div>
              {isProblemsDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            <ul
              className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-6 ${
                isProblemsDropdownOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <li
                className={`transition mt-5 ${
                  pathname === '/admin/problems/list'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <Link href="/admin/problems/list">문제 목록</Link>
              </li>
              <li
                className={`transition ${
                  pathname === '/admin/problems/post'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <Link href="/admin/problems/post">문제 추가</Link>
              </li>
            </ul>
          </div>
          {/* example 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname.startsWith('/admin/example')
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
              onClick={() => setIsExampleDropdownOpen(!isExampleDropdownOpen)}
            >
              <div className="flex items-center transition">
                <MdNotes className="text-xl mr-2" />
                <span>example</span>
              </div>
              {isExampleDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            <ul
              className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-6 ${
                isExampleDropdownOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <li
                className={`transition mt-5 ${
                  pathname === '/admin/example/item1'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <Link href="/admin/example/item1">Item 1</Link>
              </li>
              <li
                className={`transition ${
                  pathname === '/admin/example/item2'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <Link href="/admin/example/item2">Item 2</Link>
              </li>
            </ul>
          </div>
          {/* 로그아웃 */}
          <Link href="/">
            <div className="2xl:absolute 2xl:bottom-10 cursor-pointer">
              <div className="flex items-center transition hover:text-secondaryHover">
                <MdLogout className="text-xl mr-2" />
                <span>로그아웃</span>
              </div>
            </div>
          </Link>
        </div>
        {/* 2xl 이하 메뉴 (햄버거 메뉴 클릭 시 열림) */}
        <div
          className={`absolute top-20 left-0 w-screen bg-white shadow-md flex flex-col justify-center items-center space-y-4 2xl:hidden z-50 overflow-hidden transition-all duration-[360ms] ease-in-out ${
            menuOpen
              ? 'max-h-[34rem] opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <Link
            href="/admin/dashboard"
            className="w-full flex justify-center items-center py-4 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`${
                pathname === '/admin/dashboard' && 'text-primary font-semibold'
              }`}
            >
              대시보드
            </span>
          </Link>

          {/* 학생 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/admin/student') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
            >
              <span className="flex items-center">
                <PiStudent className="text-xl mr-2" />
                학생
              </span>
              {isStudentDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isStudentDropdownOpen && (
              <ul className="space-y-2 bg-white w-full">
                <Link
                  href="/admin/student/overview"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/admin/student/overview' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    학생 개요
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 문제 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/admin/problems') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsProblemsDropdownOpen(!isProblemsDropdownOpen)}
            >
              <span className="flex items-center">
                <HiOutlinePencilSquare className="text-xl mr-2" />
                문제
              </span>
              {isProblemsDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isProblemsDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                <Link
                  href="/admin/problems/list"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/admin/problems/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    문제 목록
                  </li>
                </Link>
                <Link
                  href="/admin/problems/post"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/admin/problems/post' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    문제 추가
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* example 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/admin/example') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsExampleDropdownOpen(!isExampleDropdownOpen)}
            >
              <span className="flex items-center">
                <MdNotes className="text-xl mr-2" />
                example
              </span>
              {isExampleDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isExampleDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                <Link
                  href="/admin/example/item1"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/admin/example/item1' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    Item 1
                  </li>
                </Link>
                <Link
                  href="/admin/example/item2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/admin/example/item2' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    Item 2
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 로그아웃 */}
          <Link
            href="/"
            className="w-full flex justify-center items-center py-4 hover:bg-gray-100"
          >
            <span className="cursor-pointer flex items-center">
              로그아웃 <MdLogout className="text-lg ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
