'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ProblemsMenu() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <aside className="hidden lg:block flex-1 p-8 text-sm bg-white shadow-md rounded-2xl">
      <div className="w-full h-full flex flex-col space-y-7">
        <h1 className="font-semibold text-secondary mb-2">카테고리</h1>

        {/* ALL 카테고리 */}
        <Link href="/student/problems?category=all">
          <div
            className={`${
              category === 'all'
                ? 'text-primary hover:text-primaryHover transition font-semibold cursor-pointer'
                : 'hover:text-gray-900 transition cursor-pointer'
            }`}
          >
            ALL
          </div>
        </Link>

        {/* 변수 카테고리 */}
        <Link href="/student/problems?category=변수">
          <div
            className={`${
              category === '변수'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            변수
          </div>
        </Link>

        {/* 데이터 타입 카테고리 */}
        <Link href="/student/problems?category=데이터 타입">
          <div
            className={`${
              category === '데이터 타입'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            데이터 타입
          </div>
        </Link>

        {/* 연산자 카테고리 */}
        <Link href="/student/problems?category=연산자">
          <div
            className={`${
              category === '연산자'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            연산자
          </div>
        </Link>

        {/* 조건문 카테고리 */}
        <Link href="/student/problems?category=조건문">
          <div
            className={`${
              category === '조건문'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            조건문
          </div>
        </Link>

        {/* 반복문 카테고리 */}
        <Link href="/student/problems?category=반복문">
          <div
            className={`${
              category === '반복문'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            반복문
          </div>
        </Link>

        {/* 배열 카테고리 */}
        <Link href="/student/problems?category=배열">
          <div
            className={`${
              category === '배열'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            배열
          </div>
        </Link>

        {/* 함수 카테고리 */}
        <Link href="/student/problems?category=함수">
          <div
            className={`${
              category === '함수'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            함수
          </div>
        </Link>

        {/* 포인터 카테고리 */}
        <Link href="/student/problems?category=포인터">
          <div
            className={`${
              category === '포인터'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            포인터
          </div>
        </Link>

        {/* 문자열 카테고리 */}
        <Link href="/student/problems?category=문자열">
          <div
            className={`${
              category === '문자열'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            문자열
          </div>
        </Link>

        {/* 구조체 카테고리 */}
        <Link href="/student/problems?category=구조체">
          <div
            className={`${
              category === '구조체'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            구조체
          </div>
        </Link>

        {/* 버퍼 카테고리 */}
        <Link href="/student/problems?category=버퍼">
          <div
            className={`${
              category === '버퍼'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            버퍼
          </div>
        </Link>

        {/* 파일 카테고리 */}
        <Link href="/student/problems?category=파일">
          <div
            className={`${
              category === '파일'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            파일
          </div>
        </Link>

        {/* 클래스 카테고리 */}
        <Link href="/student/problems?category=클래스">
          <div
            className={`${
              category === '클래스'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            클래스
          </div>
        </Link>

        {/* 정렬 카테고리 */}
        <Link href="/student/problems?category=정렬">
          <div
            className={`${
              category === '정렬'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            정렬
          </div>
        </Link>

        {/* 탐색 카테고리 */}
        <Link href="/student/problems?category=탐색">
          <div
            className={`${
              category === '탐색'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            탐색
          </div>
        </Link>

        {/* 동적 카테고리 */}
        <Link href="/student/problems?category=동적">
          <div
            className={`${
              category === '동적'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            동적
          </div>
        </Link>

        {/* 그래프 카테고리 */}
        <Link href="/student/problems?category=그래프">
          <div
            className={`${
              category === '그래프'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            그래프
          </div>
        </Link>

        {/* 탐욕 카테고리 */}
        <Link href="/student/problems?category=탐욕">
          <div
            className={`${
              category === '탐욕'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            탐욕
          </div>
        </Link>

        {/* 순회 카테고리 */}
        <Link href="/student/problems?category=순회">
          <div
            className={`${
              category === '순회'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            순회
          </div>
        </Link>

        {/* 분할 정복 카테고리 */}
        <Link href="/student/problems?category=분할 정복">
          <div
            className={`${
              category === '분할 정복'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            분할 정복
          </div>
        </Link>

        {/* 백트래킹 카테고리 */}
        <Link href="/student/problems?category=백트래킹">
          <div
            className={`${
              category === '백트래킹'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
          >
            백트래킹
          </div>
        </Link>
      </div>
    </aside>
  );
}
