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

export default function SideNav() {
  const pathname = usePathname();
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProblemsDropdownOpen, setIsProblemsDropdownOpen] = useState(false);
  const [isExampleDropdownOpen, setIsExampleDropdownOpen] = useState(false);

  const toggleStudentDropdown = () => {
    setIsStudentDropdownOpen(!isStudentDropdownOpen);
  };

  const toggleProblemsDropdown = () => {
    setIsProblemsDropdownOpen(!isProblemsDropdownOpen);
  };

  const toggleExampleDropdown = () => {
    setIsExampleDropdownOpen(!isExampleDropdownOpen);
  };

  return (
    <nav className="w-52 min-h-screen bg-white fixed left-0 top-0 text-secondary text-sm font-semibold ">
      <div className="flex flex-col items-center w-full min-h-screen relative">
        {/* 로고 이미지 */}
        <div className="w-16 h-16 relative mt-11">
          <Link href="/admin/dashboard">
            <Image
              src="/commons/symbol.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        {/* 메뉴 */}
        <div className="w-full px-[15%] space-y-9 mt-12">
          <Link href="/admin/dashboard">
            <div
              className={`flex justify-between  items-center  ${
                pathname === '/admin/dashboard'
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
            >
              <div className="flex items-center  transition">
                <LuLayoutDashboard className="text-lg mr-2" />
                <span> 대시보드</span>
              </div>
            </div>
          </Link>
          {/* 학생 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname.startsWith('/admin/stundet')
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
              onClick={toggleStudentDropdown}
            >
              <div className="flex items-center  transition">
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
              className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-6  ${
                isStudentDropdownOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <li
                className={`transition mt-5  ${
                  pathname === '/admin/student/overview'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/student/overview">학생 개요</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/student/attendance'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/student/attendance">출석 관리</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/student/grades'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/student/grades">성적 관리</Link>
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
              onClick={toggleProblemsDropdown}
            >
              <div className="flex items-center  transition">
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
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/problems/list">문제 목록</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/problems/post'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/problems/post">문제 추가</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/problems/analytics'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/problems/analytics">문제 분석</Link>
              </li>
            </ul>
          </div>
          {/* example 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center  ${
                pathname.startsWith('/admin/example')
                  ? 'text-primary hover:text-primaryHover'
                  : 'text-secondary hover:text-secondaryHover'
              }`}
              onClick={toggleExampleDropdown}
            >
              <div className="flex items-center  transition">
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
                className={`transition mt-5  ${
                  pathname === '/admin/example/item1'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/example/item1">Item 1</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/example/item2'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/example/item2">Item 2</Link>
              </li>
              <li
                className={`transition  ${
                  pathname === '/admin/example/item3'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover '
                }`}
              >
                <Link href="/admin/example/item3">Item 3</Link>
              </li>
            </ul>
          </div>
          {/* 로그아웃 */}
          <Link href="/">
            <div className="absolute bottom-10 cursor-pointer">
              <div className="flex items-center  transition hover:text-secondaryHover">
                <MdLogout className="text-xl mr-2" />
                <span>로그아웃</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
