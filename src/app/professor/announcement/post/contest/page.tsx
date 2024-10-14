'use client';

import { Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default function ContestPost() {
  const [selectedContest, setSelectedContest] = useState<string | null>(null);
  const [announcementTitle, setAnnouncementTitle] = useState<string>('');
  const [announcementContent, setAnnouncementContent] = useState<string>('');

  const contestOptions = ['대회1', '대회2'];

  console.log(selectedContest);
  const handleContestChange = (value: string) => setSelectedContest(value);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnnouncementTitle(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnnouncementContent(e.target.value);

  const handlePost = () => {
    if (!selectedContest || !announcementTitle || !announcementContent) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    console.log('Selected Contest:', selectedContest);
    console.log('Announcement title:', announcementTitle);
    console.log('Announcement content:', announcementContent);

    setSelectedContest(null);
    setAnnouncementTitle('');
    setAnnouncementContent('');
  };

  return (
    <div className="min-h-screen p-8 flex">
      <div className="w-full h-full bg-white shadow-lg py-8 rounded-3xl text-secondary font-semibold">
        <section className="flex items-center justify-between px-16">
          <h1 className="text-lg mb-3 md:mb-0">대회 공지 등록</h1>
        </section>
        <hr className="border-t-2 mt-5 border-gray-200" />
        <section className="flex flex-col text-sm">
          <div className="flex flex-col px-10 py-4 border-b-[1.5px] border-gray-200">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-4">
              <label htmlFor="contest-select" className="mr-3">
                대회 선택:
              </label>

              <Select
                id="contest-select"
                placeholder="공지를 등록 할 대회를 선택하세요."
                mode="multiple"
                value={selectedContest}
                onChange={handleContestChange}
                className="w-full sm:w-1/2"
                allowClear
              >
                {contestOptions.map((contest) => (
                  <Option key={contest} value={contest}>
                    {contest}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="px-10 py-4 border-b-[1.5px] border-gray-200">
            <input
              className="w-full h-10   rounded-lg border-[1px] border-gray-200 pl-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none"
              type="text"
              value={announcementTitle}
              onChange={handleTitleChange}
              placeholder="공지 제목을 입력하세요."
            />
          </div>
          <div className="px-10 py-4 border-b-[1.5px] border-gray-200">
            <textarea
              rows={6}
              className="w-full h-[50dvh] rounded-lg border-[1px] border-gray-200 p-4 placeholder:text-sm placeholder:font-normal focus:ring-1 focus:ring-gray-200 focus:outline-none resize-none"
              value={announcementContent}
              onChange={handleContentChange}
              placeholder="공지 내용을 입력하세요."
            />
          </div>
        </section>
        <div className="flex justify-end px-10 mt-8">
          <button
            className="px-4 py-2 bg-primary text-white text-base rounded-xl font-normal hover:bg-primaryButtonHover"
            onClick={handlePost}
          >
            공지 등록
          </button>
        </div>
      </div>
    </div>
  );
}
