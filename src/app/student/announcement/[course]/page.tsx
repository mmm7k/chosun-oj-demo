'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';
import AnnouncementList from '@/components/student/AnnouncementList';

export default function Announcement({
  params,
}: {
  params: { course: string };
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 현재 url 파라미터 확인
  const pathname = params;
  console.log(pathname.course);

  return (
    <div className="bg-[#f0f4fc] w-full flex  flex-col lg:flex-row  items-center lg:items-start justify-center text-secondary ">
      {/* lg 이하에서 카테고리 메뉴 */}
      <div className="block lg:hidden bg-white w-full ">
        <div
          className="flex justify-center items-center cursor-pointer py-4 border-b border-gray-200 "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="font-semibold text-secondary mr-2">카테고리</span>
          {isMenuOpen ? (
            <IoChevronUp className="text-xl text-gray-500 " />
          ) : (
            <IoChevronDown className="text-xl text-gray-500 " />
          )}
        </div>

        <div
          className={` overflow-hidden ${isMenuOpen ? ' h-auto py-3' : 'max-h-0'}`}
        >
          <ul className="space-y-4  text-gray-500">
            {/* 공통 공지 */}
            <li
              className={`${
                pathname.course === 'common'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer '
                  : 'hover:text-gray-700 transition cursor-pointer '
              } pl-[5%] py-2`}
            >
              공통 공지사항
            </li>

            {/* 자바 프로그래밍 */}

            <li
              className={`${
                decodeURIComponent(pathname.course) === '자바 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              자바 프로그래밍
            </li>

            <li
              className={`${
                decodeURIComponent(pathname.course) === '기초 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              기초 프로그래밍
            </li>

            <li
              className={`${
                decodeURIComponent(pathname.course) === '알고리즘'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              } pl-[5%] py-2`}
            >
              알고리즘
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[90%] lg:w-[62%] flex gap-0 lg:gap-12 pt-14 items-start mb-44 ">
        {/* left */}

        {/* 공지사항 목록 */}

        <AnnouncementList />

        {/* right */}
        <aside className="hidden lg:block flex-1 p-8 text-sm bg-white shadow-md rounded-2xl">
          <div className="w-full h-full flex flex-col space-y-7">
            <h1 className="font-semibold text-secondary mb-2">카테고리</h1>
            <Link href="/student/announcement/common">
              <div
                className={`${
                  pathname.course === 'common'
                    ? 'text-primary hover:text-primaryHover transition font-semibold cursor-pointer'
                    : 'hover:text-gray-900 transition cursor-pointer'
                }`}
              >
                공통 공지사항
              </div>
            </Link>
            <Link href="/student/announcement/자바 프로그래밍">
              <div
                className={`${decodeURIComponent(pathname.course) === '자바 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
              >
                자바 프로그래밍
              </div>
            </Link>

            <Link href="/student/announcement/기초 프로그래밍">
              <div
                className={`${decodeURIComponent(pathname.course) === '기초 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
              >
                기초 프로그래밍
              </div>
            </Link>
            <Link href="/student/announcement/알고리즘">
              <div
                className={`${decodeURIComponent(pathname.course) === '알고리즘' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
              >
                알고리즘
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
