'use client';

import AnnouncementBanner from '@/components/student/announcement/AnnouncementBanner';
import AnnouncementList from '@/components/student/announcement/AnnouncementList';
import AnnouncementMenu from '@/components/student/announcement/AnnouncementMenu';
import AnnouncementMobileMenu from '@/components/student/announcement/AnnouncementMobileMenu';
import { Suspense } from 'react';

export default function Announcement({
  params,
}: {
  params: { course: string };
}) {
  const course = params.course;

  return (
    <>
      {/* lg 이하에서 카테고리 메뉴 */}
      <AnnouncementMobileMenu course={course} />
      <AnnouncementBanner course={course} />
      <div className="bg-[#f0f4fc] w-full flex  flex-col lg:flex-row  items-center lg:items-start justify-center text-secondary ">
        <div className="w-[90%] lg:w-[62%] flex gap-0 lg:gap-12 pt-12 items-start mb-44 ">
          {/* left */}
          {/* 공지사항 목록 */}
          <Suspense>
            <AnnouncementList />
          </Suspense>
          {/* right */}
          <AnnouncementMenu course={course} />
        </div>
      </div>
    </>
  );
}
