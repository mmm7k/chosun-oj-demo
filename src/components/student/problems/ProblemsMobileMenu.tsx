'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';

export default function ProblemsMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <div className="block lg:hidden bg-white w-full">
        <div
          className="flex justify-center items-center cursor-pointer py-4 border-[1.5px] border-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 클릭 시 메뉴 열기/닫기 토글
        >
          <span className="font-semibold text-secondary mr-2">카테고리</span>
          {isMenuOpen ? (
            <IoChevronUp className="text-xl text-gray-500 transition-transform duration-300" />
          ) : (
            <IoChevronDown className="text-xl text-gray-500 transition-transform duration-300" />
          )}
        </div>

        <div
          className={`overflow-hidden ${isMenuOpen ? 'h-auto py-3' : 'max-h-0'}`}
        >
          <ul className="space-y-4 text-gray-500">
            {/* ALL 카테고리 */}
            <Link href="/student/problems?category=all">
              <li
                className={`${
                  category === 'all'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                ALL
              </li>
            </Link>

            {/* 변수 카테고리 */}
            <Link href="/student/problems?category=변수">
              <li
                className={`${
                  category === '변수'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                변수
              </li>
            </Link>

            {/* 데이터 타입 카테고리 */}
            <Link href="/student/problems?category=데이터 타입">
              <li
                className={`${
                  category === '데이터 타입'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                데이터 타입
              </li>
            </Link>

            {/* 연산자 카테고리 */}
            <Link href="/student/problems?category=연산자">
              <li
                className={`${
                  category === '연산자'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                연산자
              </li>
            </Link>

            {/* 조건문 카테고리 */}
            <Link href="/student/problems?category=조건문">
              <li
                className={`${
                  category === '조건문'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                조건문
              </li>
            </Link>

            {/* 반복문 카테고리 */}
            <Link href="/student/problems?category=반복문">
              <li
                className={`${
                  category === '반복문'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                반복문
              </li>
            </Link>

            {/* 배열 카테고리 */}
            <Link href="/student/problems?category=배열">
              <li
                className={`${
                  category === '배열'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                배열
              </li>
            </Link>

            {/* 함수 카테고리 */}
            <Link href="/student/problems?category=함수">
              <li
                className={`${
                  category === '함수'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                함수
              </li>
            </Link>

            {/* 포인터 카테고리 */}
            <Link href="/student/problems?category=포인터">
              <li
                className={`${
                  category === '포인터'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                포인터
              </li>
            </Link>

            {/* 문자열 카테고리 */}
            <Link href="/student/problems?category=문자열">
              <li
                className={`${
                  category === '문자열'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                문자열
              </li>
            </Link>

            {/* 구조체 카테고리 */}
            <Link href="/student/problems?category=구조체">
              <li
                className={`${
                  category === '구조체'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                구조체
              </li>
            </Link>

            {/* 버퍼 카테고리 */}
            <Link href="/student/problems?category=버퍼">
              <li
                className={`${
                  category === '버퍼'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                버퍼
              </li>
            </Link>

            {/* 파일 카테고리 */}
            <Link href="/student/problems?category=파일">
              <li
                className={`${
                  category === '파일'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                파일
              </li>
            </Link>

            {/* 클래스 카테고리 */}
            <Link href="/student/problems?category=클래스">
              <li
                className={`${
                  category === '클래스'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                클래스
              </li>
            </Link>

            {/* 정렬 카테고리 */}
            <Link href="/student/problems?category=정렬">
              <li
                className={`${
                  category === '정렬'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                정렬
              </li>
            </Link>

            {/* 탐색 카테고리 */}
            <Link href="/student/problems?category=탐색">
              <li
                className={`${
                  category === '탐색'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                탐색
              </li>
            </Link>

            {/* 동적 카테고리 */}
            <Link href="/student/problems?category=동적">
              <li
                className={`${
                  category === '동적'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                동적
              </li>
            </Link>

            {/* 그래프 카테고리 */}
            <Link href="/student/problems?category=그래프">
              <li
                className={`${
                  category === '그래프'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                그래프
              </li>
            </Link>

            {/* 탐욕 카테고리 */}
            <Link href="/student/problems?category=탐욕">
              <li
                className={`${
                  category === '탐욕'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                탐욕
              </li>
            </Link>

            {/* 순회 카테고리 */}
            <Link href="/student/problems?category=순회">
              <li
                className={`${
                  category === '순회'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                순회
              </li>
            </Link>

            {/* 분할 정복 카테고리 */}
            <Link href="/student/problems?category=분할 정복">
              <li
                className={`${
                  category === '분할 정복'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                분할 정복
              </li>
            </Link>

            {/* 백트래킹 카테고리 */}
            <Link href="/student/problems?category=백트래킹">
              <li
                className={`${
                  category === '백트래킹'
                    ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer'
                    : 'hover:text-gray-700 transition cursor-pointer'
                } pl-[5%] py-2`}
              >
                백트래킹
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
