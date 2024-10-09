'use client';

import { Select, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const { Option } = Select;

export default function MyProblemList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  // 쿼리 파라미터에서 page, year 값 읽기 (기본값은 1)
  const pageParam = searchParams.get('page') || '1';
  const yearParam = searchParams.get('year') || null;
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
  const [selectedYear, setSelectedYear] = useState<string | null>(yearParam);

  const handleYearChange = (value: string | null) => {
    setSelectedYear(value);
    setCurrentPage(1);
    updateQueryParams(1, value);
  };

  const updateQueryParams = (page: number, year: string | null) => {
    const query = new URLSearchParams();
    if (year) query.set('year', year);
    query.set('page', page.toString());
    router.push(`/professor/problems/mylist?${query.toString()}`);
  };

  // 문제 리스트에 연도 추가, 랜덤 배치
  const years = ['2020', '2021', '2022'];
  const list = Array.from({ length: 60 }, (_, i) => {
    const randomYearIndex = Math.floor(Math.random() * years.length);
    return {
      id: i + 1,
      name: `피라미드 별찍기${i + 1}`,
      registrationTime: `2024-9-2 16:19:${i + 1}`,
      year: years[randomYearIndex],
    };
  });

  const itemsPerPage = 9;
  const pagesPerBlock = 5;

  const filteredList = list.filter((item) =>
    selectedYear ? item.year === selectedYear : true,
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
    updateQueryParams(page, selectedYear);
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam));
    setSelectedYear(yearParam);
  }, [pageParam, yearParam]);

  // 삭제 모달 열기
  const showDeleteModal = (id: number) => {
    setDeleteItemId(id);
    setIsModalVisible(true);
  };

  // 삭제 모달에서 확인 버튼 클릭 시
  const handleDelete = () => {
    if (deleteItemId !== null) {
      console.log(`Delete item with ID: ${deleteItemId}`);
    }
    setIsModalVisible(false);
    setDeleteItemId(null);
  };

  // 삭제 모달에서 취소 버튼 클릭 시
  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteItemId(null);
  };
  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">나의 문제 목록</h1>
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
            <span className="w-[10%]">ID</span>
            <span className="w-[60%]">문제 이름</span>
            <span className="w-[20%]">문제 등록 시간</span>
            <span className="w-[20%]">문제 관리</span>
          </div>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
            >
              <span className="w-[10%] text-xs sm:text-sm">{item.id}</span>
              <span className="w-[60%] text-xs sm:text-sm">{item.name}</span>
              <span className="w-[20%] text-xs sm:text-sm">
                {item.registrationTime}
              </span>
              <span className="w-[20%] text-xs sm:text-base flex items-center">
                <Link href={`/professor/problems/mylist/${item.id}`}>
                  <TbEdit className="text-lg lg:text-xl mr-2" />
                </Link>

                <FiTrash2
                  className="text-lg lg:text-xl cursor-pointer"
                  onClick={() => showDeleteModal(item.id)}
                />
              </span>
            </div>
          ))}
        </section>

        {/* 페이지네이션 및 버튼 */}
        <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => changePage(Math.max(startPage - pagesPerBlock, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300"
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
              className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </section>

        {/* 삭제 확인 모달 */}
        <Modal
          title="문제 삭제 확인"
          visible={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="삭제"
          cancelText="취소"
        >
          <p>정말로 이 문제를 삭제하시겠습니까?</p>
        </Modal>
      </div>
    </div>
  );
}
