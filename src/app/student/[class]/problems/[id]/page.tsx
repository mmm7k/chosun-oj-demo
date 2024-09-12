'use client';

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Split from 'react-split'; // react-split 임포트

export default function Problem() {
  const [code, setCode] = useState(`#include <string>
#include <vector>

using namespace std;

string solution(string s) {
    string answer = "";
    return answer;
}
`);
  const pathname = usePathname();

  const parts = pathname.split('/');
  const selectedClass = parts.find(
    (part, index) =>
      parts[index - 1] === 'student' && parts[index + 1] === 'problems',
  );

  return (
    <>
      <div className="h-screen flex flex-col text-gray-800">
        {/* 헤더 */}
        <div className="min-h-14 bg-[#001d5e] text-white flex items-center px-12">
          <div className="w-9 h-9 relative mr-3">
            <Image
              src={'/commons/whiteSymbol.png'}
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-lg">Chosun Online Judge</span>
        </div>

        {/* 문제 이름 */}
        <div className="w-full h-14 border-b-[1.5px] bg-white border-gray-300 px-12 flex items-center">
          <span className="mt-4 text-primary font-semibold border-b-[3px] pb-3 border-primary">
            피라미드 문제
          </span>
        </div>

        {/* 가변 섹션 */}
        <Split
          className="flex-1 flex bg-white min-h-0"
          sizes={[50, 50]}
          minSize={200}
        >
          {/* 왼쪽 섹션 */}
          <div className="px-12 py-5 space-y-5 overflow-auto w-[50%]">
            <h1 className="font-semibold">문제 설명</h1>
            <p className="text-sm">
              정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면
              -1을 return 하도록 solution 함수를 완성해주세요.
            </p>
            <hr className="border-[1px] border-gray-200" />
            <h1 className="font-semibold">제한 사항</h1>
            <p className="text-sm">
              * num1, num2는 -10,000,000 이상, 10,000,000 이하인 정수입니다.
              <br /> <br /> * num1, num2는 -10,000,000 이상, 10,000,000 이하인
              정수입니다.
            </p>
            <hr className="border-[1px] border-gray-200" />
            <h1 className="font-semibold">입출력 예</h1>
            <div className="text-sm">
              <table className="w-[30%] text-center border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300">num1</th>
                    <th className="border border-gray-300">num2</th>
                    <th className="border border-gray-300">return</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300">3</td>
                    <td className="border border-gray-300">3</td>
                    <td className="border border-gray-300">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300">3</td>
                    <td className="border border-gray-300">4</td>
                    <td className="border border-gray-300">-1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="border-[1px] border-gray-200" />
            <h1 className="font-semibold">입출력 예 설명</h1>
            <h2 className="font-semibold">입출력 예 #1</h2>
            <p className="text-sm">
              정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면
              -1을 return 하도록 solution 함수를 완성해주세요.
            </p>
            <h2 className="font-semibold">입출력 예 #2</h2>
            <p className="text-sm">
              정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면
              -1을 return 하도록 solution 함수를 완성해주세요.
            </p>
            <h2 className="font-semibold">입출력 예 #3</h2>
            <p className="text-sm">
              정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면
              -1을 return 하도록 solution 함수를 완성해주세요.
            </p>
          </div>

          {/* 오른쪽 섹션 */}
          <Split direction="vertical" sizes={[50, 50]} minSize={100}>
            {/* 코드 에디터 */}
            <div className="h-full overflow-auto ">
              <MonacoEditor
                language="cpp"
                theme="vs-light"
                value={code}
                onChange={(newCode) => setCode(newCode || '')}
                options={{
                  suggestOnTriggerCharacters: false,
                  quickSuggestions: false,
                  tabCompletion: 'off',
                }}
              />
            </div>

            {/* 실행 결과 */}
            <div className=" bg-gray-100 overflow-auto">
              <h1 className="font-semibold border-b py-3 px-5 border-gray-300">
                실행 결과
              </h1>
              <p className="text-sm py-3 px-5">실행 결과가 표시됩니다.</p>
            </div>
          </Split>
        </Split>

        {/* 푸터 */}
        <div className="min-h-16 bg-white text-white flex items-center justify-between px-12 border-t border-gray-300">
          {/* 왼쪽 버튼 */}
          <Link href={`/student/${selectedClass}/problems`}>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
              이전으로
            </button>
          </Link>
          {/* 오른쪽 버튼들 */}
          <div className="flex space-x-4">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
              초기화
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
              코드 실행
            </button>
            <button className="bg-[#002a87] text-white px-4 py-2 rounded-md hover:bg-[#00226e] transition">
              제출 후 채점하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
