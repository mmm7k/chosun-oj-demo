'use client';

import { Checkbox, Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const { Option } = Select;

export default function Edit() {
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleProblemSelection = (problemId: number) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId],
    );
  };

  const handleRegister = () => {
    if (!courseToEnroll) {
      Modal.error({
        title: '과목을 선택해주세요',
        content: '등록할 과목을 선택해야 합니다.',
      });
      return;
    }
    console.log('Selected problems:', selectedProblems);
    console.log('Selected course:', courseToEnroll);
    setSelectedProblems([]);
    setIsModalVisible(false);
  };

  const courseOptions = ['기초프로그래밍', '심화프로그래밍', '알고리즘'];

  const problems = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `피라미드 별찍기${i + 1}`,
    registrationTime: `2024-9-2 16:19:${i + 1}`,
  }));

  const filteredProblems = problems.filter((problem) =>
    searchTerm
      ? problem.name.includes(searchTerm) ||
        problem.registrationTime.includes(searchTerm)
      : true,
  );

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-16">
          <h1 className="text-lg mb-3 md:mb-0">과제 수정</h1>
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            <Button
              type="primary"
              style={
                selectedProblems.length > 0
                  ? { backgroundColor: '#0032A0', borderColor: '#0032A0' }
                  : {}
              }
              disabled={selectedProblems.length === 0}
              onClick={() => setIsModalVisible(true)}
            >
              과제 등록
            </Button>
            <div className="flex items-center border-[1px] border-gray-300 rounded-lg px-3 py-2 w-[16rem] bg-white shadow-sm">
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
        </section>

        <hr className="border-t-2 mt-5 border-gray-200" />

        <section className="px-3 sm:px-16">
          <div className="flex justify-between items-center py-6 border-b-2">
            <span className="w-[5%]">선택</span>
            <span className="w-[60%]">문제 이름</span>
            <span className="w-[35%]">등록 시간</span>
          </div>
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className={`flex justify-between items-center py-5 border-b-2 hover:bg-gray-100 cursor-pointer ${
                selectedProblems.includes(problem.id) ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleProblemSelection(problem.id)}
            >
              <Checkbox
                className="w-[5%]"
                checked={selectedProblems.includes(problem.id)}
                onChange={() => handleProblemSelection(problem.id)}
              />
              <span className="w-[60%] text-xs sm:text-sm">{problem.name}</span>
              <span className="w-[35%] text-xs sm:text-sm">
                {problem.registrationTime}
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
