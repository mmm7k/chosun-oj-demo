import Link from 'next/link';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { FaCodeBranch } from 'react-icons/fa';
import { AiOutlineCodeSandbox } from 'react-icons/ai';

export default function AssignmentSelectClass() {
  return (
    <div className="bg-[#f0f4fc]   font-semibold flex justify-center items-center py-[10dvh] md:py-[20dvh]  ">
      <section className="flex flex-col md:flex-row justify-center md:space-x-16 space-y-14 md:space-y-0 mb-[4rem]">
        <Link href="/student/assignment/기초 프로그래밍?chapter=1">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-16 md:py-20 px-24 md:px-14 border-[3px] border-transparent hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-6 md:p-8 mb-4">
                <HiOutlineComputerDesktop className="text-[5rem] md:text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-xl md:text-lg text-gray-800">
                기초 프로그래밍
              </span>
              <span className="mt-1 text-lg md:text-base text-gray-500">
                01분반
              </span>
            </div>
          </div>
        </Link>

        <Link href="/student/assignment/심화 프로그래밍?chapter=1">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-16 md:py-20 px-24 md:px-14 border-[3px] border-transparent hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-6 md:p-8 mb-4">
                <FaCodeBranch className="text-[5rem] md:text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-xl md:text-lg text-gray-800">
                심화 프로그래밍
              </span>
              <span className="mt-1 text-lg md:text-base text-gray-500">
                01분반
              </span>
            </div>
          </div>
        </Link>

        <Link href="/student/assignment/자바 프로그래밍?chapter=1">
          <div className="cursor-pointer bg-white shadow-xl rounded-3xl py-16 md:py-20 px-24 md:px-14 border-[3px] border-transparent hover:border-blue-400 transition-all">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-t from-blue-100 to-blue-400 rounded-full p-6 md:p-8 mb-4">
                <AiOutlineCodeSandbox className="text-[5rem] md:text-[6rem] text-white" />
              </div>
              <span className="mt-4 text-xl md:text-lg text-gray-800">
                자바 프로그래밍
              </span>
              <span className="mt-1 text-lg md:text-base text-gray-500">
                01분반
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
