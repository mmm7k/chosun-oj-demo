'use client';

import { Avatar } from 'antd';
import { LuTags } from 'react-icons/lu';
import { BsSendCheck } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Questions({ params }: { params: { course: string } }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJavaDropdownOpen, setIsJavaDropdownOpen] = useState(false);
  const [isBasicDropdownOpen, setIsBasicDropdownOpen] = useState(false);
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);
  const router = useRouter();
  // 현재 url 파라미터 확인
  const pathname = params;
  console.log(pathname.course);

  const handleChapterClick = (course: string, chapter: string) => {
    router.push(`/student/questions/${course}?=${chapter}`);
  };

  const questionsList: number[] = [1, 2, 3, 4, 5];
  return (
    <div className="bg-[#f0f4fc] w-full flex  flex-col lg:flex-row  items-center lg:items-start justify-center text-secondary ">
      {/* lg 이하에서 카테고리 메뉴 */}
      {/* lg 이하에서 카테고리 메뉴 */}
      <div className="block lg:hidden bg-white w-full ">
        <div
          className="flex justify-center items-center cursor-pointer py-4 border-b border-gray-200 "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="font-semibold text-secondary mr-2">카테고리</span>
          {isMenuOpen ? (
            <IoChevronUp className="text-xl text-gray-500 " />
          ) : (
            <IoChevronDown className="text-xl text-gray-500 " />
          )}
        </div>

        <div
          className={`overflow-hidden ${isMenuOpen ? ' h-auto' : 'max-h-0'}`}
        >
          <ul className="py-2 space-y-5 text-gray-500">
            {/* 공통 Q&A */}
            <li
              className={`${
                pathname.course === 'common'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer '
                  : 'hover:text-gray-700 transition cursor-pointer '
              } pl-[5%] py-2`}
              onClick={() => router.push('/student/questions/common')}
            >
              공통 Q&A
            </li>

            {/* 자바 프로그래밍 */}
            <li>
              <div
                className={`${
                  decodeURIComponent(pathname.course) === '자바 프로그래밍'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                    : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
                } pl-[5%] py-2`}
                onClick={() => setIsJavaDropdownOpen(!isJavaDropdownOpen)}
              >
                자바 프로그래밍
                {isJavaDropdownOpen ? (
                  <IoChevronUp
                    className={`${
                      decodeURIComponent(pathname.course) === '자바 프로그래밍'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${
                      decodeURIComponent(pathname.course) === '자바 프로그래밍'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                )}
              </div>
              <ul
                className={`list-disc pl-[11%] transition-all duration-700 ease-in-out space-y-5 ${
                  isJavaDropdownOpen
                    ? 'opacity-100 max-h-[80rem]'
                    : 'opacity-0 max-h-0'
                } overflow-hidden`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className="hover:text-gray-900 transition cursor-pointer"
                    onClick={() =>
                      handleChapterClick('자바 프로그래밍', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </li>
            {/* 기초 프로그래밍 */}
            <li>
              <div
                className={`${
                  decodeURIComponent(pathname.course) === '기초 프로그래밍'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                    : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
                } pl-[5%] py-2`}
                onClick={() => setIsBasicDropdownOpen(!isBasicDropdownOpen)}
              >
                기초 프로그래밍
                {isBasicDropdownOpen ? (
                  <IoChevronUp
                    className={`${
                      decodeURIComponent(pathname.course) === '기초 프로그래밍'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${
                      decodeURIComponent(pathname.course) === '기초 프로그래밍'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                )}
              </div>
              <ul
                className={`list-disc pl-[11%]  transition-all duration-700 ease-in-out space-y-5 ${
                  isBasicDropdownOpen
                    ? 'opacity-100 max-h-[80rem]'
                    : 'opacity-0 max-h-0'
                } overflow-hidden`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className="hover:text-gray-900 transition cursor-pointer"
                    onClick={() =>
                      handleChapterClick('기초 프로그래밍', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </li>

            {/* 알고리즘 */}
            <li>
              <div
                className={`${
                  decodeURIComponent(pathname.course) === '알고리즘'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                    : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
                } pl-[5%] py-2`}
                onClick={() =>
                  setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen)
                }
              >
                알고리즘
                {isAlgorithmDropdownOpen ? (
                  <IoChevronUp
                    className={`${
                      decodeURIComponent(pathname.course) === '알고리즘'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${
                      decodeURIComponent(pathname.course) === '알고리즘'
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  />
                )}
              </div>
              <ul
                className={`list-disc pl-[11%]  transition-all duration-700 ease-in-out space-y-5 ${
                  isAlgorithmDropdownOpen
                    ? 'opacity-100 max-h-[80rem]'
                    : 'opacity-0 max-h-0'
                } overflow-hidden`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className="hover:text-gray-900 transition cursor-pointer"
                    onClick={() =>
                      handleChapterClick('알고리즘', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[90%] lg:w-[62%] flex gap-0 lg:gap-12 pt-14 items-start mb-56 ">
        {/* left */}
        <main className="w-full lg:w-[75%]">
          {/* 검색 */}
          <div className="flex w-full mb-7 items-center bg-white shadow-md rounded-2xl px-4">
            <IoSearchSharp className="text-gray-400 text-lg" />
            <input
              type="text"
              className="w-full py-3 pl-3 focus:outline-none placeholder:text-sm text-sm"
              placeholder="키워드를 입력하세요."
            />
          </div>
          {/* Create Question */}
          <div className="py-10 px-12 bg-white shadow-md rounded-2xl">
            {/* Header */}
            <h1 className="text-lg font-semibold mb-4">💡 Create Question</h1>
            {/* 제목 Box */}
            <div className="flex  items-center bg-gray-100 py-4 px-8 rounded-2xl mb-6">
              <textarea
                placeholder="제목을 입력해 주세요"
                className="bg-transparent w-full outline-none text-gray-600 resize-none overflow-hidden"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto'; // Reset height
                  target.style.height = `${target.scrollHeight}px`; // Set to scrollHeight
                }}
              ></textarea>
            </div>
            {/* Input Box */}
            <div className="flex items-center bg-gray-100 py-16 px-8 rounded-2xl mb-6">
              <textarea
                placeholder="질문을 입력해 주세요"
                className="bg-transparent w-full outline-none text-gray-600 resize-none overflow-hidden"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto'; // Reset height
                  target.style.height = `${target.scrollHeight}px`; // Set to scrollHeight
                }}
              ></textarea>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-end gap-4">
              {/*  Button */}
              {/* <div className="flex items-center space-x-4"> */}
              {/* <button className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 transition-all text-blue-700 py-3 px-7 rounded-full">
                  <GrGallery />
                  <span className="text-sm">Gallery</span>
                </button> */}

              {/*Button */}
              <button className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 transition-all text-red-600 py-3 px-7 rounded-full">
                <LuTags />
                <span className="text-sm">Tag</span>
              </button>
              {/* </div> */}
              {/* 등록 Button */}
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 px-7 rounded-full ">
                <BsSendCheck />
                <span className="text-sm">등록</span>
              </button>
            </div>
          </div>

          {/* Q&A 목록 */}

          {questionsList.map((_, i) => (
            <section className="mt-12" key={i}>
              <div className="py-10 px-12  bg-white shadow-md rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      style={{ backgroundColor: '#87d068' }}
                      icon={<UserOutlined />}
                    />
                    <div className="flex ml-4 flex-col justify-center">
                      <p className=" font-semibold">20214931 김민수</p>
                      <p className="text-sm text-gray-500">{i}min ago</p>
                    </div>
                  </div>
                  <div className="">
                    <button className="text-gray-500">•&nbsp;•&nbsp;•</button>
                  </div>
                </div>
                {/* Question */}
                <h1 className="mt-8 text-lg font-semibold">
                  피라미드 별 출력하기 질문입니다.
                </h1>
                <p className="mt-4 text-gray-700">
                  C언어를 이용해 피라미드 모양의 별을 출력하려고 합니다.
                  사용자로부터 입력받은 숫자에 따라 피라미드의 층수를 결정하는
                  방법을 알고 싶습니다. 예를 들어, 입력이 5일 경우 아래와 같은
                  출력이 나와야 합니다:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*****
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*******
                  <br />
                  &nbsp;&nbsp;&nbsp;*********
                  <br />
                  이를 어떻게 구현할 수 있을까요?
                </p>
                {/* Interaction Buttons */}
                <div className="mt-4 flex items-center space-x-6 ">
                  <span className="text-gray-600">521 Likes</span>

                  <span className="text-gray-600">59 Comments</span>

                  <button className="text-gray-500">Share</button>
                </div>
              </div>
            </section>
          ))}
        </main>
        {/* right */}
        <aside className="hidden lg:block flex-1 p-8 text-sm bg-white shadow-md rounded-2xl">
          <div className="w-full h-full flex flex-col space-y-7">
            <h1 className="font-semibold text-secondary mb-2">카테고리</h1>
            <Link href="/student/questions/common">
              <div
                className={`${
                  pathname.course === 'common'
                    ? 'text-primary hover:text-primaryHover transition font-semibold cursor-pointer'
                    : 'hover:text-gray-900 transition cursor-pointer'
                }`}
              >
                공통 Q&A
              </div>
            </Link>
            <div>
              <div
                className={`${decodeURIComponent(pathname.course) === '자바 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
                onClick={() => setIsJavaDropdownOpen(!isJavaDropdownOpen)}
              >
                자바 프로그래밍
                {isJavaDropdownOpen ? (
                  <IoChevronUp
                    className={`${decodeURIComponent(pathname.course) === '자바 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${decodeURIComponent(pathname.course) === '자바 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
                  />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5   ${
                  isJavaDropdownOpen
                    ? 'max-h-[80rem] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
                    onClick={() =>
                      handleChapterClick('자바 프로그래밍', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </div>
            <div>
              <div
                className={`${decodeURIComponent(pathname.course) === '기초 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
                onClick={() => setIsBasicDropdownOpen(!isBasicDropdownOpen)}
              >
                기초 프로그래밍
                {isBasicDropdownOpen ? (
                  <IoChevronUp
                    className={`${decodeURIComponent(pathname.course) === '기초 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${decodeURIComponent(pathname.course) === '기초 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
                  />
                )}
              </div>
              <ul
                className={`list-disc  overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5   ${
                  isBasicDropdownOpen
                    ? 'max-h-[80rem] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
                    onClick={() =>
                      handleChapterClick('기초 프로그래밍', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </div>
            <div>
              <div
                className={`${decodeURIComponent(pathname.course) === '알고리즘' ? 'text-primary hover:text-primaryHover font-semibold  transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900  transition cursor-pointer flex justify-between items-center'}`}
                onClick={() =>
                  setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen)
                }
              >
                알고리즘
                {isAlgorithmDropdownOpen ? (
                  <IoChevronUp
                    className={`${decodeURIComponent(pathname.course) === '알고리즘' ? 'text-primary' : 'text-gray-500'}`}
                  />
                ) : (
                  <IoChevronDown
                    className={`${decodeURIComponent(pathname.course) === '알고리즘' ? 'text-primary' : 'text-gray-500'}`}
                  />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5   ${
                  isAlgorithmDropdownOpen
                    ? 'max-h-[80rem] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {[...Array(15)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
                    onClick={() =>
                      handleChapterClick('알고리즘', `chapter${idx + 1}`)
                    }
                  >
                    Chapter {idx + 1}
                  </li>
                ))}
                <li>기타</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
