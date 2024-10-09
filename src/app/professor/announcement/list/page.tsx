// 'use client';

// import { Select, Modal } from 'antd';
// import { useState, useEffect } from 'react';
// import { IoSearchSharp } from 'react-icons/io5';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { TbEdit } from 'react-icons/tb';
// import { FiTrash2 } from 'react-icons/fi';
// import Link from 'next/link';

// const { Option } = Select;

// export default function AnnouncementList() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

//   // 쿼리 파라미터에서 page 값 읽기 (기본값은 1)
//   const pageParam = searchParams.get('page') || '1';
//   const [currentPage, setCurrentPage] = useState<number>(parseInt(pageParam));
//   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

//   const handleCourseChange = (value: string) => {
//     setSelectedCourse(value);
//   };

//   // 문제 리스트에 과목을 랜덤하게 배치
//   const courses = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];

//   const list = Array.from({ length: 60 }, (_, i) => {
//     const randomCourseIndex = Math.floor(Math.random() * courses.length);

//     return {
//       id: i + 1,
//       name: `공지 사항${i + 1}`,
//       registrationTime: `2024-9-2 16:19:${i + 1}`,
//       course: courses[randomCourseIndex],
//     };
//   });

//   const itemsPerPage = 9;
//   const pagesPerBlock = 5;

//   // 필터링된 리스트
//   const filteredList = list.filter((item) =>
//     selectedCourse ? item.course === selectedCourse : true,
//   );

//   // 현재 페이지에 해당하는 항목들 가져오기
//   const currentItems = filteredList.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   // 총 페이지 수 계산
//   const totalPages = Math.ceil(filteredList.length / itemsPerPage);

//   // 현재 페이지 블록에 해당하는 페이지 번호들 가져오기
//   const currentBlock = Math.ceil(currentPage / pagesPerBlock);
//   const startPage = (currentBlock - 1) * pagesPerBlock + 1;
//   const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
//   const pages = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, i) => startPage + i,
//   );

//   // 페이지 변경 시 쿼리 스트링으로 업데이트
//   const changePage = (page: number) => {
//     setCurrentPage(page);
//     router.push(`/professor/assignment/list?page=${page}`);
//   };

//   useEffect(() => {
//     // 쿼리 스트링에서 page 값이 바뀔 때 currentPage 업데이트
//     setCurrentPage(parseInt(pageParam));
//   }, [pageParam]);

//   // 삭제 모달 열기
//   const showDeleteModal = (id: number) => {
//     setDeleteItemId(id);
//     setIsModalVisible(true);
//   };

//   // 삭제 모달에서 확인 버튼 클릭 시
//   const handleDelete = () => {
//     if (deleteItemId !== null) {
//       console.log(`Delete item with ID: ${deleteItemId}`);
//     }
//     setIsModalVisible(false);
//     setDeleteItemId(null);
//   };

//   // 삭제 모달에서 취소 버튼 클릭 시
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setDeleteItemId(null);
//   };

//   return (
//     <div className="min-h-screen p-8 flex">
//       <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
//         <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
//           <h1 className="text-lg mb-3 md:mb-0">공지 목록</h1>
//           <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
//             <Select
//               id="course-select"
//               placeholder="과목 및 대회를 선택하세요."
//               value={selectedCourse}
//               onChange={handleCourseChange}
//               className="w-56"
//               allowClear
//             >
//               {courses.map((course) => (
//                 <Option key={course} value={course}>
//                   {course}
//                 </Option>
//               ))}
//             </Select>

//             <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
//               <IoSearchSharp className="text-gray-500 text-lg mr-2" />
//               <input
//                 className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
//                 type="text"
//                 placeholder="공지를 검색해보세요"
//               />
//             </div>
//           </div>
//         </section>

//         <hr className="border-t-2 mt-5 border-gray-200" />

//         <section className="flex flex-col px-3 sm:px-16">
//           <div className="flex justify-between items-center py-6 border-b-2">
//             <span className="w-[10%]">ID</span>
//             <span className="w-[60%]">공지 이름</span>
//             <span className="w-[20%]">공지 등록 시간</span>
//             <span className="w-[20%]">공지 관리</span>
//           </div>
//           {currentItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center text-sm py-5 border-b-2 hover:bg-gray-100 cursor-pointer"
//             >
//               <span className="w-[10%] text-xs sm:text-sm">{item.id}</span>
//               <span className="w-[60%] text-xs sm:text-sm">{item.name}</span>
//               <span className="w-[20%] text-xs sm:text-sm">
//                 {item.registrationTime}
//               </span>
//               <span className="w-[20%] text-xs sm:text-base flex items-center">
//                 <Link href={`/professor/announcement/list/${item.id}`}>
//                   <TbEdit className="text-lg lg:text-xl mr-2" />
//                 </Link>
//                 <FiTrash2
//                   className="text-lg lg:text-xl"
//                   onClick={() => showDeleteModal(item.id)}
//                 />
//               </span>
//             </div>
//           ))}
//         </section>

//         {/* 페이지네이션 및 버튼 */}
//         <section className="flex justify-center sm:justify-end w-full px-16 items-center mt-4">
//           <div className="flex items-center space-x-1">
//             {/* < 버튼 - 이전 블록의 첫 페이지로 이동 */}
//             <button
//               onClick={() => changePage(Math.max(startPage - pagesPerBlock, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
//             >
//               &lt;
//             </button>

//             <div className="flex space-x-1 font-normal">
//               {pages.map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => changePage(page)}
//                   className={`px-3 py-1 rounded-xl ${
//                     page === currentPage
//                       ? 'bg-primary text-white hover:bg-primaryButtonHover'
//                       : 'bg-gray-200 hover:bg-gray-300'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>

//             {/* > 버튼 - 다음 블록의 첫 페이지로 이동 */}
//             <button
//               onClick={() =>
//                 changePage(Math.min(startPage + pagesPerBlock, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </section>
//         {/* 삭제 확인 모달 */}
//         <Modal
//           title="공제 삭제 확인"
//           visible={isModalVisible}
//           onOk={handleDelete}
//           onCancel={handleCancel}
//           okText="삭제"
//           cancelText="취소"
//         >
//           <p>정말로 이 공지를 삭제하시겠습니까?</p>
//         </Modal>
//       </div>
//     </div>
//   );
// }

'use client';

import { Select, Modal } from 'antd';
import { useState, Suspense } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import PageParams from '@/components/professor/announcement/AnnouncementList';
import { useRouter } from 'next/navigation';

const { Option } = Select;

export default function AnnouncementList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const router = useRouter();
  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
  };

  // PageParams에서 가져온 페이지 값으로 currentPage를 업데이트합니다.
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 문제 리스트에 과목을 랜덤하게 배치
  const courses = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];
  const list = Array.from({ length: 60 }, (_, i) => {
    const randomCourseIndex = Math.floor(Math.random() * courses.length);
    return {
      id: i + 1,
      name: `공지 사항${i + 1}`,
      registrationTime: `2024-9-2 16:19:${i + 1}`,
      course: courses[randomCourseIndex],
    };
  });

  const itemsPerPage = 9;
  const pagesPerBlock = 5;

  // 필터링된 리스트
  const filteredList = list.filter((item) =>
    selectedCourse ? item.course === selectedCourse : true,
  );

  // 현재 페이지에 해당하는 항목들 가져오기
  const currentItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  // 페이지 변경 시 쿼리 스트링으로 업데이트
  const changePage = (page: number) => {
    setCurrentPage(page);
    router.push(`/professor/announcement/list?page=${page}`);
  };

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
          <h1 className="text-lg mb-3 md:mb-0">공지 목록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Select
              id="course-select"
              placeholder="과목 및 대회를 선택하세요."
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
                placeholder="공지를 검색해보세요"
              />
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="flex flex-col px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[10%]">ID</span>
            <span className="w-[60%]">공지 이름</span>
            <span className="w-[20%]">공지 등록 시간</span>
            <span className="w-[20%]">공지 관리</span>
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

        {/* 페이지네이션 및 버튼 */}
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
        {/* 삭제 확인 모달 */}
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

        {/* PageParams 컴포넌트 사용 */}
        <Suspense>
          <PageParams onPageChange={handlePageChange} />
        </Suspense>
      </div>
    </div>
  );
}
