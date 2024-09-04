import { Checkbox } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div className="w-[100vw]  h-[100vh] flex ">
        {/* left */}
        <section className="w-1/2  flex items-center justify-center bg-[#0032A0]">
          <div className="w-1/3 h-2/5 relative">
            <Image
              src="/commons/logo.png"
              alt="Chosun Online Judge"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>
        {/* right */}
        <section className="w-1/2 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-sm border-solid border-[1px] border-slate-200 shadow-xl flex flex-col justify-center items-center">
            <span className="text-[#5a5a5a] text-2xl font-bold mb-4 ">
              Chosun Online Judge
            </span>
            <input
              className="w-3/4 h-10 mt-4 rounded-md border-solid border-[1px]  border-slate-200 pl-4  placeholder:text-sm focus:ring-1 focus:ring-gray-200 focus:ring-m focus:outline-none"
              type="text"
              placeholder="학번을 입력해주세요"
            />
            <input
              className="w-3/4 h-10 mt-4 rounded-md border-solid border-[1px] border-slate-200 pl-4 placeholder:text-sm focus:ring-1 focus:ring-gray-200 focus:ring-m focus:outline-none"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {/* 교직원 로그인 체크박스 */}
            <div className="mt-4 w-3/4 flex text-[#5a5a5a] text-sm">
              <Checkbox />
              <span className="ml-2">교직원 로그인</span>
            </div>
            <div className="w-3/4 h-11 rounded-md  bg-[#0032A0] text-white flex items-center justify-center mt-4 cursor-pointer">
              로그인
            </div>
            <Link
              href="/signup"
              className="w-3/4 h-11 rounded-md bg-gray-100 border-[1px] border-gray-200 text-[#5a5a5a]  flex items-center justify-center mt-4 cursor-pointer"
            >
              회원가입
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
