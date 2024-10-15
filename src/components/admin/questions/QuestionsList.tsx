'use client';

import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const { Option } = Select;

export default function QuestionsList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') || '1';
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    setCurrentPage(1);
    updateQueryParams(1, value);
  };

  const updateQueryParams = (page: number, course: string | null) => {
    const query = new URLSearchParams();
    if (course) query.set('course', course);
    query.set('page', page.toString());
    router.push(`/professor/questions?${query.toString()}`);
  };

  const courses = ['기초프로그래밍', '심화프로그래밍', '알고리즘', '기타'];

  // 예시 질문 리스트 생성
  const list = Array.from({ length: 60 }, (_, i) => {
    const randomCourseIndex = Math.floor(Math.random() * courses.length);
    return {
      id: i + 1,
      studentNumber: `2023${String(i + 1).padStart(3, '0')}`,
      name: `홍길동`,
      title: `${courses[randomCourseIndex]} 질문 `,
      detail: `${courses[randomCourseIndex]}에 대한 상세 질문 내용입니다. `,
      registrationTime: `2024-9-2 16:19:${i + 1}`,
      course: courses[randomCourseIndex],
    };
  });

  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  const filteredList = list.filter((item) =>
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

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitAnswer = (id: number) => {
    alert('답변이 등록되었습니다');
    setAnswers((prev) => ({ ...prev, [id]: '' }));
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam));
    setSelectedCourse(searchParams.get('course') || null);
  }, [pageParam, searchParams]);

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex flex-col items-center justify-between px-0 md:flex-row md:px-16">
          <h1 className="mb-3 text-lg md:mb-0">질문 목록</h1>
          <div className="items-center hidden space-x-2 sm:flex md:space-x-4">
            <Select
              id="course-select"
              placeholder="과목을 선택하세요."
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-56"
              allowClear
            >
              {courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>

            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
              <IoSearchSharp className="mr-2 text-lg text-gray-500" />
              <input
                className="w-full text-sm text-secondary placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                placeholder="질문를 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="mt-5 border-t-2 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          <div className="flex items-center justify-between py-6 border-b-2">
            <span className="w-[10%]">학번</span>
            <span className="w-[20%]">이름</span>
            <span className="w-[30%]">질문 제목</span>
            <span className="w-[20%]">시간</span>
            <span className="ml-2"></span>
          </div>

          {currentItems.map((item) => (
            <div key={item.id} className="border-b">
              <div
                className="flex items-center justify-between py-4 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => toggleQuestion(item.id)}
              >
                <span className="w-[10%]">{item.studentNumber}</span>
                <span className="w-[20%]">{item.name}</span>
                <span className="w-[30%]">{item.title}</span>
                <span className="w-[20%]">{item.registrationTime}</span>
                <span className="ml-2">
                  {openQuestionId === item.id ? (
                    <RiArrowDropUpLine className="text-2xl" />
                  ) : (
                    <RiArrowDropDownLine className="text-2xl" />
                  )}
                </span>
              </div>

              {openQuestionId === item.id && (
                <div className="p-4 rounded-b-lg">
                  <p className="mb-2 text-sm font-semibold">{item.detail}</p>
                  <textarea
                    className="w-full h-24 p-2 mt-2 text-sm border rounded-md resize-none placeholder:font-normal placeholder:text-sm focus:outline-none"
                    value={answers[item.id] || ''}
                    onChange={(e) =>
                      handleAnswerChange(item.id, e.target.value)
                    }
                    placeholder="답변을 입력하세요."
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-3 py-2 font-normal text-white rounded-md bg-primary hover:bg-primaryButtonHover"
                      onClick={() => submitAnswer(item.id)}
                    >
                      답변 등록
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="flex items-center justify-center w-full px-16 mt-4 sm:justify-end">
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
