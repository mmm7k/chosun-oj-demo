'use client';

import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProblemsList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 page 값 읽기 (기본값은 1)
  const pageParam = searchParams.get('page') || '1';
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));

  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수

  // 문제 리스트
  const list = Array.from({ length: 60 }, (_, i) => {
    return {
      id: i + 1,
      name: `피라미드 별찍기${i + 1}`,
      registrationTime: `2024-9-2 16:19:${i + 1}`,
    };
  });

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

  // 페이지 변경 시 쿼리 스트링으로 업데이트
  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/professor/problems/list?page=${page}`);
  };

  useEffect(() => {
    // 쿼리 스트링에서 page 값이 바뀔 때 currentPage 업데이트
    setCurrentPage(parseInt(pageParam));
  }, [pageParam]);

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">전체 문제 목록</h1>

          <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
            <IoSearchSharp className="text-gray-500 text-lg mr-2" />
            <input
              className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
              type="text"
              placeholder="문제를 검색해보세요"
            />
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[10%]">ID</span>
            <span className="w-[70%] ">문제 이름</span>
            <span className="w-[20%] ">문제 등록 시간</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="w-[10%] text-xs sm:text-sm">{item.id}</span>
              <span className="w-[70%] text-xs sm:text-sm">{item.name}</span>
              <span className="w-[20%] text-xs sm:text-sm">
                {item.registrationTime}
              </span>
            </div>
          ))}
        </section>

        {/* 페이지네이션 및 버튼 */}
        <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
          <div className="flex items-center space-x-1">
            {/* < 버튼 - 이전 블록의 첫 페이지로 이동 */}
            <button
              onClick={() => changePage(Math.max(startPage - pagesPerBlock, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
            >
              &lt;
            </button>

            <div className="flex space-x-1 font-normal">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-1 rounded-xl ${
                    page === currentPage
                      ? 'bg-primary text-white hover:bg-primaryButtonHover'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* > 버튼 - 다음 블록의 첫 페이지로 이동 */}
            <button
              onClick={() =>
                changePage(Math.min(startPage + pagesPerBlock, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
