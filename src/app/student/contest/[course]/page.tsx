import { Suspense } from 'react';
import ContestProblemList from '@/components/student/contest/ContestProblemList';
import ContestBanner from '@/components/student/contest/ContestBanner';

export default function Contest({ params }: { params: { course: string } }) {
  const course = params.course;

  return (
    <>
      <Suspense>
        <ContestBanner course={course} />
      </Suspense>
      <div className="bg-[#f0f4fc] w-full flex items-center justify-center ">
        <div className="w-[90%] lg:w-[62%]  pt-12 mb-44 ">
          <ContestProblemList course={course} />
        </div>
      </div>
    </>
  );
}
