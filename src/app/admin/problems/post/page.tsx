'use client';
import { Checkbox } from 'antd';
import { useState } from 'react';
import { PiExclamationMarkFill } from 'react-icons/pi';

export default function Post() {
  const [isDisclose, setIsDisclose] = useState(false);
  const [isManage, setIsManage] = useState(false);
  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-10 rounded-md text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 relative ">
          <h1 className="text-xl">문제 등록</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col text-sm ">
          {/* 문제 코드 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <span>문제 코드: </span>
              <input
                className="ml-5 w-[30%] h-8 rounded-md  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                type="text"
                placeholder="문제코드를 입력해주세요"
              />
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>
                &nbsp; /problem/ 뒤의 URL에서 사용되는 문제에 대한 짧고 고유한
                코드.
              </span>
            </span>
          </div>
          {/* 문제 이름 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <span>문제 이름: </span>
              <input
                className="ml-5 w-[30%] h-8 rounded-md  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                type="text"
                placeholder="문제이름을 입력해주세요"
              />
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>&nbsp; 문제 목록에 표시된 문제의 전체 이름입니다.</span>
            </span>
          </div>
          {/* 공개 여부 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <Checkbox
                checked={isDisclose}
                onChange={(e) => setIsDisclose(e.target.checked)}
              />
              <span className="ml-2">공개</span>
            </div>
          </div>
          {/* 수동 관리 여부 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <Checkbox
                checked={isManage}
                onChange={(e) => setIsManage(e.target.checked)}
              />
              <span className="ml-2">수동 관리</span>
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>&nbsp; 심사위원의 데이터 관리 허용 여부.</span>
            </span>
          </div>
          {/* 등록 버튼 */}
          <div className="w-full flex justify-end px-10">
            <button className="px-4 py-2 w-[7%] mt-5 h-10 bg-primary text-white rounded-md font-normal hover:bg-primaryButtonHover">
              문제 등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
