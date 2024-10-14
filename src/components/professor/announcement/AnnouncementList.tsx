'use client';

import { Select, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import { TbEdit } from 'react-icons/tb';
import { FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';

const { Option } = Select;

export default function AnnouncementList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const pageParam = searchParams.get('page') || '1';
  const courseParam = searchParams.get('course') || null;

  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    courseParam,
  );

  const courses = [
    '기초프로그래밍 01분반',
    '심화프로그래밍 02분반',
    '알고리즘 대회',
  ];

  const list = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `공지 사항${i + 1}`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
    course: courses[Math.floor(Math.random() * courses.length)],
  }));

  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  const filteredList = list.filter(
    (item) => selectedCourse && item.course === selectedCourse,
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
    router.push(`/professor/announcement/list?${query.toString()}`);
  };

  const showDeleteModal = (id: number) => {
    setDeleteItemId(id);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    if (deleteItemId !== null) {
      console.log(`Delete item with ID: ${deleteItemId}`);
    }
    setIsModalVisible(false);
    setDeleteItemId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteItemId(null);
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
        {!selectedCourse ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <h1 className="text-xl">💡 과목 또는 대회를 선택하세요</h1>
            <Select
              placeholder="과목 또는 대회를 선택하세요."
              className="w-64"
              onChange={handleCourseChange}
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
            <section className="flex justify-between items-center px-0 md:px-16">
              <h1 className="text-lg">공지 목록</h1>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="w-56"
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
                    placeholder="공지를 검색해보세요"
                  />
                </div>
              </div>
            </section>

            <hr className="border-t-2 mt-5 border-gray-200" />

            <section className="flex flex-col px-3 sm:px-16">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="w-[10%]">{item.id}</span>
                  <span className="w-[60%]">{item.name}</span>
                  <span className="w-[20%]">{item.registrationTime}</span>
                  <span className="w-[10%] flex items-center">
                    <Link href={`/professor/announcement/list/${item.id}`}>
                      <TbEdit className="text-lg lg:text-xl mr-2" />
                    </Link>
                    <FiTrash2
                      className="text-lg lg:text-xl"
                      onClick={() => showDeleteModal(item.id)}
                    />
                  </span>
                </div>
              ))}
            </section>

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

                <div className="flex space-x-1">
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

            <Modal
              title="공지 삭제 확인"
              visible={isModalVisible}
              onOk={handleDelete}
              onCancel={handleCancel}
              okText="삭제"
              cancelText="취소"
            >
              <p>정말로 이 공지를 삭제하시겠습니까?</p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
