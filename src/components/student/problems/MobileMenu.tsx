'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function MobileCategory() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* lg 이하에서 카테고리 */}
      <div className="block lg:hidden bg-white w-full">
        <div
          className="flex justify-center items-center cursor-pointer py-4 border-[1.5px] border-gray-200 "
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 클릭 시 메뉴 열기/닫기 토글
        >
          <span className="font-semibold text-secondary mr-2">
            기초프로그래밍 01분반
          </span>
          {isMenuOpen ? (
            <IoChevronUp className="text-xl text-gray-500 transition-transform duration-300" />
          ) : (
            <IoChevronDown className="text-xl text-gray-500 transition-transform duration-300" />
          )}
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <ul className="space-y-4 text-gray-500  ">
            <li className="hover:text-gray-700 transition cursor-pointer hover:bg-gray-200 pl-[5%] py-2">
              1. 변수
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer hover:bg-gray-200 pl-[5%] py-2">
              2. 문자열
            </li>
            <li className="text-primary hover:text-primaryHover transition  font-semibold  hover:bg-gray-200 cursor-pointer pl-[5%] py-2">
              3. 반복문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer hover:bg-gray-200 pl-[5%] py-2">
              4. 조건문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointe hover:bg-gray-200 pl-[5%] py-2">
              5. 포인터
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
