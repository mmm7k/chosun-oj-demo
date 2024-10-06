'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';

export default function QuestionsMenu({ course }: { course: string }) {
  const [isJavaDropdownOpen, setIsJavaDropdownOpen] = useState(false);
  const [isBasicDropdownOpen, setIsBasicDropdownOpen] = useState(false);
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);

  return (
    <aside className="hidden lg:block flex-1 p-8 text-sm bg-white shadow-md rounded-2xl">
      <div className="w-full h-full flex flex-col space-y-7">
        <h1 className="font-semibold text-secondary mb-2">카테고리</h1>

        {/* 공통 Q&A */}
        <Link href="/student/questions/common">
          <div
            className={`${
              course === 'common'
                ? 'text-primary hover:text-primaryHover transition font-semibold cursor-pointer'
                : 'hover:text-gray-900 transition cursor-pointer'
            }`}
          >
            공통 Q&A
          </div>
        </Link>

        {/* 자바 프로그래밍 */}
        <div>
          <div
            className={`${
              decodeURIComponent(course) === '자바 프로그래밍'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
            onClick={() => setIsJavaDropdownOpen(!isJavaDropdownOpen)}
          >
            자바 프로그래밍
            {isJavaDropdownOpen ? (
              <IoChevronUp
                className={`${
                  decodeURIComponent(course) === '자바 프로그래밍'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            ) : (
              <IoChevronDown
                className={`${
                  decodeURIComponent(course) === '자바 프로그래밍'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            )}
          </div>
          <ul
            className={`list-disc overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5 ${
              isJavaDropdownOpen
                ? 'max-h-[80rem] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {[...Array(15)].map((_, idx) => (
              <li
                key={idx}
                className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
              >
                <Link
                  href={`/student/questions/자바 프로그래밍?chapter=${idx + 1}`}
                >
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}
            <li>기타</li>
          </ul>
        </div>

        {/* 기초 프로그래밍 */}
        <div>
          <div
            className={`${
              decodeURIComponent(course) === '기초 프로그래밍'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
            onClick={() => setIsBasicDropdownOpen(!isBasicDropdownOpen)}
          >
            기초 프로그래밍
            {isBasicDropdownOpen ? (
              <IoChevronUp
                className={`${
                  decodeURIComponent(course) === '기초 프로그래밍'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            ) : (
              <IoChevronDown
                className={`${
                  decodeURIComponent(course) === '기초 프로그래밍'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            )}
          </div>
          <ul
            className={`list-disc overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5 ${
              isBasicDropdownOpen
                ? 'max-h-[80rem] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {[...Array(15)].map((_, idx) => (
              <li
                key={idx}
                className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
              >
                <Link
                  href={`/student/questions/기초 프로그래밍?chapter=${idx + 1}`}
                >
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}
            <li>기타</li>
          </ul>
        </div>

        {/* 알고리즘 */}
        <div>
          <div
            className={`${
              decodeURIComponent(course) === '알고리즘'
                ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'
            }`}
            onClick={() => setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen)}
          >
            알고리즘
            {isAlgorithmDropdownOpen ? (
              <IoChevronUp
                className={`${
                  decodeURIComponent(course) === '알고리즘'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            ) : (
              <IoChevronDown
                className={`${
                  decodeURIComponent(course) === '알고리즘'
                    ? 'text-primary'
                    : 'text-gray-500'
                }`}
              />
            )}
          </div>
          <ul
            className={`list-disc overflow-hidden transition-all duration-700 ease-in-out pl-6 space-y-5 ${
              isAlgorithmDropdownOpen
                ? 'max-h-[80rem] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {[...Array(15)].map((_, idx) => (
              <li
                key={idx}
                className={`hover:text-gray-900 transition cursor-pointer ${idx === 0 ? 'mt-5' : ''}`}
              >
                <Link href={`/student/questions/알고리즘?chapter=${idx + 1}`}>
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}
            <li>기타</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
