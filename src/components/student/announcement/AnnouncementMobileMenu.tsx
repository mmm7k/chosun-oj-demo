'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';

export default function AnnouncementMobileMenu({ course }: { course: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const decodedCourse = decodeURIComponent(course);
  return (
    <div className="block w-full bg-white lg:hidden ">
      <div
        className="flex items-center justify-center py-4 border-b border-gray-200 cursor-pointer "
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="mr-2 font-semibold text-secondary">카테고리</span>
        {isMenuOpen ? (
          <IoChevronUp className="text-xl text-gray-500 " />
        ) : (
          <IoChevronDown className="text-xl text-gray-500 " />
        )}
      </div>

      <div
        className={` overflow-hidden ${isMenuOpen ? ' h-auto py-3' : 'max-h-0'}`}
      >
        <ul className="space-y-4 text-gray-500">
          {/* 공통 공지 */}
          <Link href="/student/announcement/common">
            <li
              className={`${
                course === 'common'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer '
                  : 'hover:text-gray-700 transition cursor-pointer '
              } pl-[5%] py-2`}
            >
              공통 공지사항
            </li>
          </Link>

          {/* 자바 프로그래밍 */}
          <Link href="/student/announcement/자바%20프로그래밍">
            <li
              className={`${
                decodedCourse === '자바 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              자바 프로그래밍
            </li>
          </Link>

          {/* 기초 프로그래밍 */}
          <Link href="/student/announcement/기초%20프로그래밍">
            <li
              className={`${
                decodedCourse === '기초 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              기초 프로그래밍
            </li>
          </Link>

          {/* 알고리즘 */}
          <Link href="/student/announcement/알고리즘">
            <li
              className={`${
                decodedCourse === '알고리즘'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              알고리즘
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
