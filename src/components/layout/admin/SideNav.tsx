'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useState } from 'react';
import { PiStudent } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdNotes } from 'react-icons/md';

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
    <nav className="w-52 h-full bg-white fixed left-0 top-0 text-primaryFont text-sm font-semibold">
      <div className="flex flex-col items-center w-full h-full">
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
                  ? 'text-primary'
                  : 'text-primaryFont'
              }`}
            >
              <div className="flex items-center ">
                <LuLayoutDashboard className="text-lg mr-2" />
                <span> 대시보드</span>
              </div>
            </div>
          </Link>
          {/* 학생 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname === '/admin/student'
                  ? 'text-primary'
                  : 'text-primaryFont'
              }`}
              onClick={toggleStudentDropdown}
            >
              <div className="flex items-center">
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
              <li className="mt-5">
                <Link href="/admin/student/overview">학생 개요</Link>
              </li>
              <li>
                <Link href="/admin/student/attendance">출석 관리</Link>
              </li>
              <li>
                <Link href="/admin/student/grades">성적 관리</Link>
              </li>
            </ul>
          </div>
          {/* 문제 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center ${
                pathname === '/admin/problems'
                  ? 'text-primary'
                  : 'text-primaryFont'
              }`}
              onClick={toggleProblemsDropdown}
            >
              <div className="flex items-center">
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
              <li className="mt-5">
                <Link href="/admin/problems/list">문제 목록</Link>
              </li>
              <li>
                <Link href="/admin/problems/add">문제 추가</Link>
              </li>
              <li>
                <Link href="/admin/problems/analytics">문제 분석</Link>
              </li>
            </ul>
          </div>
          {/* example 드롭다운 */}
          <div>
            <div
              className={`flex justify-between cursor-pointer items-center  ${
                pathname === '/admin/example'
                  ? 'text-primary'
                  : 'text-primaryFont'
              }`}
              onClick={toggleExampleDropdown}
            >
              <div className="flex items-center">
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
              <li className="mt-5">
                <Link href="/admin/example/item1">Item 1</Link>
              </li>
              <li>
                <Link href="/admin/example/item2">Item 2</Link>
              </li>
              <li>
                <Link href="/admin/example/item3">Item 3</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
