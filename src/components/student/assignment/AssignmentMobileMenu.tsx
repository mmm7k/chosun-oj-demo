'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Link from 'next/link';

export default function AssignmentMobileMenu({ course }: { course: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJavaDropdownOpen, setIsJavaDropdownOpen] = useState(false);
  const [isBasicDropdownOpen, setIsBasicDropdownOpen] = useState(false);
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);

  return (
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
        className={` overflow-hidden ${isMenuOpen ? ' h-auto py-3' : 'max-h-0'}`}
      >
        <ul className="py-2 px-[5%] space-y-5 text-gray-500">
          {/* 자바 프로그래밍 */}
          <li>
            <div
              className={`${
                decodeURIComponent(course) === '자바 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              }  py-2`}
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
              className={`list-disc pl-[3%] transition-all duration-700 ease-in-out space-y-5 ${
                isJavaDropdownOpen
                  ? 'opacity-100 max-h-[80rem]'
                  : 'opacity-0 max-h-0'
              } overflow-hidden`}
            >
              {[...Array(15)].map((_, idx) => (
                <li
                  key={idx}
                  className="hover:text-gray-900 transition cursor-pointer"
                >
                  <Link
                    href={`/student/assignment/자바 프로그래밍?chapter=${idx + 1}`}
                  >
                    Chapter {idx + 1}
                  </Link>
                </li>
              ))}
              <li>기타</li>
            </ul>
          </li>

          {/* 기초 프로그래밍 */}
          <li>
            <div
              className={`${
                decodeURIComponent(course) === '기초 프로그래밍'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              }  py-2`}
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
              className={`list-disc pl-[3%]  transition-all duration-700 ease-in-out space-y-5 ${
                isBasicDropdownOpen
                  ? 'opacity-100 max-h-[80rem]'
                  : 'opacity-0 max-h-0'
              } overflow-hidden`}
            >
              {[...Array(15)].map((_, idx) => (
                <li
                  key={idx}
                  className="hover:text-gray-900 transition cursor-pointer"
                >
                  <Link
                    href={`/student/assignment/기초 프로그래밍?chapter=${idx + 1}`}
                  >
                    Chapter {idx + 1}
                  </Link>
                </li>
              ))}
              <li>기타</li>
            </ul>
          </li>

          {/* 알고리즘 */}
          <li>
            <div
              className={`${
                decodeURIComponent(course) === '알고리즘'
                  ? 'text-primary hover:text-primaryHover font-semibold transition cursor-pointer flex justify-between items-center'
                  : 'hover:text-gray-700 transition cursor-pointer flex justify-between items-center'
              }  py-2`}
              onClick={() =>
                setIsAlgorithmDropdownOpen(!isAlgorithmDropdownOpen)
              }
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
              className={`list-disc pl-[3%]  transition-all duration-700 ease-in-out space-y-5 ${
                isAlgorithmDropdownOpen
                  ? 'opacity-100 max-h-[80rem]'
                  : 'opacity-0 max-h-0'
              } overflow-hidden`}
            >
              {[...Array(15)].map((_, idx) => (
                <li
                  key={idx}
                  className="hover:text-gray-900 transition cursor-pointer"
                >
                  <Link
                    href={`/student/assignment/알고리즘?chapter=${idx + 1}`}
                  >
                    Chapter {idx + 1}
                  </Link>
                </li>
              ))}
              <li>기타</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
