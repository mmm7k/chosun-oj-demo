'use client';

import Link from 'next/link';

export default function AnnouncementMenu({ course }: { course: string }) {
  return (
    <aside className="hidden lg:block flex-1 p-8 text-sm bg-white shadow-md rounded-2xl">
      <div className="w-full h-full flex flex-col space-y-7">
        <h1 className="font-semibold text-secondary mb-2">카테고리</h1>
        <Link href="/student/announcement/common">
          <div
            className={`${
              course === 'common'
                ? 'text-primary hover:text-primaryHover transition font-semibold cursor-pointer'
                : 'hover:text-gray-900 transition cursor-pointer'
            }`}
          >
            공통 공지사항
          </div>
        </Link>
        <Link href="/student/announcement/자바 프로그래밍">
          <div
            className={`${decodeURIComponent(course) === '자바 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            자바 프로그래밍
          </div>
        </Link>

        <Link href="/student/announcement/기초 프로그래밍">
          <div
            className={`${decodeURIComponent(course) === '기초 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            기초 프로그래밍
          </div>
        </Link>
        <Link href="/student/announcement/알고리즘">
          <div
            className={`${decodeURIComponent(course) === '알고리즘' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            알고리즘
          </div>
        </Link>
      </div>
    </aside>
  );
}
