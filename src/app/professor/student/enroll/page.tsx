'use client';

import axios from 'axios';
import { Select, Checkbox, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function Enroll() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  const courseOptions = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];

  // Axios로 JSON 데이터를 불러오는 부분
  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.get(
          '/mock/professor/student/studentlist.json',
        );
        const studentData = response.data;

        setStudents(studentData);

        // 중복 없이 학년과 전공 목록을 추출하여 셀렉트 박스에 사용
        const uniqueGrades = Array.from(
          new Set(studentData.map((student: any) => student.grade)),
        ) as string[];
        const uniqueMajors = Array.from(
          new Set(studentData.map((student: any) => student.major)),
        ) as string[];

        setGrades(uniqueGrades);
        setMajors(uniqueMajors);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchStudentList();
  }, []);

  const handleGradeChange = (value: string) => setSelectedGrade(value);
  const handleMajorChange = (value: string) => setSelectedMajor(value);

  const handleStudentSelection = (studentNumber: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentNumber)
        ? prev.filter((num) => num !== studentNumber)
        : [...prev, studentNumber],
    );
  };

  const handleRegister = () => {
    if (!courseToEnroll) {
      Modal.error({
        title: '강좌를 선택해주세요',
        content: '등록할 강좌를 선택해야 합니다.',
      });
      return;
    }
    console.log('Selected students:', selectedStudents);
    console.log('Selected course:', courseToEnroll);
    setSelectedStudents([]);
    setIsModalVisible(false);
  };

  const filteredStudents = students
    .filter((student) =>
      selectedGrade ? student.grade === selectedGrade : true,
    )
    .filter((student) =>
      selectedMajor ? student.major === selectedMajor : true,
    )
    .filter((student) =>
      searchTerm
        ? student.studentNumber.toString().includes(searchTerm) ||
          student.name.includes(searchTerm) ||
          student.email.includes(searchTerm)
        : true,
    );

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 relative">
          <h1 className="text-lg">학생 등록</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col text-sm">
          {/* 학년 및 전공 선택 */}
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4">
              <Select
                placeholder="학년을 선택하세요."
                value={selectedGrade}
                onChange={handleGradeChange}
                className="w-[60%] sm:w-[15%]"
                allowClear
              >
                {grades.map((grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="전공을 선택하세요."
                value={selectedMajor}
                onChange={handleMajorChange}
                className="w-[60%] sm:w-[20%]"
                allowClear
              >
                {majors.map((major) => (
                  <Option key={major} value={major}>
                    {major}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          {/* 학생 검색 및 선택 */}
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200">
            <h2 className="mb-4">학생 선택</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-full bg-white shadow-sm">
                <IoSearchSharp className="text-gray-500 text-lg mr-2" />
                <input
                  className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="학번, 이름, 전공으로 검색해보세요"
                />
              </div>
            </div>
            <div className="h-[45dvh] overflow-y-auto border-t-[1.5px] border-gray-200">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`flex justify-between items-center py-2 border-b-[1px] border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    selectedStudents.includes(student.studentNumber)
                      ? 'bg-gray-100'
                      : ''
                  }`}
                  onClick={() => handleStudentSelection(student.studentNumber)}
                >
                  <Checkbox
                    checked={selectedStudents.includes(student.studentNumber)}
                    onChange={() =>
                      handleStudentSelection(student.studentNumber)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="w-[15%] ml-2 text-xs sm:text-sm">
                    {student.studentNumber}
                  </span>
                  <span className="w-[25%] text-xs sm:text-sm">
                    {student.name}
                  </span>
                  <span className="w-[20%] text-xs sm:text-sm">
                    {student.grade}학년
                  </span>
                  <span className="w-[30%] text-xs sm:text-sm">
                    {student.major}
                  </span>
                </div>
              ))}
            </div>
            {/* 선택된 학생 목록 */}
            {selectedStudents.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm">선택된 학생:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudents.map((studentNumber) => {
                    const student = students.find(
                      (s) => s.studentNumber === studentNumber,
                    );
                    return (
                      <div
                        key={studentNumber}
                        className="flex items-center bg-gray-200 text-sm rounded-full px-3 py-1"
                      >
                        <span className="mr-2">
                          {student?.studentNumber} - {student?.name}
                        </span>
                        <button
                          className="text-red-500"
                          onClick={() => handleStudentSelection(studentNumber)}
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
          <Button
            type="primary"
            className="px-4 py-2 text-base rounded-xl font-normal"
            onClick={() => setIsModalVisible(true)}
          >
            문제 등록
          </Button>
        </div>

        <Modal
          title="과목 선택"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleRegister}
          okText="등록"
          cancelText="취소"
        >
          <Select
            placeholder="과목을 선택하세요."
            value={courseToEnroll}
            onChange={(value) => setCourseToEnroll(value)}
            className="w-full"
          >
            {courseOptions.map((course) => (
              <Option key={course} value={course}>
                {course}
              </Option>
            ))}
          </Select>
        </Modal>
      </div>
    </div>
  );
}
