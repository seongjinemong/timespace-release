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
// }
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../lib/store";
import { useEffect, useState } from "react";
import customAaxios from "../lib/axios";
import StyledBox from "../components/StyledBox";
export default function Mypage() {
  const credentials = useAuthStore((state) => state.credentials);
  let info;
  if (credentials) info = jwtDecode(credentials.credential);
  const [profile, setProfile] = useState(null);
  const [groupCount, setGroupCount] = useState(13); // 예시 데이터
  const [joinedDate, setJoinedDate] = useState("2024-10-03"); // 예시 데이터
  useEffect(() => {
    async function fetchProfile() {
      if (credentials) {
        const res = await customAaxios.get("/user/profile", {
          withCredentials: true,
        });
        setProfile(res.data);
      }
    }
    fetchProfile();
  }, [credentials]);
  return (
    <div className="flex flex-col items-center gap-8 p-6">
      {/* 내 신상정보 */}
      <StyledBox className="p-4 shadow-md rounded-lg bg-white w-full max-w-md">
        <div className="text-lg font-bold mb-2">내 신상정보</div>
        {info ? (
          <>
            <div className="mb-1">
              <strong>이름:</strong> {info.name}
            </div>
            <div>
              <strong>이메일:</strong> {info.email}
            </div>
          </>
        ) : (
          <div>Not Logged In</div>
        )}
      </StyledBox>
      {/* 통계 */}
      <StyledBox className="p-4 shadow-md rounded-lg bg-white w-full max-w-md">
        <div className="text-lg font-bold mb-2">통계</div>
        <div className="grid grid-cols-2 gap-4">
          <StyledBox className="p-4 text-center shadow-sm rounded-lg border">
            <div className="text-sm">내가 속한 그룹 수</div>
            <div className="text-2xl font-bold">{groupCount}</div>
          </StyledBox>
          <StyledBox className="p-4 text-center shadow-sm rounded-lg border">
            <div className="text-sm">회원가입한 날짜</div>
            <div className="text-2xl font-bold">{joinedDate}</div>
          </StyledBox>
        </div>
      </StyledBox>
    </div>
  );
}