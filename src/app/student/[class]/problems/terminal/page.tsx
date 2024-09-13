// 'use client';

// import { useRef, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Split from 'react-split';
// import io, { Socket } from 'socket.io-client';
// import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
// import 'xterm/css/xterm.css'; // Xterm.js 스타일 적용

// export default function TerminalProblem() {
//   const pathname = usePathname();
//   const parts = pathname.split('/');
//   const selectedClass = parts.find(
//     (part, index) =>
//       parts[index - 1] === 'student' && parts[index + 1] === 'problems',
//   );

//   const [socket, setSocket] = useState<Socket | null>(null); // Socket.IO 연결 상태 관리
//   const [isConnected, setIsConnected] = useState(false); // 연결 상태 플래그
//   const terminalRef = useRef<HTMLDivElement>(null); // 터미널 DOM을 참조할 ref
//   const term = useRef<Terminal | null>(null); // Xterm.js 터미널 인스턴스
//   const fitAddon = useRef(new FitAddon()); // FitAddon 인스턴스

//   // 터미널 초기화 및 소켓 연결
//   const connectSocket = () => {
//     if (!isConnected && terminalRef.current) {
//       // Xterm.js 터미널 초기화
//       term.current = new Terminal({
//         cursorBlink: true,
//         rows: 24,
//         cols: 80,
//       });

//       term.current.loadAddon(fitAddon.current);
//       term.current.open(terminalRef.current);

//       // 터미널을 화면 크기에 맞게 조정
//       fitAddon.current.fit();

//       // DOM 크기 변화 감지
//       const resizeObserver = new ResizeObserver(() => {
//         fitAddon.current.fit();
//       });
//       resizeObserver.observe(terminalRef.current);

//       // 터미널 초기 메시지 출력
//       term.current.writeln('Welcome to the online judge terminal!\r\n');

//       // 입력 버퍼
//       let inputBuffer = '';
//       let ignoreNextOutput = false; // 첫 번째 출력을 무시할 플래그
//       console.log('Socket.IO 연결 시도');
//       // Socket.IO 연결
//       //@ts-ignore
//       const socketConnection = io(process.env.NEXT_PUBLIC_SSH); // 서버 주소
//       setSocket(socketConnection); // 소켓을 상태에 저장

//       socketConnection.on('connect', () => {
//         setIsConnected(true);
//         console.log('Socket.IO 연결 성공');

//         // 터미널에서 입력을 처리할 때, 한 글자씩 버퍼에 저장
//         term.current?.onData((data) => {
//           if (data === '\t') {
//             // 탭 자동 완성 요청
//             socketConnection.emit('autocomplete', inputBuffer);
//           } else if (data === '\x03') {
//             // 서버로 Ctrl+C 명령 전송
//             socketConnection.emit('command', '\x03');
//           } else if (data === '\r') {
//             // 명령어 입력 후 서버로 전송
//             socketConnection.emit('command', inputBuffer);
//             inputBuffer = ''; // 버퍼 초기화
//             term.current.write('\r\n'); // 입력 후 줄바꿈 (명령어는 출력 안 함)
//             ignoreNextOutput = true; // 첫 번째 서버 출력 무시 플래그 설정
//           } else if (data === '\u007F') {
//             // 백스페이스 처리
//             if (inputBuffer.length > 0) {
//               inputBuffer = inputBuffer.slice(0, inputBuffer.length - 1);
//               term.current.write('\b \b'); // 터미널에서 백스페이스 효과
//             }
//           } else {
//             // 일반 입력 처리
//             inputBuffer += data; // 버퍼에 데이터 추가
//             term.current.write(data); // 입력한 내용을 터미널에 표시
//           }
//         });
//       });

//       // 서버로부터의 출력 데이터를 터미널에 출력
//       socketConnection.on('output', (data) => {
//         if (term.current) {
//           if (ignoreNextOutput) {
//             ignoreNextOutput = false; // 첫 번째 출력은 무시
//           } else {
//             term.current.write(data); // 서버에서 출력된 결과만 터미널에 표시
//           }
//         }
//       });

//       return () => {
//         // 컴포넌트 언마운트 시 옵저버와 소켓 연결 해제
//         resizeObserver.disconnect();
//         if (socket) {
//           socket.disconnect();
//         }
//       };
//     }
//   };

//   // 소켓 연결 해제
//   const disconnectSocket = () => {
//     if (socket) {
//       socket.disconnect();
//       setIsConnected(false); // 연결 해제 후 상태 업데이트
//       term.current?.dispose(); // 터미널 정리
//     }
//   };

//   return (
//     <>
//       <div className="h-screen flex flex-col text-gray-800">
//         {/* 헤더 */}
//         <div className="min-h-14 bg-[#001d5e] text-white flex items-center px-12">
//           <div className="w-9 h-9 relative mr-3">
//             <Image
//               src={'/commons/whiteSymbol.png'}
//               alt="Logo"
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//           <span className="text-lg">Chosun Online Judge</span>
//         </div>

//         {/* 문제 이름 */}
//         <div className="w-full h-14 border-b-[1.5px] bg-white border-gray-300 px-12 flex items-center">
//           <span className="mt-4 text-primary font-semibold border-b-[3px] pb-3 border-primary">
//             피라미드 문제
//           </span>
//         </div>

//         {/* 가변 섹션 */}
//         <Split
//           className="flex-1 flex bg-white min-h-0"
//           sizes={[50, 50]}
//           minSize={200}
//         >
//           {/* 왼쪽 섹션 */}
//           <div className="px-12 py-5 space-y-5 overflow-auto w-[50%]">
//             <h1 className="font-semibold">문제 설명</h1>
//             <p className="text-sm">
//               정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면
//               -1을 return 하도록 solution 함수를 완성해주세요.
//             </p>
//             {/* 문제 설명 및 테이블 생략 */}
//           </div>

//           {/* 오른쪽 섹션 */}
//           <Split direction="vertical" sizes={[50, 50]} minSize={100}>
//             {/* Xterm.js 터미널 생성 */}
//             {/* <div className="flex-1 flex bg-white min-h-0"> */}
//             <div className="h-full overflow-auto ">
//               <div
//                 ref={terminalRef}
//                 style={{ width: '100%', height: '100%' }}
//               ></div>
//             </div>

//             {/* 실행 결과 */}
//             <div className="bg-gray-100 overflow-auto">
//               <h1 className="font-semibold border-b py-3 px-5 border-gray-300">
//                 실행 결과
//               </h1>
//               <p className="text-sm py-3 px-5">실행 결과가 표시됩니다.</p>
//             </div>
//           </Split>
//         </Split>

//         {/* 푸터 */}
//         <div className="min-h-16 bg-white text-white flex items-center justify-between px-12 border-t border-gray-300">
//           {/* 왼쪽 버튼 */}
//           <Link href={`/student/${selectedClass}/problems`}>
//             <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
//               이전으로
//             </button>
//           </Link>
//           {/* 오른쪽 버튼들 */}
//           <div className="flex space-x-4">
//             <button
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
//               onClick={connectSocket}
//             >
//               코드 실행
//             </button>
//             <button
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
//               onClick={disconnectSocket}
//             >
//               연결 해제
//             </button>
//             <button className="bg-[#002a87] text-white px-4 py-2 rounded-md hover:bg-[#00226e] transition">
//               제출 후 채점하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
