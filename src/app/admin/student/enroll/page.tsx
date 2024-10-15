'use client';

import { Upload, Button, message } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';
import { PiExclamationMarkFill } from 'react-icons/pi';

export default function Enroll() {
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [studentId, setStudentId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

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

  const handleStudentAdd = () => {
    const newStudent = {
      id: studentId,
      password: studentPassword,
      name: studentName,
      studentNumber,
      email: studentEmail,
    };
    setSelectedStudents((prev) => [...prev, newStudent]);

    // 상태 초기화
    setStudentId('');
    setStudentPassword('');
    setStudentName('');
    setStudentNumber('');
    setStudentEmail('');
  };

  const handleFinalRegister = () => {
    message.success('계정이 생성되었습니다.');
    console.log('최종 등록된 학생:', selectedStudents);
  };

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex items-center justify-between px-16">
          <h1 className="text-lg">학생 계정 등록</h1>
          <Upload
            accept=".xlsx, .xls"
            showUploadList={false}
            customRequest={handleCustomRequest}
          >
            <Button icon={<UploadOutlined />}>엑셀 파일 업로드</Button>
          </Upload>
        </section>
        <hr className="mt-5 border-t-2 border-gray-200" />

        {/* 학생 정보 입력 */}
        <section className="flex flex-col text-sm ">
          {/* 아이디 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="student-id">아이디:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="student-id"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="아이디를 입력해주세요"
              />
            </div>
          </div>
          {/* 비밀번호*/}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="student-password">비밀번호:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="problem-name"
                type="text"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
          </div>

          {/*이름*/}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="student-name">이름:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="이름을 입력해주세요"
              />
            </div>
          </div>

          {/* 학번 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="student-number">학번:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="student-number"
                type="number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="학번을 입력해주세요"
                style={{
                  MozAppearance: 'textfield', // Firefox 스피너 제거
                }}
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex items-center">
              <label htmlFor="student-email">이메일:</label>
              <input
                className="ml-3 w-[60%] sm:w-[20%] h-8 rounded-lg border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="student-email"
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end w-full px-10 mt-8">
          <button
            onClick={handleStudentAdd}
            className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover"
          >
            학생 추가
          </button>
        </div>
        <hr className="mt-5 border-t-2 border-gray-200" />
        {/* 등록된 학생 목록 */}
        {selectedStudents.length > 0 && (
          <div className="px-10 mt-4">
            <h3 className="mb-2 text-sm">등록된 학생:</h3>
            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-80">
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
        <div className="flex justify-end w-full px-10 mt-8">
          <button
            onClick={handleFinalRegister}
            className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover"
          >
            학생 등록
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
