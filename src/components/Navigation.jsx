import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserInfo } from "../api/userApi";
import { useAuthStore } from "../store/authStore";
import { handleLogout } from "../hooks/useLogout";

const Navigation = () => {
  const { isLoggedIn, userName, setCredentials } = useAuthStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn) {
        const userInfo = await getUserInfo();
        // userInfo가 있을 경우 store 업데이트
        if (userInfo) {
          setCredentials({
            credential: localStorage.getItem("Credential"),
            name: userInfo.name,
          });
        }
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, setCredentials]);

  return (
    <div className="w-full">
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <Link
          to="/profile"
          className="font-['Inter'] text-3xl font-bold text-seagull-950 cursor-pointer"
        >
          시공간
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn && (
            <>
              <Link
                to="/timetable"
                className="text-xl text-seagull-900 font-medium hover:opacity-80"
              >
                내 시간표 수정
              </Link>
              <Link
                to="/mypage"
                className="text-xl text-seagull-900 font-medium hover:opacity-80"
              >
                마이페이지
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-l text-seagull-950 font-bold">
                {userName}
              </span>
              <button
                onClick={handleLogout}
                className="text-l text-seagull-900 font-medium hover:opacity-80"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm text-seagull-900 font-medium hover:opacity-80"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
