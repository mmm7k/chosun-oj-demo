import Link from 'next/link';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { FaCodeBranch } from 'react-icons/fa';
import { AiOutlineCodeSandbox } from 'react-icons/ai';

export default function SelectClass() {
  return (
    <div className="text-primaryFont font-semibold">
      {/* Title */}
      <h1 className="mt-24 text-2xl text-center block mb-14 text-primary">
        과목을 선택해 주세요
      </h1>

      {/* Cards for class selection */}
      <div className="flex justify-center space-x-16">
        {/* Card for 기초 프로그래밍 */}
        <Link href="/student/기초프로그래밍-01분반/problems">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-20 px-14 border-[3px] border-transparent hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-8 mb-4">
                <HiOutlineComputerDesktop className="text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-lg text-gray-800">
                기초 프로그래밍
              </span>
              <span className=" mt-1 text-gray-500">01분반</span>
            </div>
          </div>
        </Link>

        {/* Card for 심화 프로그래밍 */}
        <Link href="/student/심화프로그래밍-01분반/problems">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-20 px-14 border-[3px] border-transparent  hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-8 mb-4">
                <FaCodeBranch className="text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-lg text-gray-800">
                심화 프로그래밍
              </span>
              <span className=" mt-1 text-gray-500">01분반</span>
            </div>
          </div>
        </Link>

        {/* Card for 자바 프로그래밍 */}
        <Link href="/student/자바프로그래밍-01분반/problems">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-20 px-14 border-[3px] border-transparent  hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-8 mb-4">
                <AiOutlineCodeSandbox className="text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-lg text-gray-800">
                자바 프로그래밍
              </span>
              <span className=" mt-1 text-gray-500">01분반</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
