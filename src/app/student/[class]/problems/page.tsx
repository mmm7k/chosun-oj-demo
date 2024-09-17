'use client';

import { Select } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function Problems() {
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

  const list = Array.from({ length: 60 }, (_, i) => {
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

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수
  const pathname = usePathname();

  const parts = pathname.split('/');
  const selectedClass = parts.find(
    (part, index) =>
      parts[index - 1] === 'student' && parts[index + 1] === 'problems',
  );

  let filteredList = list
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

  // 현재 페이지에 해당하는 항목들 가져오기
  const currentItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // 현재 페이지 블록에 해당하는 페이지 번호들 가져오기
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="w-full flex justify-center text-secondary">
      <div className="w-[70%] flex gap-12 pt-14">
        {/* left */}
        <main className="w-[75%]">
          {/* 문제 검색 */}
          <div className="flex items-center bg-white shadow-md rounded-md px-4">
            <IoSearchSharp className="text-gray-400 text-lg" />
            <input
              type="text"
              className="w-full py-3 pl-3 focus:outline-none placeholder:text-sm text-sm"
              placeholder="문제 제목을 입력하세요."
            />
          </div>
          <section className="flex w-[100%] gap-4 mt-3">
            <Select
              id="solved-select"
              placeholder="상태를 선택하세요."
              value={selectedSolved}
              onChange={handleSolvedChange}
              className="w-full shadow-md custom-select"
              allowClear // 'x' 버튼을 통해 초기화 가능
            >
              <Option value="unsolved">안 푼 문제</Option>
              <Option value="solved">푼 문제</Option>
            </Select>
            <Select
              id="level-select"
              placeholder="난이도를 선택하세요."
              value={selectedLevel}
              onChange={handleLevelChange}
              className="w-full shadow-md custom-select "
              allowClear // 'x' 버튼을 통해 초기화 가능
            >
              <Option value="1">Lv.1</Option>
              <Option value="2">Lv.2</Option>
              <Option value="3">Lv.3</Option>
            </Select>
            <Select
              id="submission-select"
              placeholder="제출 인원"
              value={selectedSubmission}
              onChange={handleSubmissionChange}
              className="w-full shadow-md custom-select"
              allowClear
            >
              <Option value="ascending">제출 인원 오름차순</Option>
              <Option value="descending">제출 인원 내림차순</Option>
            </Select>
            <Select
              id="accuracy-select"
              placeholder="정답률"
              value={selectedAccuracy}
              onChange={handleAccuracyChange}
              className="w-full shadow-md custom-select"
              allowClear
            >
              <Option value="ascending">정답률 오름차순</Option>
              <Option value="descending">정답률 내림차순</Option>
            </Select>
          </section>
          {/* 문제 목록 */}
          <div className="mt-5 rounded-md border bg-white shadow-md text-sm text-gray-500">
            <div className="flex justify-between items-center py-2 px-5 border-b bg-[#eeeff3] text-gray-800">
              <span className="w-[10%]">상태</span>
              <span className="w-[50%]">문제 이름</span>
              <span className="w-[10%]">난이도</span>
              <span className="w-[10%]">제출</span>
              <span className="w-[10%]">정답률</span>
            </div>
            {currentItems.map((item) => (
              <Link
                href={`/student/${selectedClass}/problems/${item.id}`}
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
            {/* < 버튼 - 이전 블록의 첫 페이지로 이동 */}
            <button
              onClick={() => {
                const previousBlockStartPage = Math.max(
                  startPage - pagesPerBlock,
                  1,
                );
                setCurrentPage(previousBlockStartPage);
              }}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white rounded shadow-md hover:bg-[#eeeff3]"
            >
              &lt;
            </button>

            <div className="flex space-x-1 font-normal">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`shadow-md px-3 py-1 rounded ${
                    page === currentPage
                      ? 'bg-primary text-white hover:bg-primaryButtonHover'
                      : 'bg-white hover:bg-[#eeeff3]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* > 버튼 - 다음 블록의 첫 페이지로 이동 */}
            <button
              onClick={() => {
                const nextBlockStartPage = Math.min(endPage + 1, totalPages);
                setCurrentPage(nextBlockStartPage);
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white rounded shadow-md hover:bg-[#eeeff3]"
            >
              &gt;
            </button>
          </div>
        </main>
        {/* right */}
        <aside className="flex-1 self-start p-8 text-sm bg-white shadow-md rounded-md">
          <h1 className="font-semibold text-secondary mb-8">
            기초프로그래밍 01분반
          </h1>
          <ul className="space-y-7 text-gray-500">
            <li className="hover:text-gray-700 transition cursor-pointer">
              1. 변수
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              2. 문자열
            </li>
            <li className="text-primary hover:text-primaryHover transition font-semibold cursor-pointer">
              3. 반복문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              4. 조건문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              5. 포인터
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
