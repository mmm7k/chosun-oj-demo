export default function Footer() {
  return (
    <footer className="h-72 w-full px-[10%] lg:px-[19%] bg-white text-sm text-gray-400 pt-14 flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-20 border-t border-gray-200 ">
      <div className="flex flex-col space-y-3">
        <span className="text-gray-500 font-semibold">TEAM Oops</span>
        <span>강문수&nbsp;&nbsp;김재호</span>
        <span>김민수&nbsp;&nbsp;박준걸</span>
        <span>전성환&nbsp;&nbsp;안재빈</span>
        <span>Ayesha Akter Lata</span>
      </div>
      <div className="flex flex-col space-y-3">
        <span className="text-gray-500 font-semibold">문의</span>
        <span>example@chosun.ac.kr</span>
      </div>
      <div className="flex flex-col space-y-3">
        <span className="text-gray-500 font-semibold">찾아오시는 길</span>
        <span>조선대학교</span>
        <span>컴퓨터 네트워크 연구실</span>
      </div>
    </footer>
  );
}
