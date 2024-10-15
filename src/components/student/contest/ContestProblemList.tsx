'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ContestProblemList({ course }: { course: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // 쿼리 파라미터에서 page 값 읽기
  const pageParam = searchParams.get('page') || '1';

  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [problemList, setProblemList] = useState<any[]>([]);
  const itemsPerPage = 12;
  const pagesPerBlock = 5;

  useEffect(() => {
    const generateRandomList = () => {
      return Array.from({ length: 60 }, (_, i) => {
        const randomLevel = Math.floor(Math.random() * 3) + 1;
        const randomSolved = Math.random() > 0.5 ? 'solved' : 'unsolved';
        const randomSubmission = Math.floor(Math.random() * 100) + 1;
        const randomAccuracy = Math.floor(Math.random() * 101);

        return {
          id: i + 1,
          name: `피라미드 별찍기${i + 1}`,
          level: `Lv.${randomLevel}`,
          solved: randomSolved,
          submissionCount: randomSubmission,
          accuracyRate: randomAccuracy,
        };
      });
    };

    setProblemList(generateRandomList());
  }, []);

  const currentItems = problemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(problemList.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  // 페이지 변경 시 쿼리 스트링으로 page 추가, course 유지
  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/student/contest/${course}?page=${page}`);
  };

  useEffect(() => {
    // 쿼리 스트링에서 page 값이 바뀔 때 currentPage 업데이트
    setCurrentPage(parseInt(pageParam));
  }, [pageParam]);

  return (
    <>
      <main className="w-full">
        {/* 문제 목록 */}
        <div className="text-sm text-gray-500 bg-white border shadow-md rounded-2xl">
          <div className="flex justify-between items-center rounded-t-2xl py-2 px-5 border-b bg-[#eeeff3] text-gray-800">
            <span className="w-[10%]">상태</span>
            <span className="w-[50%]">문제 이름</span>
            <span className="w-[10%]">난이도</span>
            <span className="w-[10%]">제출</span>
            <span className="w-[10%]">정답률</span>
          </div>
          {currentItems.map((item) => (
            <Link href={`${pathname}/${item.id}`} key={item.id}>
              <div className="flex justify-between items-center text-sm py-5 px-5 border-b hover:bg-[#eeeff3] cursor-pointer ">
                <span className="w-[10%] text-green-500 font-bold">
                  {item.solved === 'solved' ? '✔' : ''}
                </span>
                <span className="w-[50%]">{item.name}</span>
                <span
                  className={`w-[10%] font-semibold ${
                    item.level === 'Lv.1'
                      ? 'text-green-400'
                      : item.level === 'Lv.2'
                        ? 'text-sky-400'
                        : 'text-rose-400'
                  }`}
                >
                  {item.level}
                </span>
                <span className="w-[10%] flex items-center">
                  {item.submissionCount}명
                </span>
                <span className="w-[10%] flex items-center">
                  {item.accuracyRate}%
                </span>
              </div>
            </Link>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className="flex items-center justify-center mt-16 space-x-1">
          <button
            onClick={() => changePage(Math.max(startPage - pagesPerBlock, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white rounded-2xl shadow-md hover:bg-[#eeeff3]"
          >
            &lt;
          </button>

          <div className="flex space-x-1 font-normal">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`shadow-md px-3 py-1 rounded-2xl ${
                  page === currentPage
                    ? 'bg-primary text-white hover:bg-primaryButtonHover'
                    : 'bg-white hover:bg-[#eeeff3]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              changePage(Math.min(startPage + pagesPerBlock, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-white rounded-2xl shadow-md hover:bg-[#eeeff3]"
          >
            &gt;
          </button>
        </div>
      </main>
    </>
  );
}
