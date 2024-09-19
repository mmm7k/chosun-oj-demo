'use client';

import { Checkbox, Select } from 'antd';
import { SetStateAction, useState } from 'react';
import { PiExclamationMarkFill } from 'react-icons/pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PrimaryButton from '@/components/PrimaryButton';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const { Option } = Select;
const mdParser = new MarkdownIt();

export default function Post() {
  const [isDisclose, setIsDisclose] = useState(false);
  const [isManage, setIsManage] = useState(false);
  const [isMarkdownAccess, setIsMarkdownAccess] = useState(false);
  const [postDate, setPostDate] = useState(new Date());
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedVisibility, setSelectedVisibility] = useState('');
  const [markdownText, setMarkdownText] = useState('');
  const [isJavaChecked, setIsJavaChecked] = useState(false);
  const [isCppChecked, setIsCppChecked] = useState(false);
  const [isCChecked, setIsCChecked] = useState(false);
  const [isPythonChecked, setIsPythonChecked] = useState(false);

  const handleOrganizationChange = (value: SetStateAction<never[]>) => {
    setSelectedOrganizations(value);
  };
  const handleVisibilityChange = (value: string) => {
    setSelectedVisibility(value);
  };
  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownText(text);
  };

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex justify-between items-center px-16 relative ">
          <h1 className="text-xl">문제 등록</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col text-sm ">
          {/* 문제 코드 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="problem-code">문제 코드:</label>
              <input
                className="ml-3 w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="problem-code"
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
              <label htmlFor="problem-name">문제 이름:</label>
              <input
                className="ml-3 w-[20%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                id="problem-name"
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
              <label htmlFor="disclose-checkbox" className="mr-2">
                공개:
              </label>
              <Checkbox
                id="disclose-checkbox"
                checked={isDisclose}
                onChange={(e) => setIsDisclose(e.target.checked)}
              />
            </div>
          </div>
          {/* 수동 관리 여부 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <label htmlFor="manage-checkbox" className="mr-2">
                수동 관리:
              </label>
              <Checkbox
                id="manage-checkbox"
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
              <label htmlFor="post-date">게시 날짜: </label>
              <DatePicker
                id="post-date"
                selected={postDate}
                onChange={(date) => date && setPostDate(date)}
                showTimeSelect
                dateFormat="Pp"
                timeIntervals={1}
                minDate={new Date()}
                className="cursor-pointer ml-2 w-auto h-8 rounded-lg border-[1px] border-gray-200 pl-4 focus:ring-1 focus:ring-gray-200 focus:outline-none"
              />
            </div>
          </div>
          {/* 조직 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="organization-select" className="mr-3">
                조직:{' '}
              </label>
              <Select
                id="organization-select"
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
          {/* 제출 소스 가시성 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="visibility-select" className="mr-3">
                제출 소스 가시성:{' '}
              </label>
              <Select
                id="visibility-select"
                placeholder="제출 소스 가시성을 선택하세요."
                value={selectedVisibility}
                onChange={handleVisibilityChange}
                className="w-[19%]"
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
          {/* 전체 마크다운 액세스 허용 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <label htmlFor="markdown-access-checkbox" className="mr-2">
                전체 마크다운 액세스 허용:{' '}
              </label>
              <Checkbox
                id="markdown-access-checkbox"
                checked={isMarkdownAccess}
                onChange={(e) => setIsMarkdownAccess(e.target.checked)}
              />
            </div>
          </div>
          {/* 마크다운 에디터 */}
          <div className="flex flex-col justify-center px-10 py-7  border-b-[1.5px] border-gray-200 ">
            <div>
              <label htmlFor="markdown-editor">문제 본문: </label>

              <div className="mt-6">
                <MdEditor
                  id="markdown-editor"
                  value={markdownText}
                  style={{ height: '25rem' }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </div>
          {/* 문제 유형 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="problem-type-select" className="mr-3">
                문제 유형:
              </label>
              <Select
                id="problem-type-select"
                mode="multiple"
                placeholder="문제 유형을 선택하세요."
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
          {/* 문제 그룹 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="problem-group-select" className="mr-3">
                문제 그룹:
              </label>
              <Select
                id="problem-group-select"
                placeholder="문제 그룹을 선택하세요."
                value={selectedVisibility}
                onChange={handleVisibilityChange}
                className="w-[19%]"
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
          {/* 점수 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="score-input">점수: </label>
              <input
                id="score-input"
                className="ml-3 w-[5%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                type="number"
                min={1}
                max={100}
              />
            </div>
          </div>
          {/* 시간 제한 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="time-limit-input">시간 제한:</label>
              <input
                id="time-limit-input"
                className="ml-3 w-[5%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                type="number"
                min={1}
                max={1}
              />
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>
                &nbsp; 이 문제의 시간 제한(초)입니다. 소수 자릿수 초(예: 1.5)가
                지원됩니다.
              </span>
            </span>
          </div>
          {/* 메모리 제한 */}
          <div className="flex flex-col justify-center px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div className="flex items-center">
              <label htmlFor="memory-limit-input">메모리 제한:</label>
              <input
                id="memory-limit-input"
                className="ml-3 w-[5%] h-8 rounded-lg  border-[1px] border-gray-200 font-norm pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
                type="number"
                min={1}
                max={262144}
              />
            </div>
            <span className="text-xs font-normal text-gray-400  mt-3 flex items-center">
              <PiExclamationMarkFill className="text-lg" />
              <span>
                &nbsp; 이 문제에 대한 메모리 제한(KB)입니다(예: 256mb =
                262144KB).
              </span>
            </span>
          </div>
          {/* 언어 */}
          <div className="flex px-10 py-4 border-b-[1.5px] border-gray-200 ">
            <div>
              <span className="mr-5">언어:</span>
              <label htmlFor="java-checkbox" className="mr-2">
                Java
              </label>
              <Checkbox
                id="java-checkbox"
                checked={isJavaChecked}
                onChange={(e) => setIsJavaChecked(e.target.checked)}
              />
            </div>

            <label htmlFor="c++-checkbox" className="ml-4 mr-2">
              C++
            </label>
            <Checkbox
              id="c++-checkbox"
              checked={isCppChecked}
              onChange={(e) => setIsCppChecked(e.target.checked)}
            />
            <label htmlFor="c-checkbox" className="ml-4 mr-2">
              C
            </label>
            <Checkbox
              id="c-checkbox"
              checked={isCChecked}
              onChange={(e) => setIsCChecked(e.target.checked)}
            />
            <label htmlFor="python-checkbox" className="ml-4 mr-2">
              Python
            </label>
            <Checkbox
              id="python-checkbox"
              checked={isPythonChecked}
              onChange={(e) => setIsPythonChecked(e.target.checked)}
            />
          </div>
          {/* 등록 버튼 */}
          <div className="w-full flex justify-end px-10 mt-8">
            <PrimaryButton text="문제 등록" />
          </div>
        </section>
      </div>
    </div>
  );
}
