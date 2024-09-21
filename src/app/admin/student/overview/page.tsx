'use client';

import { Select } from 'antd';
import { SetStateAction, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function StudentList() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  // 임의의 학생 리스트 데이터에 과목과 연도를 랜덤하게 배치
  const subjects = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];
  const years = ['2020', '2021', '2022'];

  const list = Array.from({ length: 60 }, (_, i) => {
    const randomSubjectIndex = Math.floor(Math.random() * subjects.length); // 과목을 랜덤하게 배치
    const randomYearIndex = Math.floor(Math.random() * years.length); // 연도를 랜덤하게 배치

    return {
      id: i + 1,
      studentNumber: `2020111${i + 1}`,
      name: ['박준걸', '전성환', '김재호', '안재빈', '김민수'][i % 5],
      email: `example@chosun.ac.kr${i + 1}`,
      department: '컴퓨터공학과',
      subject: subjects[randomSubjectIndex],
      year: years[randomYearIndex], // 연도와 과목을 랜덤하게 배치
    };
  });

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 9; // 한 페이지당 항목 수
  const pagesPerBlock = 5; // 한 페이지 블록당 페이지 수

  // 필터링된 리스트 (선택된 과목 및 연도에 따라 필터링)
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
        <section className="flex flex-col md:flex-row  items-center justify-between px-0 md:px-16">
          <h1 className="text-xl mb-3 md:mb-0">학생 목록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Select
              id="year-select"
              placeholder="연도를 선택하세요."
              value={selectedYear}
              onChange={handleYearChange}
              className="w-44 admin-custom-select "
              allowClear
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
              className="w-44 admin-custom-select "
              allowClear
            >
              <Option value="기초프로그래밍">기초프로그래밍</Option>
              <Option value="심화프로그래밍">심화프로그래밍</Option>
              <Option value="알고리즘">알고리즘</Option>
            </Select>

            <div className="flex items-center border-[2px] border-gray-200 rounded-2xl px-3 py-2.5 w-[16rem]">
              <IoSearchSharp className="text-gray-400 text-xl" />
              <input
                className="w-full pl-2 text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                placeholder="학번,이름,이메일로 검색해보세요"
              />
            </div>
          </div>

          {/* sm 이하 일 떄 필터,검색 */}
          <div className=" w-full sm:hidden flex-col  space-y-3 ">
            <div className="space-x-[2%] flex justify-center">
              <Select
                id="year-select"
                placeholder="연도를 선택하세요."
                value={selectedYear}
                onChange={handleYearChange}
                className="w-[43%] admin-custom-select "
                allowClear
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
                className="w-[43%] admin-custom-select "
                allowClear
              >
                <Option value="기초프로그래밍">기초프로그래밍</Option>
                <Option value="심화프로그래밍">심화프로그래밍</Option>
                <Option value="알고리즘">알고리즘</Option>
              </Select>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center border-[2px] border-gray-200 rounded-2xl px-3 py-2.5 w-[88%]">
                <IoSearchSharp className="text-gray-400 text-xl" />
                <input
                  className="w-full pl-2 text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                  type="text"
                  placeholder="학번,이름,이메일로 검색해보세요"
                />
              </div>
            </div>
          </div>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col px-3 sm:px-16 ">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[20%] lg:w-[10%] ">학번</span>
            <span className="w-[20%] lg:w-[60%] ">이름</span>
            <span className="w-[40%] lg:w-[20%] ">이메일</span>
            <span className="w-[20%]">학과</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-5 border-b-2 hover:bg-gray-100 cursor-pointer "
            >
              <span className="w-[20%] lg:w-[10%] text-xs sm:text-base ">
                {item.studentNumber}
              </span>
              <span className="w-[20%] lg:w-[60%] text-xs sm:text-base  ">
                {item.name}
              </span>
              <span className="w-[40%] lg:w-[20%] text-xs sm:text-base  ">
                {item.email}
              </span>
              <span className="w-[20%] text-xs sm:text-base ">
                {item.department}
              </span>
            </div>
          ))}
        </section>
        {/* 페이지네이션 및 버튼 */}
        <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
          {/* 페이지네이션 */}
          <div className="flex items-center space-x-1 ">
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
              onClick={() => {
                const nextBlockStartPage = Math.min(endPage + 1, totalPages);
                setCurrentPage(nextBlockStartPage);
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
