'use client';

import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';

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
      name: `${courses[randomCourseIndex]} 질문 ${i + 1}`,
      detail: `${courses[randomCourseIndex]}에 대한 상세 질문 내용입니다. 질문 번호: ${i + 1} `,
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
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">질문 목록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
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
              <IoSearchSharp className="text-gray-500 text-lg mr-2" />
              <input
                className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                placeholder="질문를 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="border-b-2 py-4 cursor-pointer"
              onClick={() => toggleQuestion(item.id)}
            >
              <div className="flex justify-between items-center   ">
                <span className="w-[10%]">{item.id}</span>
                <span className="w-[60%]">{item.name}</span>
                <span className="w-[20%]">{item.registrationTime}</span>
              </div>

              {openQuestionId === item.id && (
                <div className="mt-4 p-4  rounded-lg flex flex-col border-t border-b border-gray-200">
                  <p className="mb-4 text-sm text-gray-700">{item.detail}</p>
                  <textarea
                    className="w-full min-h-24 h-auto p-2 rounded-md border placeholder:font-normal focus:outline-none resize-none"
                    value={answers[item.id] || ''}
                    onChange={(e) =>
                      handleAnswerChange(item.id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                    placeholder="답변을 입력하세요."
                  />
                  <button
                    className=" ml-auto mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryButtonHover font-normal"
                    onClick={() => submitAnswer(item.id)}
                  >
                    답변 등록
                  </button>
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
