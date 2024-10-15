'use client';

import Link from 'next/link';

export default function AnnouncementMenu({ course }: { course: string }) {
  const decodedCourse = decodeURIComponent(course);
  return (
    <aside className="flex-1 hidden p-8 text-sm bg-white shadow-md lg:block rounded-2xl">
      <div className="flex flex-col w-full h-full space-y-7">
        <h1 className="mb-2 font-semibold text-secondary">카테고리</h1>
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
            className={`${decodedCourse === '자바 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            자바 프로그래밍
          </div>
        </Link>

        <Link href="/student/announcement/기초 프로그래밍">
          <div
            className={`${decodedCourse === '기초 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            기초 프로그래밍
          </div>
        </Link>
        <Link href="/student/announcement/알고리즘">
          <div
            className={`${decodedCourse === '알고리즘' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
          >
            알고리즘
          </div>
        </Link>
      </div>
    </aside>
  );
}
