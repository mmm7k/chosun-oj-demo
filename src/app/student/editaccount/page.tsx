export default function EditAccount() {
  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
        회원 정보수정
      </h2>

      <form className="space-y-5">
        <div>
          <label className=" text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md shadow-sm placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
            placeholder="새로운 ID를 입력하세요"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700">비밀번호</label>
          <input
            type="password"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md shadow-sm placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
            placeholder="새로운 비밀번호를 입력하세요"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700">닉네임</label>
          <input
            type="text"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md shadow-sm placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
            placeholder="새로운 닉네임을 입력하세요"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md shadow-sm placeholder:text-sm text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
            placeholder="새로운 Email을 입력하세요"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
