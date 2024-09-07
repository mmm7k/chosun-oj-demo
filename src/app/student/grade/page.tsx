export default function Grade() {
  return (
    <div
      className="w-full relative text-primaryFont font-semibold"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] min-h-[35%] h-auto bg-white shadow-2xl rounded-lg flex flex-col pt-4 pb-4  ">
        <span className="text-lg text-center">
          강의와 분반을 선택해 주세요.
        </span>
        <section className="mt-4 pl-7">
          <span> &#8226; 기초 프로그래밍</span>
          <ul className="space-y-2 mt-2 mb-2 pl-3">
            <li className="cursor-pointer hover:text-secondaryHover transition">
              - 01분반
            </li>
            <li className="cursor-pointer hover:text-secondaryHover transition"></li>
          </ul>
          <span> &#8226; 심화 프로그래밍</span>
          <ul className="space-y-2 mt-2 mb-2 pl-3">
            <li className="cursor-pointer hover:text-secondaryHover transition">
              - 02분반
            </li>
          </ul>
          <span> &#8226; 자바 프로그래밍</span>
          <ul className="space-y-2 mt-2 pl-3">
            <li className="cursor-pointer hover:text-secondaryHover transition">
              - 02분반
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
