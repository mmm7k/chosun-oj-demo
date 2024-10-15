'use client';

import { useState } from 'react';

export default function Enroll() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseYear, setCourseYear] = useState('');

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex items-center justify-between px-16">
          <h1 className="text-lg">강의 개설</h1>
        </section>
        <hr className="mt-5 border-t-2 border-gray-200" />

        {/* 강의 정보 입력 */}
        <section className="flex flex-col text-sm ">
          {/* 강의 이름 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="course-name">강의 이름:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="course-name"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="강의 이름을 입력해주세요"
              />
            </div>
          </div>

          {/* 강의 설명 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="course-description">강의 설명:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="course-description"
                type="text"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="강의 설명을 입력해주세요"
              />
            </div>
          </div>
          {/* 과목 코드 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="course-code">과목 코드:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="course-code"
                type="number"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="과목 코드를 입력해주세요"
                style={{
                  MozAppearance: 'textfield', // Firefox 스피너 제거
                }}
              />
            </div>
          </div>

          {/* 연도 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="course-code">연도:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="course-Year"
                type="number"
                value={courseYear}
                onChange={(e) => setCourseYear(e.target.value)}
                placeholder="개설 연도를 입력해주세요"
                style={{
                  MozAppearance: 'textfield', // Firefox 스피너 제거
                }}
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end w-full px-10 mt-8">
          <button className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover">
            강의 개설
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Chrome, Edge, Safari - 스피너 제거 */
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
