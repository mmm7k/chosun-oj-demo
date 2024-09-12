'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

export default function Problems() {
  const list = Array.from({ length: 60 }, (_, i) => i + 1);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수
  const pathname = usePathname();

  const parts = pathname.split('/');
  const selectedClass = parts.find(
    (part, index) =>
      parts[index - 1] === 'student' && parts[index + 1] === 'problems',
  );

  // 현재 페이지에 해당하는 항목들 가져오기
  const currentItems = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(list.length / itemsPerPage);

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
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-4">
            <IoSearchSharp className="text-gray-400 text-lg" />
            <input
              type="text"
              className="w-full py-3 pl-3  focus:outline-none placeholder:text-sm text-sm"
              placeholder="문제 제목을 입력하세요."
            />
          </div>

          {/* 문제 목록 */}
          <div className="mt-8 rounded-md border bg-white border-gray-300 text-sm text-gray-500">
            <div className="flex justify-between items-center py-2 px-5 border-b bg-gray-100 text-gray-800 ">
              <span className="w-[10%] ">상태</span>
              <span className="w-[60%] ">문제 이름</span>
              <span className="w-[20%] ">난이도</span>
              <span className="w-[10%]">제출</span>
            </div>
            {currentItems.map((item) => (
              <Link
                href={`/student/${selectedClass}/problems/${item}`}
                key={item}
              >
                <div className="flex justify-between items-center text-sm py-5 px-5 border-b  hover:bg-gray-100 cursor-pointer  last:border-none">
                  <span className="w-[10%] ">✔</span>
                  <span className="w-[60%] ">피라미드 별찍기{item}</span>
                  <span className="w-[20%] text-primary ">Lv.1</span>
                  <span className="w-[10%] flex items-center">{item}명</span>
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
              className="px-3 py-1 bg-gray-200 rounded  hover:bg-gray-300"
            >
              &lt;
            </button>

            <div className="flex space-x-1 font-normal">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${page === currentPage ? 'bg-primary text-white hover:bg-primaryButtonHover' : 'bg-gray-200 hover:bg-gray-300'}`}
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
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </main>
        {/* right  */}
        <aside className="flex-1 self-start p-8 text-sm bg-white border border-gray-300 rounded-md">
          <h1 className="font-semibold text-secondary mb-8">
            기초프로그래밍 01분반
          </h1>
          <ul className="space-y-7 text-gray-500 ">
            <li className="hover:text-gray-700 transition cursor-pointer">
              1. 변수
            </li>
            <li className="hover:text-gray-700 transition  cursor-pointer">
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
