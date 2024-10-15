'use client';

import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export default function ContestAnnouncement() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const announcements = [
    {
      id: 1,
      message: '터미널 접속 시 간헐적으로 연결이 끊기는 문제를 해결했습니다.',
    },
    {
      id: 2,
      message: '서비스 이용 중 문의 사항은 Q&A 게시판을 이용해주세요.',
    },
    { id: 3, message: '자세한 공지사항은 공지사항 게시판을 이용해주세요.' },
  ];

  const toggleItemExpansion = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((itemId) => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <section className="flex flex-col w-full mb-10 bg-white border border-gray-300 rounded-2xl">
      {/* 공지사항 아코디언 */}
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="border-b border-gray-200 last:border-b-0"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#eeeff3] "
            onClick={() => toggleItemExpansion(announcement.id)}
          >
            <span>📢 {announcement.message}</span>
            <span className="text-lg">
              {expandedItems.includes(announcement.id) ? (
                <IoChevronUp />
              ) : (
                <IoChevronDown />
              )}
            </span>
          </div>
          {expandedItems.includes(announcement.id) && (
            <div className="px-10 py-4 text-sm border-t border-gray-300">
              <p>문제 제출 시 접속 ip도 함께 제출됩니다.</p>
              <p>대회 도중 ip가 변경되지 않도록 주의하세요.</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
