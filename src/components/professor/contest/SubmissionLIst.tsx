'use client';

import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const { Option } = Select;

export default function SubmissionList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSubmissionId, setOpenSubmissionId] = useState<number | null>(null);

  const pageParam = searchParams.get('page') || '1';
  const courseParam = searchParams.get('course') || null;

  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    courseParam,
  );

  const courses = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];

  // 랜덤 IP 생성 함수
  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256,
    )}.${Math.floor(Math.random() * 256)}`;
  };

  const submissions = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    studentId: `2023${String(i + 1).padStart(3, '0')}`,
    studentName: `학생${i + 1}`,
    problemName: `문제 ${i + 1}`,
    submissionTime: `2024-9-2 16:19:${i + 1}`,
    isSuccess: Math.random() > 0.5,
    course: courses[Math.floor(Math.random() * courses.length)],
    ip: generateRandomIP(), // IP 주소 추가
    code: `console.log('Hello, World ${i + 1}!');`,
  }));

  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  const filteredList = submissions.filter((item) =>
    selectedCourse ? item.course === selectedCourse : true,
  );

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

  const changePage = (page: number) => {
    setCurrentPage(page);
    updateQueryParams(page, selectedCourse);
  };

  const updateQueryParams = (page: number, course: string | null) => {
    const query = new URLSearchParams();
    if (course) query.set('course', course);
    query.set('page', page.toString());
    router.push(`/professor/assignment/submission?${query.toString()}`);
  };

  const toggleSubmission = (id: number) => {
    setOpenSubmissionId(openSubmissionId === id ? null : id);
  };

  const handleCourseChange = (value: string | null) => {
    setSelectedCourse(value);
    setCurrentPage(1);
    updateQueryParams(1, value);
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam));
    setSelectedCourse(courseParam);
  }, [pageParam, courseParam]);

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16 mb-6">
          <h1 className="text-lg">제출 목록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
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
                placeholder="문제를 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[10%]">학번</span>
            <span className="w-[15%]">이름</span>
            <span className="w-[25%]">문제 이름</span>
            <span className="w-[10%]">과목</span>
            <span className="w-[10%]">IP</span>
            <span className="w-[10%]">성공 여부</span>
            <span className="w-[20%]">제출 시간</span>
          </div>

          {currentItems.map((item) => (
            <div key={item.id} className="border-b">
              <div
                className="flex justify-between items-center py-4 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleSubmission(item.id)}
              >
                <span className="w-[10%]">{item.studentId}</span>
                <span className="w-[15%]">{item.studentName}</span>
                <span className="w-[25%]">{item.problemName}</span>
                <span className="w-[10%]">{item.course}</span>
                <span className="w-[10%]">{item.ip}</span>
                <span className="w-[10%] flex justify-center">
                  {item.isSuccess ? (
                    <FiCheckCircle className="text-green-500 text-lg" />
                  ) : (
                    <FiXCircle className="text-red-500 text-lg" />
                  )}
                </span>
                <span className="w-[20%]">{item.submissionTime}</span>
                <span className="ml-2">
                  {openSubmissionId === item.id ? (
                    <RiArrowDropUpLine className="text-2xl" />
                  ) : (
                    <RiArrowDropDownLine className="text-2xl" />
                  )}
                </span>
              </div>

              {openSubmissionId === item.id && (
                <div className="p-4 rounded-b-lg">
                  <p className="text-sm font-semibold mb-2">제출 코드:</p>
                  <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
                    {item.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
          <div className="flex items-center space-x-1">
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
