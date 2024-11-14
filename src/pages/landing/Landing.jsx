// import { useNavigate } from "react-router-dom";
// import GoogleAuth from "../../components/GoogleAuth";
// import axios from "axios";
// import "../../App.css";
// import { toast } from "react-toastify";
// import Logo from "../../assets/Logo.png";

// export default function Landing() {
//   const navigate = useNavigate();

//   const handleLoginSuccess = async (credentialResponse) => {
//     const res = await axios.post(
//       "https://timetableapi.seongjinemong.app/user/login",
//       credentialResponse,
//       {
//         withCredentials: true,
//       }
//     );

//     if (res.status === 200) {
//       toast.success("Login successful!");
//       navigate("/timetable"); // timetable 페이지로 이동
//     } else {
//       toast.error("Login failed!");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen gap-8 p-6">
//       <img src={Logo} alt="Logo" className="h-20 w-20" />
//       <h5 className="font-bold text-3xl title">언제볼까?</h5>
//       <div className="w-full max-w-sm flex flex-col items-center gap-4 login-section">
//         {/* GoogleAuth에 handleLoginSuccess 전달 */}
//         <GoogleAuth onLoginSuccess={handleLoginSuccess} />
//       </div>
//       <div className="w-full max-w-lg flex justify-center description">
//         <p>
//           언제 볼까?는 친구 및 그룹과의 일정을 실시간으로 비교하여, 겹치는
//           시간을 한눈에 확인하고 약속을 쉽게 조율할 수 있는 서비스입니다. 개인
//           일정 관리뿐 아니라, 친구 추가 및 그룹 생성 기능을 통해 빠르고 효율적인
//           일정 조율을 지원하여 사용자들의 시간을 아껴줍니다.
//         </p>
//       </div>
//     </div>
//   );
// }

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
      navigate("/timetable"); // timetable 페이지로 이동
    } else {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3FAFC] flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-16">
        <img src={Logo} alt="Logo" className="h-64 w-64" />
        <h5 className="font-bold text-6xl mb-4 tracking-tight">
          <span className="text-[#254D64]">언제</span>
          <span className="text-[#5B8BA0]">볼까</span>
          <span className="text-[#254D64]">?</span>
        </h5>

        {/* Placeholder for GoogleAuth Component */}
        <div className="w-full max-w-sm flex flex-col items-center gap-4 login-section">
          <GoogleAuth onLoginSuccess={handleLoginSuccess} />
        </div>

        {/* Description Box */}
        <div className="w-full bg-white p-12 rounded-3xl shadow-lg border-2 border-[#E1E8EC]">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-[#254D64] text-center">
              시간 조율, 이제는 쉽게
            </h2>
            <p className="text-[#4A6572] font-semibold text-center text-xl leading-relaxed">
              복잡한 단체 일정 조율이 힘드신가요?
              <br />
              <span className="text-[#254D64] font-bold">언제볼까?</span>와
              함께라면 간단합니다.
              <br />
              실시간으로 그룹원들의 일정을 한눈에 비교하고,
              <br />
              모두가 가능한 시간을 빠르게 찾아보세요.
            </p>
            <div className="flex justify-center gap-16 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#254D64]">1분</div>
                <div className="text-lg font-semibold text-[#4A6572] mt-2">
                  간편한 일정 등록
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#254D64]">실시간</div>
                <div className="text-lg font-semibold text-[#4A6572] mt-2">
                  일정 비교
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#254D64]">100%</div>
                <div className="text-lg font-semibold text-[#4A6572] mt-2">
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
