'use client';

import { Checkbox, Select } from 'antd';
import { useState, KeyboardEvent } from 'react';
import DatePicker from 'react-datepicker';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function Post() {
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [filteredProblems, setFilteredProblems] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined,
  );
  const [selectedChpater, setSelectedChapter] = useState<string | undefined>(
    undefined,
  );
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const problems = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `문제 ${i + 1}`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
  }));

  const courses = [
    '기초프로그래밍 01분반',
    '심화프로그래밍 01분반',
    '알고리즘 01분반',
  ];

  const handleSearch = () => {
    const results = problems.filter((problem) =>
      problem.name.includes(searchTerm),
    );
    setFilteredProblems(results);
    setSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleProblemSelection = (problemId: number) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId],
    );
  };

  return (
    <div className="min-h-screen p-8 flex text-sm">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 ">
          <h1 className="text-lg">과제 등록</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />

        {/* 과목 선택 */}
        <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200 text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4">
            <label htmlFor="course-select" className="mr-1">
              등록 할 과목 선택:
            </label>
            <Select
              id="course-select"
              placeholder="과목을 선택하세요"
              value={selectedCourse}
              onChange={(value) => setSelectedCourse(value)}
              className="w-[60%] sm:w-[40%]"
              allowClear
            >
              {courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* 등록 할 주차 선택 선택 */}
        <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200 text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4">
            <label htmlFor="chapter-select" className="mr-1">
              등록 할 주차 선택:
            </label>
            <Select
              id="chapter-select"
              placeholder="과제를 등록 할 주차를 선택하세요"
              value={selectedChpater}
              onChange={(value) => setSelectedChapter(value)}
              className="w-[60%] sm:w-[40%]"
              allowClear
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map(
                (chaterNumber) => (
                  <Option key={chaterNumber} value={chaterNumber}>
                    {chaterNumber}주차
                  </Option>
                ),
              )}
            </Select>
          </div>
        </div>

        {/* 시작 날짜 시간 */}
        <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
          <div className="flex items-center">
            <label htmlFor="start-date-time">시작 날짜 시간:</label>
            <DatePicker
              id="start-date-time"
              selected={startDateTime}
              onChange={(date) => date && setStartDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
              timeIntervals={1}
              minDate={new Date()}
              className="cursor-pointer ml-3 w-full h-8 rounded-lg border-[1px] border-gray-200 pl-4 focus:ring-1 focus:ring-gray-200 focus:outline-none"
            />
          </div>
        </div>
        {/* 종료 날짜 시간 */}
        <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
          <div className="flex items-center">
            <label htmlFor="end-date-time">종료 날짜 시간:</label>
            <DatePicker
              id="end-date-time"
              selected={endDateTime}
              onChange={(date) => date && setEndDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
              timeIntervals={1}
              minDate={new Date()}
              className="cursor-pointer ml-3 w-full h-8 rounded-lg border-[1px] border-gray-200 pl-4 focus:ring-1 focus:ring-gray-200 focus:outline-none"
            />
          </div>
        </div>
        {/* 공개 여부 */}
        <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
          <div className="flex items-center">
            <label htmlFor="visibility-checkbox">공개 여부:</label>
            <Checkbox
              id="visibility-checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="ml-3"
            />
          </div>
        </div>

        {/* 문제 선택 */}
        <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200 text-sm">
          <h2 className="mb-4">문제 선택</h2>
          <div className="flex items-center mb-4">
            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-full bg-white shadow-sm">
              <IoSearchSharp
                className="text-gray-500 text-lg mr-2 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="문제를 검색해보세요"
              />
            </div>
          </div>

          <div className="max-h-[45dvh] overflow-y-auto border-t-[1.5px] border-gray-200">
            {searched && filteredProblems.length === 0 ? (
              <p className="text-center mt-4">검색 결과가 없습니다.</p>
            ) : (
              filteredProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={`flex justify-between items-center p-2 border-b-[1px] border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    selectedProblems.includes(problem.id) ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleProblemSelection(problem.id)}
                >
                  <Checkbox
                    checked={selectedProblems.includes(problem.id)}
                    onChange={() => handleProblemSelection(problem.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="ml-2 text-xs sm:text-sm">
                    {problem.name}
                  </span>
                  <span className="ml-auto mr-3 text-xs sm:text-sm">
                    {problem.registrationTime}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* 선택된 문제 목록 */}
          {selectedProblems.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-sm">선택된 문제:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProblems.map((id) => {
                  const problem = problems.find((p) => p.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center bg-gray-200 text-sm rounded-full px-3 py-1"
                    >
                      <span className="mr-2">{problem?.name}</span>
                      <button
                        className="text-red-500"
                        onClick={() => handleProblemSelection(id)}
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 등록 버튼 */}
        <div className="w-full flex justify-end px-10 mt-8">
          <button className="px-4 py-2 bg-primary text-white text-base rounded-xl font-normal hover:bg-primaryButtonHover">
            과제 등록
          </button>
        </div>
      </div>
    </div>
  );
}
