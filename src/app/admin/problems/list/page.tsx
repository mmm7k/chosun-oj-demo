'use client';

import PrimaryButton from '@/components/PrimaryButton';
import Link from 'next/link';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';

export default function List() {
  const list = Array.from({ length: 60 }, (_, i) => i + 1);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수

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
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-md text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 relative ">
          <h1 className="text-xl">문제 목록</h1>
          <div className="absolute right-16 flex items-center w-[15%] border-[2px] border-gray-200 rounded-md px-3 py-2.5 ">
            <IoSearchSharp className="text-gray-400 text-xl" />
            <input
              className="w-full pb-0.5 pl-2  text-gray-500 text-sm  placeholder:text-sm placeholder:font-normal focus:outline-none "
              type="text"
              placeholder="문제를 검색해보세요"
            />
          </div>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col px-16 ">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[10%] ">ID</span>
            <span className="w-[60%] ">문제 이름</span>
            <span className="w-[20%] ">문제 등록 시간</span>
            <span className="w-[10%]">문제 관리</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item}
              className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="w-[10%] ">{item}</span>
              <span className="w-[60%] ">피라미드 별찍기{item}</span>
              <span className="w-[20%] ">2024-9-2 16:19:{item}</span>
              <span className="w-[10%] flex items-center">
                <TbEdit className="text-xl mr-2" />
                <FiTrash2 className="text-xl" />
              </span>
            </div>
          ))}
        </section>
        {/* 페이지네이션 및 버튼 */}
        <section className="flex justify-between w-full px-16 items-center mt-12">
          {/* 문제 등록 링크 버튼 */}
          <Link href="/admin/problems/post">
            <PrimaryButton text="문제 등록" />
          </Link>
          {/* 페이지네이션 */}
          <div className="flex items-center space-x-1">
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
        </section>
      </div>
    </div>
  );
}
