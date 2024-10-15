'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';

export default function AssignmentMenu({ course }: { course: string }) {
  const [isJavaDropdownOpen, setIsJavaDropdownOpen] = useState(false);
  const [isBasicDropdownOpen, setIsBasicDropdownOpen] = useState(false);
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);
  const decodedCourse = decodeURIComponent(course);

  return (
    <aside className="flex-1 hidden p-8 text-sm bg-white shadow-md lg:block rounded-2xl">
      <div className="flex flex-col w-full h-full space-y-7">
        <h1 className="mb-2 font-semibold text-secondary">카테고리</h1>

        {/* 기초 프로그래밍 */}
        <div>
          <div
            className={`${decodedCourse === '기초 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'}`}
            onClick={() => setIsBasicDropdownOpen(!isBasicDropdownOpen)}
          >
            기초 프로그래밍
            {isBasicDropdownOpen ? (
              <IoChevronUp
                className={`${decodedCourse === '기초 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
              />
            ) : (
              <IoChevronDown
                className={`${decodedCourse === '기초 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
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
                  href={`/student/assignment/기초 프로그래밍?chapter=${idx + 1}`}
                >
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href={`/student/assignment/기초 프로그래밍?chapter=${'etc'}`}
              >
                기타
              </Link>
            </li>
          </ul>
        </div>

        {/* 자바 프로그래밍 */}
        <div>
          <div
            className={`${decodedCourse === '자바 프로그래밍' ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'}`}
            onClick={() => setIsJavaDropdownOpen(!isJavaDropdownOpen)}
          >
            자바 프로그래밍
            {isJavaDropdownOpen ? (
              <IoChevronUp
                className={`${decodedCourse === '자바 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
              />
            ) : (
              <IoChevronDown
                className={`${decodedCourse === '자바 프로그래밍' ? 'text-primary' : 'text-gray-500'}`}
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
                  href={`/student/assignment/자바 프로그래밍?chapter=${idx + 1}`}
                >
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/student/assignment/자바 프로그래밍?chapter=${'etc'}`}
              >
                기타
              </Link>
            </li>
          </ul>
        </div>

        {/* 알고리즘 */}
        <div>
          <div
            className={`${decodedCourse === '알고리즘' ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center' : 'hover:text-gray-900 transition cursor-pointer flex justify-between items-center'}`}
            onClick={() => setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen)}
          >
            알고리즘
            {isAlgorithmDropdownOpen ? (
              <IoChevronUp
                className={`${decodedCourse === '알고리즘' ? 'text-primary' : 'text-gray-500'}`}
              />
            ) : (
              <IoChevronDown
                className={`${decodedCourse === '알고리즘' ? 'text-primary' : 'text-gray-500'}`}
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
                <Link href={`/student/assignment/알고리즘?chapter=${idx + 1}`}>
                  Chapter {idx + 1}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/student/assignment/알고리즘?chapter=${'etc'}`}>
                기타
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
