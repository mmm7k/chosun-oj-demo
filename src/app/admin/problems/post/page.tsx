'use client';
import { Checkbox, Select } from 'antd'; // Select를 추가로 임포트
import { SetStateAction, useState } from 'react';
import { PiExclamationMarkFill } from 'react-icons/pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const { Option } = Select;

export default function Post() {
  const [isDisclose, setIsDisclose] = useState(false);
  const [isManage, setIsManage] = useState(false);
  const [isMarkdownAccess, setIsMarkdownAccess] = useState(false);
  const [postDate, setPostDate] = useState(new Date());
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedVisibility, setSelectedVisibility] = useState([]);

  const handleOrganizationChange = (value: SetStateAction<never[]>) => {
    setSelectedOrganizations(value); // 멀티플 셀렉션에 맞게 값 설정
  };
  const handleVisibilityChange = (value: SetStateAction<never[]>) => {
    setSelectedVisibility(value); // 멀티플 셀렉션에 맞게 값 설정
  };

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
              <span className="mr-2">공개: </span>
              <Checkbox
                checked={isDisclose}
                onChange={(e) => setIsDisclose(e.target.checked)}
              />
            </div>
          </div>
          {/* 수동 관리 여부 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <span className="mr-2">수동 관리: </span>

              <Checkbox
                checked={isManage}
                onChange={(e) => setIsManage(e.target.checked)}
              />
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>&nbsp; 심사위원의 데이터 관리 허용 여부.</span>
            </span>
          </div>
          {/* 게시 날짜 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <span>게시 날짜: </span>
              <DatePicker
                selected={postDate}
                onChange={(date) => date && setPostDate(date)}
                showTimeSelect
                dateFormat="Pp"
                timeIntervals={1}
                minDate={new Date()}
                className="cursor-pointer ml-2 w-auto h-8 rounded-md border-[1px] border-gray-200 pl-4 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </div>
          </div>
          {/* 조직  */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <span className="mr-3">조직: </span>
              <Select
                mode="multiple"
                placeholder="조직을 선택하세요."
                value={selectedOrganizations}
                onChange={handleOrganizationChange}
                className="w-[15%]"
              >
                <Option value="java">Java</Option>
                <Option value="c++">C++</Option>
                <Option value="c">C</Option>
              </Select>
            </div>
          </div>

          {/* 제출 소스 가시성  */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <span className="mr-3">제출 소스 가시성: </span>
              <Select
                placeholder="제출 소스 가시성을 선택하세요."
                value={selectedVisibility}
                onChange={handleVisibilityChange}
                className="w-[17%]"
              >
                <Option value="전역 설정 따르기">전역 설정 따르기</Option>
                <Option value="항상 보이기">항상 보이기</Option>
                <Option value="문제가 해결됐을 경우 보이기">
                  문제가 해결됐을 경우 보이기
                </Option>
                <Option value="자신의 제출물만">자신의 제출물만</Option>
              </Select>
            </div>
          </div>
          {/* 전체 마크다운 액세스 허용*/}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <span className="mr-2">전체 마크다운 액세스 허용: </span>
              <Checkbox
                checked={isMarkdownAccess}
                onChange={(e) => setIsMarkdownAccess(e.target.checked)}
              />
            </div>
          </div>
          {/* 등록 버튼 */}
          <div className="w-full flex justify-end px-10">
            <button className="px-4 py-2 w-[a7%] mt-5 h-10 bg-primary text-white rounded-md font-normal hover:bg-primaryButtonHover">
              문제 등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
