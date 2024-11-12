import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth";
import "../../App.css";
import { toast } from "react-toastify";
import Logo from "../../assets/Logo.png";

export default function Landing() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    toast.success("Login successful!");
    navigate("/timetable"); // timetable 페이지로 이동
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 p-6">
      <img src={Logo} alt="Logo" className="h-20 w-20" />
      <h5 className="font-bold text-3xl title">언제볼까?</h5>
      <div className="w-full max-w-sm flex flex-col items-center gap-4 login-section">
        {/* GoogleAuth에 handleLoginSuccess 전달 */}
        <GoogleAuth onLoginSuccess={handleLoginSuccess} />
      </div>
      <div className="w-full max-w-lg flex justify-center description">
        <p>
          언제 볼까?는 친구 및 그룹과의 일정을 실시간으로 비교하여, 겹치는
          시간을 한눈에 확인하고 약속을 쉽게 조율할 수 있는 서비스입니다. 개인
          일정 관리뿐 아니라, 친구 추가 및 그룹 생성 기능을 통해 빠르고 효율적인
          일정 조율을 지원하여 사용자들의 시간을 아껴줍니다.
        </p>
      </div>
    </div>
  );
}
