'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { Select } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';

const { Option } = Select;

export default function ProblemsList() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleSubjectChange = (value: string | null) => {
    setSelectedSubject(value);
  };

  const handleYearChange = (value: string | null) => {
    setSelectedYear(value);
  };

  // 문제 리스트에 과목 및 연도 추가, 랜덤 배치
  const subjects = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];
  const years = ['2020', '2021', '2022'];

  const list = Array.from({ length: 60 }, (_, i) => {
    const randomSubjectIndex = Math.floor(Math.random() * subjects.length); // 과목을 랜덤하게 배치
    const randomYearIndex = Math.floor(Math.random() * years.length); // 연도를 랜덤하게 배치

    return {
      id: i + 1,
      name: `피라미드 별찍기${i + 1}`,
      registrationTime: `2024-9-2 16:19:${i + 1}`,
      subject: subjects[randomSubjectIndex],
      year: years[randomYearIndex], // 랜덤하게 연도 배정
    };
  });

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수

  // 필터링된 문제 리스트 (선택된 과목 및 연도에 따라 필터링)
  const filteredList = list
    .filter((item) =>
      selectedSubject ? item.subject === selectedSubject : true,
    )
    .filter((item) => (selectedYear ? item.year === selectedYear : true));

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
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex items-center justify-between px-16">
          <h1 className="text-xl">문제 목록</h1>
          <div className="flex items-center space-x-4">
            <Select
              id="year-select"
              placeholder="연도를 선택하세요."
              value={selectedYear}
              onChange={handleYearChange}
              className="w-44 admin-custom-select"
              allowClear // 'x' 버튼을 통해 초기화 가능
            >
              <Option value="2020">2020</Option>
              <Option value="2021">2021</Option>
              <Option value="2022">2022</Option>
            </Select>

            <Select
              id="subject-select"
              placeholder="과목을 선택하세요."
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-44 admin-custom-select"
              allowClear // 'x' 버튼을 통해 초기화 가능
            >
              <Option value="기초프로그래밍">기초프로그래밍</Option>
              <Option value="심화프로그래밍">심화프로그래밍</Option>
              <Option value="알고리즘">알고리즘</Option>
            </Select>

            <div className="flex items-center border-[2px] border-gray-200 rounded-2xl px-3 py-2.5 w-[16rem]">
              <IoSearchSharp className="text-gray-400 text-xl" />
              <input
                className="w-full pl-2 text-secondary  text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                placeholder="문제를 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[10%]">ID</span>
            <span className="w-[60%]">문제 이름</span>
            <span className="w-[20%]">문제 등록 시간</span>
            <span className="w-[10%]">문제 관리</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="w-[10%]">{item.id}</span>
              <span className="w-[60%]">{item.name}</span>
              <span className="w-[20%]">{item.registrationTime}</span>
              <span className="w-[10%] flex items-center">
                <TbEdit className="text-xl mr-2" />
                <FiTrash2 className="text-xl" />
              </span>
            </div>
          ))}
        </section>

        {/* 페이지네이션 및 버튼 */}
        <section className="flex justify-between w-full px-16 items-center mt-10">
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
              className="px-3 py-1 bg-gray-200 rounded-xl  hover:bg-gray-300"
            >
              &lt;
            </button>

            <div className="flex space-x-1 font-normal">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-xl  ${
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
              onClick={() => {
                const nextBlockStartPage = Math.min(endPage + 1, totalPages);
                setCurrentPage(nextBlockStartPage);
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-xl  hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
