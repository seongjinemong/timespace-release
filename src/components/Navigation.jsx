import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full bg-[#DFE4E6]">
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <Link
          to="/profile"
          className="font-['Inter'] text-2xl font-bold text-black cursor-pointer"
        >
          시공간
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/edit"
            className="text-sm text-black font-medium hover:opacity-80"
          >
            내 시간표 수정
          </Link>
          <Link
            to="/profile"
            className="text-sm text-black font-medium hover:opacity-80"
          >
            마이페이지
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-black font-bold">이름</span>
          <Link
            to="/login"
            className="text-sm text-black font-medium hover:opacity-80"
          >
            로그인
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;