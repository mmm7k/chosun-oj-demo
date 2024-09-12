'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

export default function Problem() {
  const [code, setCode] = useState(`#include <string>
#include <vector>

using namespace std;

string solution(string s) {
    string answer = "";
    return answer;
}
`);

  console.log(code);
  return (
    <div className="flex h-screen">
      {/* 왼쪽 섹션 */}
      <div className="w-1/3 p-4 bg-gray-100">
        <h1 className="text-xl font-bold">문제 설명</h1>
        <p>여기에 문제와 관련된 설명을 넣을 수 있습니다.</p>
      </div>

      {/* 오른쪽 섹션 - Monaco Editor */}
      <div className="w-2/3">
        <MonacoEditor
          height="50vh"
          language="cpp"
          theme="vs-light" // Light 모드 설정
          value={code}
          onChange={(newCode) => setCode(newCode || '')}
          options={{
            suggestOnTriggerCharacters: false, // 자동 완성 트리거 비활성화
            quickSuggestions: false, // 빠른 제안 비활성화
            tabCompletion: 'off', // 탭으로 제안 완성 기능 비활성화
          }}
        />
      </div>
    </div>
  );
}
