import MobileCategory from '@/components/student/problems/MobileMenu';
import ProblemList from '@/components/student/problems/ProblemList';

export default function Problems() {
  return (
    <div className="bg-[#f0f4fc] w-full flex flex-col lg:flex-row items-center lg:items-start justify-center text-secondary">
      {/* lg 이하에서 카테고리(aside bar 대체) */}
      <MobileCategory />
      <div className="w-[90%] lg:w-[62%] flex gap-0 lg:gap-12 pt-14 items-start mb-56">
        <ProblemList />
        {/* lg: 이상일때 aside bar  */}
        <aside className="hidden lg:block flex-1  p-8 text-sm bg-white shadow-md rounded-2xl ">
          <h1 className="font-semibold text-secondary mb-8">
            기초프로그래밍 01분반
          </h1>
          <ul className="space-y-7 text-gray-500">
            <li className="hover:text-gray-700 transition cursor-pointer">
              1. 변수
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              2. 문자열
            </li>
            <li className="text-primary hover:text-primaryHover transition font-semibold cursor-pointer">
              3. 반복문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              4. 조건문
            </li>
            <li className="hover:text-gray-700 transition cursor-pointer">
              5. 포인터
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
