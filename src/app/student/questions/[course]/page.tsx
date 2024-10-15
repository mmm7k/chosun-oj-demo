'use client';

import { Avatar } from 'antd';
import { LuTags } from 'react-icons/lu';
import { BsSendCheck } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { UserOutlined } from '@ant-design/icons';
import QuestionsMenu from '@/components/student/questions/QuestionsMenu';
import QuestionsMobileMenu from '@/components/student/questions/QuestionsMobileMenu';
import QuestionsBanner from '@/components/student/questions/QuestionsBanner';
import { Suspense } from 'react';

export default function Questions({ params }: { params: { course: string } }) {
  // 현재 url 파라미터 확인
  const course = params.course;
  const questionsList: number[] = [1, 2, 3, 4, 5];
  return (
    <>
      {/* lg 이하에서 카테고리 메뉴 */}
      <QuestionsMobileMenu course={course} />
      {/* 배너 */}
      <Suspense>
        <QuestionsBanner course={course} />
      </Suspense>
      <div className="bg-[#f0f4fc] w-full flex  flex-col lg:flex-row  items-center lg:items-start justify-center ">
        <div className="w-[90%] lg:w-[62%] flex gap-0 pt-12 lg:gap-12 items-start mb-44 ">
          {/* left */}
          <main className="w-full lg:w-[75%]">
            {/* 검색 */}
            <div className="flex items-center w-full px-4 bg-white shadow-md mb-7 rounded-2xl">
              <IoSearchSharp className="text-lg text-gray-400" />
              <input
                type="text"
                className="w-full py-3 pl-3 text-sm focus:outline-none placeholder:text-sm"
                placeholder="키워드를 입력하세요."
              />
            </div>
            {/* Create Question */}
            <div className="px-12 py-10 bg-white shadow-md rounded-2xl">
              {/* Header */}
              <h1 className="mb-4 text-lg font-semibold">💡 Create Question</h1>
              {/* 제목 Box */}
              <div className="flex items-center px-8 py-4 mb-6 bg-gray-100 rounded-2xl">
                <textarea
                  placeholder="제목을 입력해 주세요"
                  className="w-full overflow-hidden text-gray-600 bg-transparent outline-none resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto'; // Reset height
                    target.style.height = `${target.scrollHeight}px`; // Set to scrollHeight
                  }}
                ></textarea>
              </div>
              {/* Input Box */}
              <div className="flex items-center px-8 py-16 mb-6 bg-gray-100 rounded-2xl">
                <textarea
                  placeholder="질문을 입력해 주세요"
                  className="w-full overflow-hidden text-gray-600 bg-transparent outline-none resize-none"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto'; // Reset height
                    target.style.height = `${target.scrollHeight}px`; // Set to scrollHeight
                  }}
                ></textarea>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-end gap-4">
                {/*Button */}
                <button className="flex items-center py-3 space-x-2 text-red-600 transition-all bg-red-100 rounded-full hover:bg-red-200 px-7">
                  <LuTags />
                  <span className="text-sm">Tag</span>
                </button>
                {/* </div> */}
                {/* 등록 Button */}
                <button className="flex items-center py-3 space-x-2 text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 px-7 ">
                  <BsSendCheck />
                  <span className="text-sm">등록</span>
                </button>
              </div>
            </div>

            {/* Q&A 목록 */}

            {questionsList.map((_, i) => (
              <section className="mt-12" key={i}>
                <div className="px-12 py-10 bg-white shadow-md rounded-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="font-semibold ">20214931 김민수</p>
                        <p className="text-sm text-gray-500">{i}min ago</p>
                      </div>
                    </div>
                    <div className="">
                      <button className="text-gray-500">•&nbsp;•&nbsp;•</button>
                    </div>
                  </div>
                  {/* Question */}
                  <h1 className="mt-8 text-lg font-semibold">
                    피라미드 별 출력하기 질문입니다.
                  </h1>
                  <p className="mt-4 text-gray-700">
                    C언어를 이용해 피라미드 모양의 별을 출력하려고 합니다.
                    사용자로부터 입력받은 숫자에 따라 피라미드의 층수를 결정하는
                    방법을 알고 싶습니다. 예를 들어, 입력이 5일 경우 아래와 같은
                    출력이 나와야 합니다:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;***
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*****
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*******
                    <br />
                    &nbsp;&nbsp;&nbsp;*********
                    <br />
                    이를 어떻게 구현할 수 있을까요?
                  </p>
                  {/* Interaction Buttons */}
                  <div className="flex items-center mt-4 space-x-6 ">
                    <span className="text-gray-600">521 Likes</span>

                    <span className="text-gray-600">59 Comments</span>

                    <button className="text-gray-500">Share</button>
                  </div>
                </div>
              </section>
            ))}
          </main>
          {/* right 카테고리 메뉴 */}
          <QuestionsMenu course={course} />
        </div>
      </div>
    </>
  );
}
