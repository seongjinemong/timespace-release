// import { jwtDecode } from "jwt-decode";
// import { useAuthStore } from "../lib/store";
// import { useEffect, useState } from "react";
// import customAaxios from "../lib/axios";
// import Divider from "../components/Divider";
// export default function Profile() {
//   const credentials = useAuthStore((state) => state.credentials);
//   var info;
//   if (credentials) info = jwtDecode(credentials.credential);
//   const [profile, setProfile] = useState(null);
//   const [summary, setSummary] = useState("");
//   useEffect(() => {
//     async function fetchProfile() {
//       if (credentials) {
//         const res = await customAaxios.get("/user/profile", {
//           withCredentials: true,
//         });
//         setProfile(res.data);
//         setSummary(res.data.summary);
//       }
//     }
//     fetchProfile();
//   }, [credentials]);
//   async function updateSummary() {
//     try {
//       const res = await customAaxios.post("/user/summary", { summary });
//       setProfile(res.data);
//     } catch (error) {
//       console.error("Failed to update summary:", error);
//     }
//   }
//   return (
//     <>
//       <div className="w-full flex flex-col items-center gap-4">
//         <div
//           onClick={() => (window.location.href = "/")}
//         >{`< back to main`}</div>
//         <div>Profile Page</div>
//         {info ? (
//           <>
//             <img className="w-40 h-40" src={info.picture} alt="Profile" />
//             <div className="text-xl font-bold">{`${info.name}`}</div>
//             <div>{`${info.email}`}</div>
//           </>
//         ) : (
//           <div>Not Logged In</div>
//         )}
//         {profile ? <div>{`${JSON.stringify(profile)}`}</div> : <></>}
//         <Divider />
//         <div className="flex flex-col gap-2">
//           <div>Update Summary</div>
//           <input
//             className="p-3 rounded-lg"
//             placeholder="Summary"
//             value={summary}
//             type="text"
//             onChange={(e) => setSummary(e.target.value)}
//           />
//           <button onClick={updateSummary}>Update</button>
//         </div>
//       </div>
//     </>
//   );
//}

import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Mypage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [groupCount, setGroupCount] = useState(0); // 기본값
  const [createdAt, setCreatedAt] = useState("2024-10-03"); // 기본값
  const [name, setName] = useState(""); // 기본값

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    let info = null;
    const credentials = localStorage.getItem("Credential");

    console.log(credentials);
    if (credentials) info = jwtDecode(credentials);

    console.log(info);
    setName(info.name);

    try {
      // API 요청 보내기
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/profile`, // 환경 변수 기반 URL
        {
          withCredentials: true, // 쿠키를 함께 전송
        }
      );

      // 성공적으로 응답 받았을 경우
      if (response.status === 200) {
        console.log("Profile Response:", response.data);
        setUserInfo(response.data); // 사용자 정보 저장
        //if (response.data.groupCount) setGroupCount(response.data.groupCount); // 그룹 수
        if (response.data.createdAt) {
          const [date, time] = response.data.createdAt.split("T"); // "T"를 기준으로 문자열 나눔
          console.log(date); // "2024-11-13"
          console.log(time); // "13:01:25.426Z"
          setCreatedAt(date);
        } // 가입 날짜
      }
      const response2 = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/group`, // 환경 변수 기반 URL
        {
          withCredentials: true, // 쿠키를 함께 전송
        }
      );

      if (response.status === 200) {
        console.log("Group Response:", response2.data);
        setGroupCount(response2.data.length); // 사용자 정보 저장
        //if (response.data.groupCount) setGroupCount(response.data.groupCount); // 그룹 수
      }
    } catch (error) {
      console.error("Profile error:", error);
      // 인증 실패 시 로그인 페이지로 이동
      if (error.response?.status === 401) {
        navigate("/"); // 로그인 페이지로 리다이렉트
      }
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Navigation />
      <div className="flex flex-col items-center gap-8 p-6 text-seagull-950">
        {/* 내 신상정보 */}
        <div className="p-8 rounded-lg bg-white w-full max-w-2xl border-2 border-seagull-900 shadow-[0_8px_0_theme(colors.seagull.900)] min-h-[200px]">
          <div className="text-2xl font-bold mb-6 text-seagull-900">
            내 신상정보
          </div>
          {userInfo ? (
            <>
              <div className="mb-4 text-lg text-seagull-900">
                <strong>이름:</strong> {name || "이름 없음"}
              </div>
              <div className="text-lg text-seagull-900">
                <strong>이메일:</strong> {userInfo.email || "이메일 없음"}
              </div>
            </>
          ) : (
            <div className="text-seagull-900">Not Logged In</div>
          )}
        </div>

        {/* 통계 */}
        <div className="p-8 rounded-lg bg-white w-full max-w-2xl border-2 border-seagull-900 shadow-[0_8px_0_theme(colors.seagull.900)] min-h-[250px]">
          <div className="text-2xl font-bold mb-6 text-seagull-900">통계</div>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 text-center rounded-lg bg-white border-2 border-seagull-900 shadow-[0_4px_0_theme(colors.seagull.900)] min-h-[150px]">
              <div className="text-lg text-seagull-900 mb-4">
                내가 속한 그룹 수
              </div>
              <div className="text-4xl font-bold text-seagull-900">
                {groupCount ? groupCount : "Loading"}
              </div>
            </div>
            <div className="p-6 text-center rounded-lg bg-white border-2 border-seagull-900 shadow-[0_4px_0_theme(colors.seagull.900)] min-h-[150px]">
              <div className="text-lg text-seagull-900 mb-4">
                회원가입한 날짜
              </div>
              <div className="text-4xl font-bold text-seagull-900">
                {createdAt ? createdAt : "Loading"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
