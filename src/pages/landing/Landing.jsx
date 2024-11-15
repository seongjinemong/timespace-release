import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth";
import axios from "axios";
import "../../App.css";
import { toast } from "react-toastify";
import Logo from "../../assets/Logo.png";

export default function Landing() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const res = await axios.post(
      "https://timetableapi.seongjinemong.app/user/login",
      credentialResponse,
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success("Login successful!");
      navigate("/timetable");
    } else {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-seagull-50 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-20 px-4 py-20">
        <img src={Logo} alt="Logo" className="h-64 w-64" />
        <h5 className="font-bold text-6xl mb-4 tracking-tight">
          <span className="text-seagull-900">언제</span>
          <span className="text-seagull-600">볼까</span>
          <span className="text-seagull-900">?</span>
        </h5>

        {/* For GoogleAuth Component */}
        <div className="w-full max-w-sm flex flex-col items-center gap-4 login-section">
          <GoogleAuth onLoginSuccess={handleLoginSuccess} />
        </div>

        {/* Description Box */}
        <div className="w-full bg-white p-12 rounded-3xl shadow-lg border-2 border-seagull-100 mb-20">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-seagull-900 text-center">
              시간 조율, 이제는 쉽게
            </h2>
            <p className="text-seagull-800 font-semibold text-center text-xl leading-relaxed">
              복잡한 단체 일정 조율이 힘드신가요?
              <br />
              <span className="text-seagull-900 font-bold">언제볼까?</span>와
              함께라면 간단합니다.
              <br />
              실시간으로 그룹원들의 일정을 한눈에 비교하고,
              <br />
              모두가 가능한 시간을 빠르게 찾아보세요.
            </p>
            <div className="flex justify-center gap-16 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-seagull-900">1분</div>
                <div className="text-lg font-semibold text-seagull-800 mt-2">
                  간편한 일정 등록
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-seagull-900">실시간</div>
                <div className="text-lg font-semibold text-seagull-800 mt-2">
                  일정 비교
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-seagull-900">100%</div>
                <div className="text-lg font-semibold text-seagull-800 mt-2">
                  시간 절약
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}