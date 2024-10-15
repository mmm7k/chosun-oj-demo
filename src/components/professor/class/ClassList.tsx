'use client';

import { Modal } from 'antd';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import { TbEdit } from 'react-icons/tb';
import { FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';

export default function ClassList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const pageParam = searchParams.get('page') || '1';
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));

  const list = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `기초프로그래밍 0${i + 1}분반`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
  }));

  const itemsPerPage = 15;
  const pagesPerBlock = 5;

  const currentItems = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    const query = new URLSearchParams({ page: page.toString() });
    router.push(`/professor/class/list?${query.toString()}`);
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

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex items-center justify-between px-0 md:px-16">
          <h1 className="text-lg">분반 목록</h1>
          <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
            <IoSearchSharp className="mr-2 text-lg text-gray-500" />
            <input
              className="w-full text-sm text-secondary placeholder:text-sm placeholder:font-normal focus:outline-none"
              type="text"
              placeholder="분반을 검색해보세요"
            />
          </div>
        </section>

        <hr className="mt-5 border-t-2 border-gray-200" />

        <section className="px-3 overflow-x-auto sm:px-16">
          <table className="w-full text-sm text-left border-b-2 table-auto">
            <thead>
              <tr className="border-b-2">
                <th className="p-4">ID</th>
                <th className="p-4">분반 이름</th>
                <th className="p-4">등록 시간</th>
                <th className="p-4">분반 관리</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-4 text-xs sm:text-sm">{item.id}</td>
                  <td className="p-4 text-xs sm:text-sm">{item.name}</td>
                  <td className="p-4 text-xs sm:text-sm">
                    {item.registrationTime}
                  </td>
                  <td className="flex items-center p-4 space-x-2 text-xs sm:text-base">
                    <Link href={`/professor/contest/list/${item.id}`}>
                      <TbEdit className="text-lg cursor-pointer lg:text-xl" />
                    </Link>
                    <FiTrash2
                      className="text-lg cursor-pointer lg:text-xl"
                      onClick={() => showDeleteModal(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          title="분반 삭제 확인"
          visible={isModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="삭제"
          cancelText="취소"
        >
          <p>정말로 이 분반을 삭제하시겠습니까?</p>
        </Modal>
      </div>
    </div>
  );
}
