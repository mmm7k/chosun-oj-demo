'use client';

import { Select } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function ProblemList() {
  const [selectedSolved, setSelectedSolved] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(
    null,
  );
  const [selectedAccuracy, setSelectedAccuracy] = useState<string | null>(null);

  const handleSolvedChange = (value: string | null) => {
    setSelectedSolved(value);
  };

  const handleLevelChange = (value: string | null) => {
    setSelectedLevel(value);
  };

  const handleSubmissionChange = (value: string | null) => {
    setSelectedSubmission(value);
  };

  const handleAccuracyChange = (value: string | null) => {
    setSelectedAccuracy(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [problemList, setProblemList] = useState<any[]>([]);
  const itemsPerPage = 9;
  const pagesPerBlock = 5;
  const pathname = usePathname();

  const parts = pathname.split('/');
  const selectedClass = parts.find(
    (part, index) =>
      parts[index - 1] === 'student' && parts[index + 1] === 'problems',
  );

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
        {/* 문제 검색 */}
        <div className="flex items-center bg-white shadow-md rounded-2xl px-4">
          <IoSearchSharp className="text-gray-400 text-lg" />
          <input
            type="text"
            className="w-full py-3 pl-3 focus:outline-none placeholder:text-sm text-sm"
            placeholder="문제 제목을 입력하세요."
          />
        </div>
        {/* 문제 필터 */}
        <section className="flex gap-4 mt-3  overflow-auto no-scrollbar overflow-y-hidden">
          <div className="h-9 w-full ">
            <Select
              id="solved-select"
              placeholder="상태를 선택하세요."
              value={selectedSolved}
              onChange={handleSolvedChange}
              className="w-full h-[85%] shadow-md custom-select rounded-xl"
              allowClear
            >
              <Option value="unsolved">안 푼 문제</Option>
              <Option value="solved">푼 문제</Option>
            </Select>
          </div>
          <div className="h-9 w-full">
            <Select
              id="level-select"
              placeholder="난이도를 선택하세요."
              value={selectedLevel}
              onChange={handleLevelChange}
              className="w-full h-[85%] shadow-md custom-select rounded-xl"
              allowClear
            >
              <Option value="1">Lv.1</Option>
              <Option value="2">Lv.2</Option>
              <Option value="3">Lv.3</Option>
            </Select>
          </div>
          <div className="h-9 w-full">
            <Select
              id="submission-select"
              placeholder="제출 인원"
              value={selectedSubmission}
              onChange={handleSubmissionChange}
              className="w-full h-[85%] shadow-md custom-select rounded-xl"
              allowClear
            >
              <Option value="ascending">제출 인원 오름차순</Option>
              <Option value="descending">제출 인원 내림차순</Option>
            </Select>
          </div>
          <div className="h-9 w-full">
            <Select
              id="accuracy-select"
              placeholder="정답률"
              value={selectedAccuracy}
              onChange={handleAccuracyChange}
              className="w-full h-[85%] shadow-md custom-select rounded-xl"
              allowClear
            >
              <Option value="ascending">정답률 오름차순</Option>
              <Option value="descending">정답률 내림차순</Option>
            </Select>
          </div>
        </section>
        {/* 문제 목록 */}
        <div className="mt-5 rounded-2xl border bg-white shadow-md text-sm text-gray-500">
          <div className="flex justify-between items-center rounded-t-2xl py-2 px-5 border-b bg-[#eeeff3] text-gray-800">
            <span className="w-[10%]">상태</span>
            <span className="w-[50%]">문제 이름</span>
            <span className="w-[10%]">난이도</span>
            <span className="w-[10%]">제출</span>
            <span className="w-[10%]">정답률</span>
          </div>
          {currentItems.map((item) => (
            <Link
              // href={`/student/${selectedClass}/problems/${item.id}`}
              href={`/student/problems/${item.id}`}
              key={item.id}
            >
              <div className="flex justify-between items-center text-sm py-5 px-5 border-b hover:bg-[#eeeff3] cursor-pointer last:border-none">
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
        <div className="flex justify-center items-center mt-4 space-x-1">
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
