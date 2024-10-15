'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { TbEdit } from 'react-icons/tb';

export default function CourseList() {
  const router = useRouter();

  const [studentList, setStudentList] = useState<any[]>([]);
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
        console.log('Student List:', response.data);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchStudentList();
  }, []);

  const currentItems = studentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(studentList.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/admin/course/list?page=${page}`);
  };

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        {/* Header */}
        <section className="flex flex-col items-center justify-between px-0 md:flex-row md:px-16">
          <h1 className="mb-3 text-lg md:mb-0">강의 목록</h1>
          <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
            <IoSearchSharp className="mr-2 text-lg text-gray-500" />
            <input
              className="w-full text-sm text-secondary placeholder:text-sm placeholder:font-normal focus:outline-none"
              type="text"
              placeholder="강의 이름으로 검색해보세요"
            />
          </div>
        </section>

        <hr className="mt-5 border-t-2 border-gray-200" />

        {/* Course List */}
        <section className="px-3 overflow-x-auto sm:px-16">
          <table className="w-full text-sm text-left border-b-2 table-auto">
            <thead>
              <tr className="border-b-2">
                <th className="p-4">강의</th>
                <th className="p-4">설명</th>
                <th className="p-4">과목 코드</th>
                <th className="p-4">년도</th>
                <th className="p-4">강의 관리</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b cursor-pointer hover:bg-gray-50"
                >
                  {/* <td className="p-4 text-xs sm:text-sm">
                    {item.studentNumber}
                  </td> */}
                  <td className="p-4 text-xs sm:text-sm">기초프로그래밍</td>
                  {/* <td className="p-4 text-xs sm:text-sm">{item.name}</td> */}
                  <td className="p-4 text-xs sm:text-sm">
                    2024년도 1학기 기초프로그래밍
                  </td>

                  {/* <td className="p-4 text-xs sm:text-sm">{item.student_id}</td> */}
                  <td className="p-4 text-xs sm:text-sm">40098</td>

                  {/* <td className="p-4 text-xs sm:text-sm">{item.email}</td> */}
                  <td className="p-4 text-xs sm:text-sm">2024</td>

                  <td className="flex items-center p-4 space-x-2 text-xs sm:text-base">
                    <TbEdit className="text-lg cursor-pointer lg:text-xl" />
                    <FiTrash2 className="text-lg lg:text-xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Pagination */}
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
