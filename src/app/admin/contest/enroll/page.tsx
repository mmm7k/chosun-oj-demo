'use client';

import { Checkbox, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoSearchSharp } from 'react-icons/io5';
import { PiExclamationMarkFill } from 'react-icons/pi';

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
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [isContestRegistered, setIsContestRegistered] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filteredProblems, setFilteredProblems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15; // 한 페이지에 보여줄 문제 수
  const pagesPerBlock = 5; // 페이지 블록당 페이지 수

  // 임의의 문제 리스트
  const problems = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    name: `문제 ${i + 1}`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
  }));

  // 모달 열기 및 닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 페이지네이션
  const filteredList = searched ? filteredProblems : problems;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const paginatedProblems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
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

  const handleExcelUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const studentData = data.slice(1).map((row: any) => ({
          studentNumber: row[0],
          name: row[1],
        }));

        setSelectedStudents((prev) => [...prev, ...studentData]);
        message.success('엑셀 파일이 성공적으로 업로드되었습니다.');
      } catch (error) {
        message.error('엑셀 파일 처리 중 오류가 발생했습니다.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleCustomRequest = (options: any) => {
    const { file, onSuccess } = options;
    handleExcelUpload(file);
    onSuccess('ok');
  };

  //대회 등록 전에는 문제, 학생 등록 불가능
  const handleContestRegistration = () => {
    // 대회 등록 시 상태를 true로 변경
    setIsContestRegistered(true);
    message.success('대회가 성공적으로 등록되었습니다.');
  };

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="relative flex items-center justify-between px-16">
          <h1 className="text-lg">대회 등록</h1>
        </section>
        <hr className="mt-5 border-t-2 border-gray-200" />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-[80%] sm:w-[50%] h-[90vh] p-8 overflow-hidden flex flex-col">
              <h2 className="text-lg mb-4">문제 검색 및 선택</h2>

              {/* 검색 인풋창 */}
              <div className="flex items-center mb-4 border-[1px] border-gray-300 rounded-lg px-3 py-2 w-full bg-white shadow-sm">
                <IoSearchSharp
                  className="mr-2 text-lg text-gray-500 cursor-pointer"
                  onClick={handleSearch}
                />
                <input
                  className="w-full text-sm text-secondary placeholder:text-sm placeholder:font-normal focus:outline-none"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="문제를 검색해보세요"
                />
              </div>

              {/* 문제 리스트 */}
              <div className="flex-1 overflow-y-auto border-t mt-2">
                {searched && paginatedProblems.length === 0 ? (
                  <p className="text-center mt-4">검색 결과가 없습니다.</p>
                ) : (
                  paginatedProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-50"
                      onClick={() => handleProblemSelection(problem.id)}
                    >
                      <span className="text-sm">{problem.name}</span>
                      <span className="text-xs text-gray-500">
                        {problem.registrationTime}
                      </span>
                      <Checkbox
                        checked={selectedProblems.includes(problem.id)}
                        onChange={() => handleProblemSelection(problem.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center items-center mt-4 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage(Math.max(startPage - pagesPerBlock, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
                >
                  &lt;
                </button>
                <div className="flex space-x-1 font-normal">
                  {pages.map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-xl ${
                        page === currentPage
                          ? 'bg-primary text-white hover:bg-primaryButtonHover'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(startPage + pagesPerBlock, totalPages),
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded-xl hover:bg-gray-300 disabled:opacity-50"
                >
                  &gt;
                </button>
                <button
                  onClick={closeModal}
                  className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
                >
                  선택 완료
                </button>
              </div>
            </div>
          </div>
        )}

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
          {/* 대회 등록 버튼 */}
          <div className="w-full flex justify-end space-x-4  items-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center text-gray-500">
              <PiExclamationMarkFill className="mr-2 text-lg" />
              <span>대회 등록 후 문제 및 학생 등록이 가능합니다.</span>
            </div>
            <button
              className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover  transition-all"
              onClick={handleContestRegistration}
            >
              대회 등록
            </button>
          </div>
          {/* 문제 선택 */}
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200 text-sm">
            <h2 className="mb-4">문제 선택</h2>
            {/* <div className="flex items-center mb-4">
              <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-full bg-white shadow-sm">
                <IoSearchSharp
                  className="mr-2 text-lg text-gray-500 cursor-pointer"
                  onClick={handleSearch}
                />
                <input
                  className="w-full text-sm text-secondary placeholder:text-sm placeholder:font-normal focus:outline-none"
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
                <p className="mt-4 text-center">검색 결과가 없습니다.</p>
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
            </div> */}
            <button
              onClick={openModal}
              className="py-2 w-36 text-sm font-normal text-white bg-blue-600 hover:bg-blue-700  rounded-xl transition-all "
            >
              문제 목록 및 검색
            </button>
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
                        className="flex items-center px-3 py-1 text-sm bg-gray-200 rounded-full overflow-y-auto max-h-96"
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

          {/* 문제 등록 버튼 */}
          <div className="w-full flex justify-end  px-10 py-4 border-b-[1.5px] border-gray-200">
            <button
              className={`px-4 py-2 text-white text-base rounded-xl font-normal ${
                isContestRegistered
                  ? 'bg-primary hover:bg-primaryButtonHover  transition-all'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!isContestRegistered} // 대회 등록 전까지 비활성화
            >
              문제 등록
            </button>
          </div>

          {/* 학생 엑셀 업로드 버튼 */}
          <div className="w-full flex  px-10 py-4 border-b-[1.5px] border-gray-200">
            <Upload
              accept=".xlsx, .xls"
              showUploadList={false}
              customRequest={handleCustomRequest}
            >
              <Button icon={<UploadOutlined />}>학생 엑셀 파일 업로드</Button>
            </Upload>
          </div>

          {/* 선택된 학생 목록 */}
          {selectedStudents.length > 0 && (
            <div className="px-10 py-4 border-b-[1.5px] border-gray-200">
              <h3 className="text-sm">선택된 학생:</h3>
              <div className="flex flex-wrap gap-2 mt-2 overflow-y-auto max-h-96">
                {selectedStudents.map((student) => (
                  <div
                    key={student.studentNumber}
                    className="flex items-center px-3 py-1 bg-gray-200 rounded-full"
                  >
                    <span className="mr-2">
                      {student.studentNumber} - {student.name}
                    </span>

                    <button
                      className="text-red-500"
                      onClick={() =>
                        setSelectedStudents((prev) =>
                          prev.filter(
                            (s) => s.studentNumber !== student.studentNumber,
                          ),
                        )
                      }
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 학생 등록 버튼 */}
          <div className="w-full flex justify-end px-10 py-4 border-b-[1.5px] border-gray-200">
            <button
              className={`px-4 py-2 text-white text-base rounded-xl font-normal ${
                isContestRegistered
                  ? 'bg-primary hover:bg-primaryButtonHover  transition-all'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!isContestRegistered} // 대회 등록 전까지 비활성화
            >
              학생 등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
