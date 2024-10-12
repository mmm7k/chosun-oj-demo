'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useState } from 'react';
import { PiStudent } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdLogout, MdOutlineTask } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  IoChatbubbleEllipsesOutline,
  IoMegaphoneOutline,
} from 'react-icons/io5';
import { GoTrophy } from 'react-icons/go';
export default function SideNav() {
  const pathname = usePathname();
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isProblemsDropdownOpen, setIsProblemsDropdownOpen] = useState(false);
  const [isAssignmentDropdownOpen, setIsAssignmentDropdownOpen] =
    useState(false);
  const [isAnnouncementDropdownOpen, setIsAnnouncementDropdownOpen] =
    useState(false);
  const [isContestDropdownOpen, setIsContestDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 햄버거 메뉴 상태

  const closeAllDropdowns = () => {
    setIsStudentDropdownOpen(false);
    setIsProblemsDropdownOpen(false);
    setIsAssignmentDropdownOpen(false);
    setIsAnnouncementDropdownOpen(false);
    setIsContestDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="w-screen 2xl:w-52 h-20 2xl:min-h-screen bg-white flex justify-center 2xl:fixed 2xl:left-0 2xl:top-0 text-secondary text-sm font-semibold shadow-xl">
      <div className="flex 2xl:flex-col items-center justify-between 2xl:justify-normal w-[100%] px-[5%] 2xl:px-0 2xl:min-h-screen relative">
        {/* 로고 이미지 */}
        <div className="min-w-9 2xl:min-w-16 min-h-9 2xl:min-h-16 relative 2xl:mt-11">
          <Link href="/professor/dashboard" onClick={closeAllDropdowns}>
            <Image
              src="/commons/symbol.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>

        {/* 햄버거 메뉴 버튼 (2XL 이하에서만 보임) */}
        <div className="2xl:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* 메뉴 (2XL 이상에서 표시) */}
        <div className="hidden 2xl:flex flex-col justify-between w-full px-[15%] mt-12 pb-[10%] h-full overflow-y-auto ">
          <div className="space-y-8">
            <Link href="/professor/dashboard" onClick={closeAllDropdowns}>
              <div
                className={`flex justify-between items-center ${
                  pathname === '/professor/dashboard'
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
              >
                <div className="flex items-center transition">
                  <LuLayoutDashboard className="text-lg mr-2" />
                  <span> 대시보드</span>
                </div>
              </div>
            </Link>

            {/* Q&A */}
            <div>
              <Link href="/professor/questions" onClick={closeAllDropdowns}>
                <div
                  className={`flex justify-between items-center ${
                    pathname === '/professor/questions'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <div className="flex items-center transition">
                    <IoChatbubbleEllipsesOutline className="text-xl mr-2" />
                    <span>Q & A</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* 학생 드롭다운 */}
            <div>
              <div
                className={`flex justify-between cursor-pointer items-center ${
                  pathname.startsWith('/professor/student')
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
                onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
              >
                <div className="flex items-center transition">
                  <PiStudent className="text-xl mr-2" />
                  <span>학생</span>
                </div>
                {isStudentDropdownOpen ? (
                  <RiArrowDropUpLine className="text-3xl" />
                ) : (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-4 ${
                  isStudentDropdownOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <li
                  className={`transition mt-5 ${
                    pathname === '/professor/student/list'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/student/list"
                    onClick={closeAllDropdowns}
                  >
                    학생 목록
                  </Link>
                </li>
                <li
                  className={`transition mt-5 ${
                    pathname === '/professor/student/enroll'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/student/enroll"
                    onClick={closeAllDropdowns}
                  >
                    학생 등록
                  </Link>
                </li>
              </ul>
            </div>
            {/* 문제 드롭다운 */}
            <div>
              <div
                className={`flex justify-between cursor-pointer items-center ${
                  pathname.startsWith('/professor/problems')
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
                onClick={() =>
                  setIsProblemsDropdownOpen(!isProblemsDropdownOpen)
                }
              >
                <div className="flex items-center transition">
                  <HiOutlinePencilSquare className="text-xl mr-2" />
                  <span>문제</span>
                </div>
                {isProblemsDropdownOpen ? (
                  <RiArrowDropUpLine className="text-3xl" />
                ) : (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-4 ${
                  isProblemsDropdownOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                {/* <Link
                  href="/professor/problems/list"
                  onClick={closeAllDropdowns}
                >
                  <li
                    className={`transition mt-5 ${
                      pathname === '/professor/problems/list'
                        ? 'text-primary hover:text-primaryHover'
                        : 'text-secondary hover:text-secondaryHover'
                    }`}
                  >
                    전체 문제 목록
                  </li>
                </Link> */}
                <Link
                  href="/professor/problems/mylist"
                  onClick={closeAllDropdowns}
                >
                  <li
                    className={`transition mt-5 ${
                      pathname === '/professor/problems/mylist'
                        ? 'text-primary hover:text-primaryHover'
                        : 'text-secondary hover:text-secondaryHover'
                    }`}
                  >
                    나의 문제 목록
                  </li>
                </Link>
                <li
                  className={`transition ${
                    pathname === '/professor/problems/post'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/problems/post"
                    onClick={closeAllDropdowns}
                  >
                    문제 등록
                  </Link>
                </li>
              </ul>
            </div>
            {/* 과제 드롭다운 */}
            <div>
              <div
                className={`flex justify-between cursor-pointer items-center ${
                  pathname.startsWith('/professor/assignment')
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
                onClick={() =>
                  setIsAssignmentDropdownOpen(!isAssignmentDropdownOpen)
                }
              >
                <div className="flex items-center transition">
                  <MdOutlineTask className="text-xl mr-2" />
                  <span>과제</span>
                </div>
                {isAssignmentDropdownOpen ? (
                  <RiArrowDropUpLine className="text-3xl" />
                ) : (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-4 ${
                  isAssignmentDropdownOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <li
                  className={`transition mt-5 ${
                    pathname === '/professor/assignment/list'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/assignment/list"
                    onClick={closeAllDropdowns}
                  >
                    과제 목록
                  </Link>
                </li>
                <li
                  className={`transition ${
                    pathname === '/professor/assignment/enroll'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/assignment/enroll"
                    onClick={closeAllDropdowns}
                  >
                    과제 등록
                  </Link>
                </li>

                <li
                  className={`transition ${
                    pathname === '/professor/assignment/submission'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/assignment/submission"
                    onClick={closeAllDropdowns}
                  >
                    제출 확인
                  </Link>
                </li>
              </ul>
            </div>

            {/* 대회 드롭다운 */}
            <div>
              <div
                className={`flex justify-between cursor-pointer items-center ${
                  pathname.startsWith('/professor/contest')
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
                onClick={() => setIsContestDropdownOpen(!isContestDropdownOpen)}
              >
                <div className="flex items-center transition">
                  <GoTrophy className="text-xl mr-2" />
                  <span>대회</span>
                </div>
                {isContestDropdownOpen ? (
                  <RiArrowDropUpLine className="text-3xl" />
                ) : (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-4 ${
                  isContestDropdownOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <li
                  className={`transition mt-5 ${
                    pathname === '/professor/contest/list'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/contest/list"
                    onClick={closeAllDropdowns}
                  >
                    대회 목록
                  </Link>
                </li>
                <li
                  className={`transition ${
                    pathname === '/professor/contest/enroll'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/contest/enroll"
                    onClick={closeAllDropdowns}
                  >
                    대회 등록
                  </Link>
                </li>

                <li
                  className={`transition ${
                    pathname === '/professor/contest/submission'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/contest/submission"
                    onClick={closeAllDropdowns}
                  >
                    제출 확인
                  </Link>
                </li>
              </ul>
            </div>
            {/* 공지 드롭다운 */}
            <div>
              <div
                className={`flex justify-between cursor-pointer items-center ${
                  pathname.startsWith('/professor/announcement')
                    ? 'text-primary hover:text-primaryHover'
                    : 'text-secondary hover:text-secondaryHover'
                }`}
                onClick={() =>
                  setIsAnnouncementDropdownOpen(!isAnnouncementDropdownOpen)
                }
              >
                <div className="flex items-center transition">
                  <IoMegaphoneOutline className="text-xl mr-2" />
                  <span>공지</span>
                </div>
                {isAnnouncementDropdownOpen ? (
                  <RiArrowDropUpLine className="text-3xl" />
                ) : (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
              </div>
              <ul
                className={`list-disc overflow-hidden transition-all duration-500 ease-in-out pl-8 space-y-4 ${
                  isAnnouncementDropdownOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <li
                  className={`transition mt-5 ${
                    pathname === '/professor/announcement/list'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/announcement/list"
                    onClick={closeAllDropdowns}
                  >
                    공지 목록
                  </Link>
                </li>
                <li
                  className={`transition ${
                    pathname === '/professor/announcement/post'
                      ? 'text-primary hover:text-primaryHover'
                      : 'text-secondary hover:text-secondaryHover'
                  }`}
                >
                  <Link
                    href="/professor/announcement/post"
                    onClick={closeAllDropdowns}
                  >
                    공지 등록
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* 로그아웃 */}
          <Link href="/" className="mt-5">
            <div className="cursor-pointer flex items-center transition hover:text-secondaryHover">
              <MdLogout className="text-xl mr-2" />
              <span>로그아웃</span>
            </div>
          </Link>
        </div>
        {/* 2xl 이하 메뉴 (햄버거 메뉴 클릭 시 열림) */}
        <div
          className={`absolute top-20 left-0 w-screen  bg-white shadow-md flex flex-col justify-center items-center space-y-4 2xl:hidden z-50 overflow-hidden transition-all duration-[360ms] ease-in-out ${
            menuOpen
              ? 'max-h-auto opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <Link
            href="/professor/dashboard"
            className="w-full flex justify-center items-center py-4 hover:bg-gray-100"
            onClick={() => {
              setMenuOpen(!menuOpen);
              closeAllDropdowns();
            }}
          >
            <span
              className={`${
                pathname === '/professor/dashboard' &&
                'text-primary font-semibold'
              }`}
            >
              대시보드
            </span>
          </Link>

          <Link
            href="/professor/questions"
            className="w-full flex justify-center items-center py-4 hover:bg-gray-100"
            onClick={() => {
              setMenuOpen(!menuOpen);
              closeAllDropdowns();
            }}
          >
            <span
              className={`${
                pathname === '/professor/questions' &&
                'text-primary font-semibold'
              }`}
            >
              Q & A
            </span>
          </Link>

          {/* 학생 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/professor/student') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
            >
              <span className="flex items-center">
                <PiStudent className="text-xl mr-2" />
                학생
              </span>
              {isStudentDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isStudentDropdownOpen && (
              <ul className="space-y-2 bg-white w-full">
                <Link
                  href="/professor/student/list"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/student/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    학생 목록
                  </li>
                </Link>
                <Link
                  href="/professor/student/enroll"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/student/enroll' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    학생 등록
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 문제 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/professor/problems') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsProblemsDropdownOpen(!isProblemsDropdownOpen)}
            >
              <span className="flex items-center">
                <HiOutlinePencilSquare className="text-xl mr-2" />
                문제
              </span>
              {isProblemsDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isProblemsDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                {/* <Link
                  href="/professor/problems/list"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/problems/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    전체 문제 목록
                  </li>
                </Link> */}
                <Link
                  href="/professor/problems/mylist"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/problems/mylist' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    나의 문제 목록
                  </li>
                </Link>

                <Link
                  href="/professor/problems/post"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/problems/post' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    문제 등록
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 과제 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/professor/assignment') &&
                'text-primary font-semibold'
              }`}
              onClick={() =>
                setIsAssignmentDropdownOpen(!isAssignmentDropdownOpen)
              }
            >
              <span className="flex items-center">
                <MdOutlineTask className="text-xl mr-2" />
                과제
              </span>
              {isAssignmentDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isAssignmentDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                <Link
                  href="/professor/assignment/list"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/assignment/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    과제 목록
                  </li>
                </Link>
                <Link
                  href="/professor/assignment/enroll"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/assignment/enroll' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    과제 등록
                  </li>
                </Link>

                <Link
                  href="/professor/assignment/submission"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/assignment/submission' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    제출 확인
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 대회 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/professor/contest') &&
                'text-primary font-semibold'
              }`}
              onClick={() => setIsContestDropdownOpen(!isContestDropdownOpen)}
            >
              <span className="flex items-center">
                <GoTrophy className="text-xl mr-2" />
                대회
              </span>
              {isContestDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isContestDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                <Link
                  href="/professor/contest/list"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/contest/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    대회 목록
                  </li>
                </Link>
                <Link
                  href="/professor/contest/enroll"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/contest/enroll' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    대회 등록
                  </li>
                </Link>

                <Link
                  href="/professor/contest/submission"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/contest/submission' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    제출 확인
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* 공지 드롭다운 */}
          <div className="w-full">
            <div
              className={`flex justify-center cursor-pointer items-center px-5 py-3 hover:bg-gray-100 ${
                pathname.startsWith('/professor/announcement') &&
                'text-primary font-semibold'
              }`}
              onClick={() =>
                setIsAnnouncementDropdownOpen(!isAnnouncementDropdownOpen)
              }
            >
              <span className="flex items-center">
                <IoMegaphoneOutline className="text-xl mr-2" />
                공지
              </span>
              {isAnnouncementDropdownOpen ? (
                <RiArrowDropUpLine className="text-3xl" />
              ) : (
                <RiArrowDropDownLine className="text-3xl" />
              )}
            </div>
            {isAnnouncementDropdownOpen && (
              <ul className="py-2 space-y-2 bg-white w-full">
                <Link
                  href="/professor/announcement/list"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/announcement/list' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    공지 목록
                  </li>
                </Link>
                <Link
                  href="/professor/assignment/enroll"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    closeAllDropdowns();
                  }}
                >
                  <li
                    className={`w-full flex justify-center items-center py-2 hover:bg-gray-100 ${
                      pathname === '/professor/announcement/post' &&
                      'text-primary font-semibold'
                    }`}
                  >
                    공지 등록
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/* 로그아웃 */}
          <Link
            href="/"
            className="w-full flex justify-center items-center py-4 hover:bg-gray-100"
          >
            <span className="cursor-pointer flex items-center">
              로그아웃 <MdLogout className="text-lg ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
