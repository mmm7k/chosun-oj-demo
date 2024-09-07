import { LiaChalkboardTeacherSolid } from 'react-icons/lia';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 flex">
      <div className="flex flex-1 gap-4">
        {/* 좌측 영역 */}
        <div className="flex flex-col gap-4 w-1/3">
          {/* 좌측 프로필 영역 */}
          <div className="bg-white rounded-md shadow-lg p-6 flex-grow flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="text-primary text-xl font-bold flex items-center">
              <LiaChalkboardTeacherSolid className="text-3xl mr-2" />
              <span>강문수</span>
            </div>
            <hr className="w-full my-4 " />
          </div>

          {/* 좌측 하단 담당 과목 영역 */}
          <div className="bg-white rounded-md shadow-lg p-6 flex-grow">
            <span className="font-bold">📚 담당 과목</span>
            <hr className="w-full my-4 " />
            <ul className="mt-2 space-y-2">
              <li>• 심화 프로그래밍 - 01 분반</li>
              <li>• 심화 프로그래밍 - 01 분반</li>
            </ul>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className="flex flex-col w-2/3 gap-4">
          {/* 상단 3개의 작은 카드 영역 */}
          <div className="flex gap-4 text-sm">
            <div className="bg-white rounded-md shadow-lg p-6 h-32 flex-grow">
              <span className="font-bold">📝 할 일 목록</span>
              <hr className="w-full my-2 " />
              <ul className="mt-2 space-y-1 ">
                <li>• 코딩 과제</li>
                <li>• 강의 준비</li>
              </ul>
            </div>
            <div className="bg-white rounded-md shadow-lg p-6 h-32 flex-grow">
              <span className="font-bold">📢 공지사항</span>
              <hr className="w-full my-2 " />
              <ul className="mt-2 space-y-1">
                <li>• 다음 주 휴강 안내</li>
                <li>• 새 과제 업데이트</li>
              </ul>
            </div>
            <div className="bg-white rounded-md shadow-lg p-6 h-32 flex-grow">
              <span className="font-bold">🗒 메모</span>
              <hr className="w-full my-2 " />
              <p className="mt-2">오늘 할 일 완료</p>
            </div>
          </div>

          {/* 우측 메인 영역 */}
          <div className="bg-white rounded-md shadow-lg p-6 flex-grow ">
            <h2 className="font-bold text-lg">📊 메인 컨텐츠</h2>
            <hr className="w-full my-6 " />
            <p className="mt-4 ">
              여기에 메인 컨텐츠가 표시됩니다. 예를 들어, 주간 리포트나 실시간
              통계 같은 내용이 들어갈 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
