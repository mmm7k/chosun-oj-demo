'use client';

import { Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function ClassEnroll() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classDescription, setClassDescription] = useState('');

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassDescription(e.target.value);
  };

  const courseOptions = ['기초 프로그래밍', '자바 프로그래밍', '알고리즘'];
  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <div className="relative flex items-center justify-between px-16">
          <h1 className="text-lg">분반 개설</h1>
        </div>
        <hr className="mt-5 border-t-2 border-gray-200" />

        <div className="flex flex-col text-sm">
          {/* 강의 선택 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="course-select" className="mr-3">
                강의:
              </label>
              <Select
                id="course-select"
                placeholder="강의를 선택하세요."
                value={selectedCourse}
                onChange={handleCourseChange}
                className="w-[60%] sm:w-[20%]"
                allowClear
              >
                {courseOptions.map((course) => (
                  <Option key={course} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* 분반 선택 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="class-select" className="mr-3">
                분반:
              </label>
              <Select
                id="class-select"
                placeholder="분반을 선택하세요."
                value={selectedClass}
                onChange={handleClassChange}
                className="w-[60%] sm:w-[20%]"
                allowClear
              >
                {Array.from({ length: 7 }, (_, i) => (
                  <Option key={i + 1} value={`0${i + 1}분반`}>
                    0{i + 1}분반
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {/* 강의 설명 입력 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="class-description" className="mr-3">
                강의 설명:
              </label>
              <input
                id="class-description"
                type="text"
                placeholder="강의 설명을 입력하세요."
                value={classDescription}
                onChange={handleDescriptionChange}
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className="flex justify-end w-full px-10 mt-8">
            <button className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover">
              분반 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
