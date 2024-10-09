'use client';

import { Select, Checkbox, Button, Modal } from 'antd';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function Enroll() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const courseOptions = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];
  const gradeOptions = ['1학년', '2학년', '3학년', '4학년'];
  const majorOptions = [
    '컴퓨터공학과',
    '전자공학과',
    '인공지능공학과',
    '정보통신공학과',
  ];

  const students = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    studentNumber: 20201110 + i + 1,
    name: ['박준걸', '전성환', '김재호', '안재빈', '김민수'][i % 5],
    email: `example@chosun.ac.kr${i + 1}`,
    major: majorOptions[i % 4],
    grade: gradeOptions[i % 4],
  }));

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
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">학생 등록</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Button
              type="primary"
              style={
                selectedStudents.length > 0
                  ? { backgroundColor: '#0032A0', borderColor: '#0032A0' }
                  : {}
              }
              disabled={selectedStudents.length === 0}
              onClick={() => setIsModalVisible(true)}
            >
              학생 등록
            </Button>
            <Select
              placeholder="학년을 선택하세요."
              value={selectedGrade}
              onChange={handleGradeChange}
              className="w-44"
              allowClear
            >
              {gradeOptions.map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="전공을 선택하세요."
              value={selectedMajor}
              onChange={handleMajorChange}
              className="w-44"
              allowClear
            >
              {majorOptions.map((major) => (
                <Option key={major} value={major}>
                  {major}
                </Option>
              ))}
            </Select>

            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
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

          {/* sm 이하일 때 필터, 검색 */}
          <div className="w-full sm:hidden flex flex-col items-center space-y-3">
            <div className="flex space-x-[2%] justify-center w-full">
              <Select
                placeholder="학년을 선택하세요."
                value={selectedGrade}
                onChange={handleGradeChange}
                className="w-[43%]"
                allowClear
              >
                {gradeOptions.map((grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="전공을 선택하세요."
                value={selectedMajor}
                onChange={handleMajorChange}
                className="w-[43%]"
                allowClear
              >
                {majorOptions.map((major) => (
                  <Option key={major} value={major}>
                    {major}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[88%] bg-white shadow-sm">
              <IoSearchSharp className="text-gray-500 text-lg mr-2" />
              <input
                className="w-full text-secondary text-sm placeholder:text-sm placeholder:font-normal focus:outline-none"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="학번, 이름, 전공으로 검색해보세요"
              />
            </div>

            <div className="flex justify-center w-full">
              <Button
                type="primary"
                style={
                  selectedStudents.length > 0
                    ? { backgroundColor: '#0032A0', borderColor: '#0032A0' }
                    : {}
                }
                disabled={selectedStudents.length === 0}
                onClick={() => setIsModalVisible(true)}
              >
                학생 등록
              </Button>
            </div>
          </div>
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[5%]">선택</span>
            <span className="w-[20%]">학번</span>
            <span className="w-[20%]">이름</span>
            <span className="w-[20%]">전공</span>
            <span className="w-[20%]">학년</span>
          </div>
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`flex justify-between items-center py-5 border-b-2 hover:bg-gray-100 cursor-pointer ${
                selectedStudents.includes(student.studentNumber)
                  ? 'bg-gray-100'
                  : ''
              }`}
              onClick={() => handleStudentSelection(student.studentNumber)}
            >
              <Checkbox
                className="w-[5%]"
                checked={selectedStudents.includes(student.studentNumber)}
                onChange={() => handleStudentSelection(student.studentNumber)}
              />
              <span className="w-[20%] text-xs sm:text-sm">
                {student.studentNumber}
              </span>
              <span className="w-[20%] text-xs sm:text-sm">{student.name}</span>
              <span className="w-[20%] text-xs sm:text-sm">
                {student.major}
              </span>
              <span className="w-[20%] text-xs sm:text-sm">
                {student.grade}
              </span>
            </div>
          ))}
        </section>

        <Modal
          title="과목 선택"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleRegister}
          okText="등록"
          cancelText="취소"
          okButtonProps={{
            style: { backgroundColor: '#0032A0', borderColor: '#0032A0' },
          }}
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
