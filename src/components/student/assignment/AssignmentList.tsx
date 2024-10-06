'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AssignmentList() {
  const [selectedSolved, setSelectedSolved] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(
    null,
  );
  const [selectedAccuracy, setSelectedAccuracy] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [problemList, setProblemList] = useState<any[]>([]);
  const itemsPerPage = 12;
  const pagesPerBlock = 5;
  const pathname = usePathname();

  const parts = pathname.split('/');

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

  let filteredList = problemList
    .filter((item) => (selectedSolved ? item.solved === selectedSolved : true))
    .filter((item) =>
      selectedLevel ? item.level === `Lv.${selectedLevel}` : true,
    );

  if (selectedSubmission) {
    filteredList = filteredList.sort((a, b) =>
      selectedSubmission === 'ascending'
        ? a.submissionCount - b.submissionCount
        : b.submissionCount - a.submissionCount,
    );
  }

  if (selectedAccuracy) {
    filteredList = filteredList.sort((a, b) =>
      selectedAccuracy === 'ascending'
        ? a.accuracyRate - b.accuracyRate
        : b.accuracyRate - a.accuracyRate,
    );
  }

  const currentItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  return (
    <>
      <main className="w-full lg:w-[75%]">
        {/* 문제 목록 */}
        <div className="rounded-2xl border bg-white shadow-md text-sm text-gray-500">
          <div className="flex justify-between items-center rounded-t-2xl py-2 px-5 border-b bg-[#eeeff3] text-gray-800">
            <span className="w-[10%]">상태</span>
            <span className="w-[50%]">문제 이름</span>
            <span className="w-[10%]">난이도</span>
            <span className="w-[10%]">제출</span>
            <span className="w-[10%]">정답률</span>
          </div>
          {currentItems.map((item) => (
            <Link href={`/student/problems/${item.id}`} key={item.id}>
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
        <div className="flex justify-center items-center mt-16 space-x-1">
          <button
            onClick={() => {
              const previousBlockStartPage = Math.max(
                startPage - pagesPerBlock,
                1,
              );
              setCurrentPage(previousBlockStartPage);
            }}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white rounded-2xl shadow-md hover:bg-[#eeeff3]"
          >
            &lt;
          </button>

          <div className="flex space-x-1 font-normal">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
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
            onClick={() => {
              const nextBlockStartPage = Math.min(endPage + 1, totalPages);
              setCurrentPage(nextBlockStartPage);
            }}
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
