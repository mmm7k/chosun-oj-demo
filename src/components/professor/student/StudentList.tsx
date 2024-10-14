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

  const courseParam = searchParams.get('course') || null;
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    courseParam,
  );
  const [studentList, setStudentList] = useState<any[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get(
          '/mock/professor/student/studentlist.json',
        );
        setStudentList(response.data);

        const uniqueCourses = Array.from(
          new Set(response.data.map((item: any) => item.course)),
        ) as string[];

        setCourses(uniqueCourses);
        console.log('Courses:', uniqueCourses);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchStudentList();
  }, []);

  const handleCourseSelection = (course: string) => {
    setSelectedCourse(course);
    setCurrentPage(1);
    router.push(`/professor/student/list?course=${course}&page=1`);
  };

  const filteredList = studentList.filter(
    (item) => item.course === selectedCourse,
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
    router.push(
      `/professor/student/list?course=${selectedCourse}&page=${page}`,
    );
  };

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        {!selectedCourse ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <h1 className="text-xl">💡 과목 또는 대회를 선택하세요</h1>
            <Select
              placeholder="과목 또는 대회를 선택하세요."
              className="w-64"
              onChange={handleCourseSelection}
            >
              {courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </div>
        ) : (
          <>
            {/* Header */}
            <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
              <h1 className="text-lg mb-3 md:mb-0">학생 목록</h1>
              <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 space-x-4">
                <Select
                  placeholder="과목또는 대회를 선택하세요."
                  value={selectedCourse}
                  onChange={handleCourseSelection}
                  className="w-44"
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

            {/* Student List */}
            <section className="px-3 sm:px-16 overflow-x-auto">
              <table className="table-auto w-full text-sm text-left border-b-2">
                <thead>
                  <tr className="border-b-2">
                    <th className="p-4">학번</th>
                    <th className="p-4">이름</th>
                    <th className="p-4">학과</th>
                    <th className="p-4">수강 과목</th>
                    <th className="p-4">학생 관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 cursor-pointer border-b"
                    >
                      <td className="p-4 text-xs sm:text-sm">
                        {item.studentNumber}
                      </td>
                      <td className="p-4 text-xs sm:text-sm">{item.name}</td>
                      <td className="p-4 text-xs sm:text-sm">{item.major}</td>
                      <td className="p-4 text-xs sm:text-sm">{item.course}</td>
                      <td className="p-4 text-lg sm:text-xl">
                        <FiTrash2 className="text-lg lg:text-xl" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Pagination */}
            <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    changePage(Math.max(startPage - pagesPerBlock, 1))
                  }
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
          </>
        )}
      </div>
    </div>
  );
}
