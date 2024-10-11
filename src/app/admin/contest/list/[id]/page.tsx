'use client';

import { Checkbox } from 'antd';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoSearchSharp } from 'react-icons/io5';

export default function ContestRegister() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [allowedIpRanges, setAllowedIpRanges] = useState('');
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 임의의 문제 리스트
  const problems = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `문제 ${i + 1}`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
  }));

  const handleProblemSelection = (problemId: number) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId],
    );
  };

  // 문제 검색 필터
  const filteredProblems = problems.filter((problem) =>
    searchTerm
      ? problem.name.includes(searchTerm) ||
        problem.registrationTime.includes(searchTerm)
      : true,
  );

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 relative">
          <h1 className="text-lg">대회 수정</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col text-sm">
          {/* 대회 이름 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="contest-title">대회 이름:</label>
              <input
                id="contest-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 pl-4 placeholder:text-sm  placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                placeholder="대회 이름을 입력하세요"
              />
            </div>
          </div>
          {/* 대회 설명 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="contest-description">대회 설명:</label>
              <input
                id="contest-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 pl-4 placeholder:text-sm  placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                placeholder="대회 설명을 입력하세요"
              />
            </div>
          </div>
          {/* 입장 비밀번호 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="contest-password">입장 비밀번호:</label>
              <input
                id="contest-password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 pl-4 placeholder:text-sm  placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                placeholder="입장 비밀번호를 입력하세요"
              />
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
          {/* 허용 아이피 범위 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="ip-ranges">허용 아이피 범위:</label>
              <input
                id="ip-ranges"
                type="text"
                value={allowedIpRanges}
                onChange={(e) => setAllowedIpRanges(e.target.value)}
                className="ml-3 w-[60%] sm:w-[40%] h-8 rounded-lg border-[1px] border-gray-200 pl-4 placeholder:text-sm  placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                placeholder="허용 아이피 범위를 입력하세요 (예: 192.168.1.0/24)"
              />
            </div>
          </div>
          {/* 문제 선택 */}
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200">
            <h2 className="mb-4">문제 선택</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-full bg-white shadow-sm">
                <IoSearchSharp className="text-gray-500 text-lg mr-2" />
                <input
                  className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="문제를 검색해보세요"
                />
              </div>
            </div>
            <div className="h-64 overflow-y-auto border-t-[1.5px] border-gray-200">
              {filteredProblems.map((problem) => (
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
                    onClick={(e) => e.stopPropagation()} // Prevent div click when clicking checkbox
                  />
                  <span className="ml-2 text-xs sm:text-sm">
                    {problem.name}
                  </span>
                  <span className="ml-auto mr-3 text-xs sm:text-sm">
                    {problem.registrationTime}
                  </span>
                </div>
              ))}
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
        </section>
        {/* 등록 버튼 */}
        <div className="w-full flex justify-end px-10 mt-8">
          <button className="px-4 py-2 bg-primary text-white text-base rounded-xl font-normal hover:bg-primaryButtonHover">
            대회 등록
          </button>
        </div>
      </div>
    </div>
  );
}
