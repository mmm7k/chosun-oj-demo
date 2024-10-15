'use client';

import { useState } from 'react';

export default function CoursePost() {
  const [announcementTitle, setAnnouncementTitle] = useState<string>('');
  const [announcementContent, setAnnouncementContent] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnnouncementTitle(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnnouncementContent(e.target.value);

  const handlePost = () => {
    if (!announcementTitle || !announcementContent) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    console.log('Announcement title:', announcementTitle);
    console.log('Announcement content:', announcementContent);

    setAnnouncementTitle('');
    setAnnouncementContent('');
  };

  return (
    <div className="flex min-h-screen p-8">
      <div className="w-full h-full py-8 font-semibold bg-white shadow-lg rounded-3xl text-secondary">
        <section className="flex items-center justify-between px-16">
          <h1 className="mb-3 text-lg md:mb-0">공지 등록</h1>
        </section>
        <hr className="mt-5 border-t-2 border-gray-200" />
        <section className="flex flex-col text-sm">
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
            className="px-4 py-2 text-base font-normal text-white bg-primary rounded-xl hover:bg-primaryButtonHover"
            onClick={handlePost}
          >
            공지 등록
          </button>
        </div>
      </div>
    </div>
  );
}
