import ProblemList from '@/components/student/problems/ProblemList';
import ProblemsBanner from '@/components/student/problems/ProblemsBanner';
import ProblemsMenu from '@/components/student/problems/ProblemsMenu';
import ProblemsMobileMenu from '@/components/student/problems/ProblemsMobileMenu';
import { Suspense } from 'react';

export default function Problems() {
  return (
    <>
      {/* lg 이하에서 카테고리*/}
      <Suspense>
        <ProblemsMobileMenu />
      </Suspense>
      {/* 배너 */}
      <ProblemsBanner />
      <main className="bg-[#f0f4fc] w-full flex flex-col lg:flex-row items-center lg:items-start justify-center text-secondary">
        <div className="w-[90%] lg:w-[62%] flex gap-0 lg:gap-12 pt-12 items-start mb-44">
          <ProblemList />
          <Suspense>
            <ProblemsMenu />
          </Suspense>
        </div>
      </main>
    </>
  );
}
