'use client';

import axios from 'axios';
import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';

const { Option } = Select;

export default function StudentList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 page, course, year 값 읽기 (기본값은 1)
  const pageParam = searchParams.get('page') || '1';
  const courseParam = searchParams.get('course') || null;
  const yearParam = searchParams.get('year') || null;

  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    courseParam,
  );
  const [selectedYear, setSelectedYear] = useState<string | null>(yearParam);
  const [studentList, setStudentList] = useState<any[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  // Axios로 JSON 데이터를 불러오는 부분
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get(
          '/mock/professor/student/studentlist.json',
        );
        setStudentList(response.data);

        // 중복 없는 course와 year 값을 추출하여 셀렉트 박스에 사용
        const uniqueCourses = Array.from(
          new Set(response.data.map((item: any) => item.course)),
        ) as string[];
        const uniqueYears = Array.from(
          new Set(response.data.map((item: any) => item.year)),
        ) as string[];

        setCourses(uniqueCourses);
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchStudentList();
  }, []);

  const handleCourseChange = (value: string | null) => {
    setSelectedCourse(value);
    setCurrentPage(1);
    updateQueryParams(1, value, selectedYear);
  };

  const handleYearChange = (value: string | null) => {
    setSelectedYear(value);
    setCurrentPage(1);
    updateQueryParams(1, selectedCourse, value);
  };

  const updateQueryParams = (
    page: number,
    course: string | null,
    year: string | null,
  ) => {
    const query = new URLSearchParams();
    if (year) query.set('year', year);
    if (course) query.set('course', course);
    query.set('page', page.toString());
    router.push(`/professor/student/list?${query.toString()}`);
  };

  // 필터링된 리스트
  const filteredList = studentList
    .filter((item) => (selectedCourse ? item.course === selectedCourse : true))
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

  const changePage = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page, selectedCourse, selectedYear);
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam));
    setSelectedCourse(courseParam);
    setSelectedYear(yearParam);
  }, [pageParam, courseParam, yearParam]);

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">학생 목록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Select
              id="year-select"
              placeholder="연도를 선택하세요."
              value={selectedYear}
              onChange={handleYearChange}
              className="w-44"
              allowClear
            >
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>

            <Select
              id="course-select"
              placeholder="과목을 선택하세요."
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-44"
              allowClear
            >
              {courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>

            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
              <IoSearchSharp className="text-gray-500 text-lg mr-2" />
              <input
                className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                placeholder="학번, 이름으로 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[15%]">학번</span>
            <span className="w-[15%]">이름</span>
            <span className="w-[20%]">학과</span>
            <span className="w-[20%]">수강 과목</span>
            <span className="w-[10%]">학생 관리</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="w-[15%] text-xs sm:text-sm">
                {item.studentNumber}
              </span>
              <span className="w-[15%] text-xs sm:text-sm">{item.name}</span>
              <span className="w-[20%] text-xs sm:text-sm">{item.major}</span>
              <span className="w-[20%] text-xs sm:text-sm">{item.course}</span>
              <span className="w-[10%] text-xs sm:text-sm">
                <FiTrash2 className="text-lg lg:text-xl" />
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
