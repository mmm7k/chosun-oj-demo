'use client';

import Image from 'next/image';

import { useSearchParams } from 'next/navigation';

export default function QuestionsBanner({ course }: { course: string }) {
  const decodedCourse = decodeURIComponent(course);
  const searchParams = useSearchParams();
  const chapter = searchParams.get('chapter');
  // 배너 캐러셀 세팅

  return (
    <section className=" w-screen h-44 bg-gradient-to-r from-[#9face6] to-[#74ebd5]  ">
      <div className="w-screen px-[10%] lg:px-[20%] h-44">
        <div className="h-44 flex justify-between items-center">
          <div
            className="flex flex-col gap-1 text-white text-2xl "
            style={{ textShadow: '1px 2px 3px rgba(0, 0, 0, 0.5)' }}
          >
            <span>
              💡 {decodedCourse === 'common' ? '공통 Q&A' : decodedCourse}
            </span>
            <span className="pl-[18%]">
              {chapter ? `Chapter ${chapter}` : ''}
            </span>
          </div>
          <div className="h-full w-[50%] relative">
            <Image
              src={'/banner/questionBanner.png'}
              layout="fill"
              objectFit="contain"
              alt="banner1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
