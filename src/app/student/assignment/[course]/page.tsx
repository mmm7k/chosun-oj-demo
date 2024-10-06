import AssignmentMenu from '@/components/student/assignment/AssignmentMenu';
import AssignmentMobileMenu from '@/components/student/assignment/AssignmentMobileMenu';
import AssignmentList from '@/components/student/assignment/AssignmentList';
import AssignmentBanner from '@/components/student/assignment/AssignmentBanner';
import { Suspense } from 'react';

export default function Assignment({ params }: { params: { course: string } }) {
  const course = params.course;

  return (
    <>
      {/* lg 이하에서 카테고리 메뉴 */}
      <AssignmentMobileMenu course={course} />
      <Suspense>
        <AssignmentBanner course={course} />
      </Suspense>
      <div className="bg-[#f0f4fc] w-full flex   flex-col lg:flex-row  items-center lg:items-start justify-center text-secondary ">
        <div className="w-[90%] lg:w-[62%] flex gap-0 pt-12 lg:gap-12  items-start mb-56 ">
          {/* left */}

          <AssignmentList course={course} />

          {/* right 카테고리 메뉴 */}
          <AssignmentMenu course={course} />
        </div>
      </div>
    </>
  );
}
