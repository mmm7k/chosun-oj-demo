'use client';

import axios from 'axios';
import { Select, Checkbox, Button, Upload, message } from 'antd';
import { useState, useEffect, KeyboardEvent } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Enroll() {
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined,
  );

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

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get(
          '/mock/professor/student/studentlist.json',
        );
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };
    fetchStudentList();
  }, []);

  const handleStudentSelection = (student: {
    studentNumber: number;
    name: string;
  }) => {
    setSelectedStudents((prev) =>
      prev.some((s) => s.studentNumber === student.studentNumber)
        ? prev.filter((s) => s.studentNumber !== student.studentNumber)
        : [...prev, student],
    );
  };

  const handleSearch = () => {
    const results = students.filter(
      (student) =>
        student.studentNumber.toString().includes(searchTerm) ||
        student.name.includes(searchTerm) ||
        student.email.includes(searchTerm),
    );
    setFilteredStudents(results);
    setSearched(true);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const courses = [
    '기초프로그래밍 01분반',
    '심화프로그래밍 01분반',
    '알고리즘 01분반',
  ];

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex flex-col items-center justify-between px-16 sm:flex-row">
          <h1 className="text-lg">학생 등록</h1>
          <Upload
            accept=".xlsx, .xls"
            showUploadList={false}
            customRequest={handleCustomRequest}
          >
            <Button icon={<UploadOutlined />}>엑셀 파일 업로드</Button>
          </Upload>
        </section>
        <hr className="mt-5 border-t-2 border-gray-200" />

        {/* 과목 선택 */}
        <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200 text-sm">
          <div className="flex flex-col items-center space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
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

        <section className="flex flex-col text-sm">
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200">
            <h2 className="mb-4">학생 선택</h2>
            <div className="flex items-center mb-4">
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
                  placeholder="학번, 이름, 전공으로 검색해보세요"
                />
              </div>
            </div>

            <div className="max-h-[45dvh] overflow-y-auto border-t-[1.5px] border-gray-200">
              {searched && filteredStudents.length === 0 ? (
                <p className="mt-4 text-center">검색 결과가 없습니다.</p>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex justify-between items-center py-2 border-b-[1px] border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      selectedStudents.includes(student) ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleStudentSelection(student)}
                  >
                    <Checkbox
                      checked={selectedStudents.includes(student)}
                      onChange={() => handleStudentSelection(student)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="w-[40%] sm:w-[15%] ml-2 text-xs sm:text-sm">
                      <span>{student.studentNumber}</span>
                    </div>
                    <span className="w-[40%] sm:w-[55%] text-xs sm:text-sm">
                      {student.name}
                    </span>
                    <span className="w-[40%] sm:w-[30%] text-xs sm:text-sm">
                      {student.major}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedStudents.length > 0 && (
            <div className="px-10 mt-4">
              <h3 className="mb-2 text-sm">선택된 학생:</h3>
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-16">
                {selectedStudents.map((student) => (
                  <div
                    key={student.studentNumber}
                    className="flex items-center px-3 py-1 text-sm bg-gray-200 rounded-full"
                  >
                    <span className="mr-2">
                      {student.studentNumber} - {student.name}
                    </span>
                    <button
                      className="text-red-500"
                      onClick={() => handleStudentSelection(student)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="flex justify-end w-full px-10 mt-8">
          <button className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover">
            학생 등록
          </button>
        </div>
      </div>
    </div>
  );
}
