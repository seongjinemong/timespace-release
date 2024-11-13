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
// import { useAuthStore } from "../lib/store";
import { useEffect, useState } from "react";
// import customAaxios from "../lib/axios";
import Navigation from "../../components/Navigation";
export default function Mypage() {
  //const credentials = useAuthStore((state) => state.credentials);
  const credentials = {
    clientId:
      "638172052069-mn73rt77rrbifi1nerhauor4goti4rqe.apps.googleusercontent.com",

    credential:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkYzBmMTcyZThkNmVmMzgyZDZkM2EyMzFmNmMxOTdkZDY4Y2U1ZWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MzgxNzIwNTIwNjktbW43M3J0NzdycmJpZmkxbmVyaGF1b3I0Z290aTRycWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MzgxNzIwNTIwNjktbW43M3J0NzdycmJpZmkxbmVyaGF1b3I0Z290aTRycWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE5NzY5OTg4NjQyMzg0NTg5MzEiLCJlbWFpbCI6InNqMDExMjAyMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczMTQwNjEyNywibmFtZSI6Iuy0iOy5mCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLX2dGUFQ0WHdyR0dUc1psVHNKbDgwUEJ5aURUTXJFUTlwNTFkLU9qeGN6aC1fWjBxSD1zOTYtYyIsImdpdmVuX25hbWUiOiLstIjsuZgiLCJpYXQiOjE3MzE0MDY0MjcsImV4cCI6MTczMTQxMDAyNywianRpIjoiYzQwMTJjODBiZWM1ZDJhYWRlNzJjYmVjNjk1YTM4MzhhYWFjYmUzNiJ9.FlxhfLdP6R9xcM1H3LmVYAihM9WDKVeTW2czLvyZNLD5nuT_M4WKEwfL8I-CQFhthGJ3MiUyVKOtXN5CUzZcdzSw1fRghhHa0FBt85W_nFcY62lp6ZduBgg_mRXyNDN-wEbgLv1LvxJ5u70boJl1sNe_xg0AzLcchl6AIVu9yVbXL0nC2bOP-flGi1-to_LRKsNN7MrBe4imz2B6uwUv7euz18r4MXgETDmeWPHJnp828egY6u56xhp-qBORLu8JTKx0z3G1cSP1zISAjdjhnDpVQJczPIcmLYXqOKYNz_MItAsShUamtXy_85hG5ToxLe_jFlQ0RnU5XdFkousc5A",

    select_by: "btn",
  };
  let info = true;
  if (credentials) info = jwtDecode(credentials.credential);
  console.log(info);
  const [profile, setProfile] = useState(null);
  const [groupCount, setGroupCount] = useState(13); // 예시 데이터
  const [joinedDate, setJoinedDate] = useState("2024-10-03"); // 예시 데이터
  useEffect(() => {
    async function fetchProfile() {
      if (credentials) {
        // const res = await customAaxios.get("/user/profile", {
        //   withCredentials: true,
        // });
        // setProfile(res.data);
      }
    }
    fetchProfile();
  }, [credentials]);
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center gap-8 p-6 text-black">
        {/* 내 신상정보 */}
        <div
          className="p-8 rounded-lg bg-white w-full max-w-2xl border-2 border-[#2d4856] 
                    shadow-[0_8px_0_#2d4856] min-h-[200px]"
        >
          <div className="text-2xl font-bold mb-6 text-[#2d4856]">
            내 신상정보
          </div>
          {info ? (
            <>
              <div className="mb-4 text-lg text-[#2d4856]">
                <strong>이름:</strong> {info.name}
              </div>
              <div className="text-lg text-[#2d4856]">
                <strong>이메일:</strong> {info.email}
              </div>
            </>
          ) : (
            <div className="text-[#2d4856]">Not Logged In</div>
          )}
        </div>

        {/* 통계 */}
        <div
          className="p-8 rounded-lg bg-white w-full max-w-2xl border-2 border-[#2d4856] 
                    shadow-[0_8px_0_#2d4856] min-h-[250px]"
        >
          <div className="text-2xl font-bold mb-6 text-[#2d4856]">통계</div>
          <div className="grid grid-cols-2 gap-8">
            <div
              className="p-6 text-center rounded-lg bg-white border-2 border-[#2d4856] 
                        shadow-[0_4px_0_#2d4856] min-h-[150px]"
            >
              <div className="text-lg text-[#2d4856] mb-4">
                내가 속한 그룹 수
              </div>
              <div className="text-4xl font-bold text-[#2d4856]">
                {groupCount}
              </div>
            </div>
            <div
              className="p-6 text-center rounded-lg bg-white border-2 border-[#2d4856] 
                        shadow-[0_4px_0_#2d4856] min-h-[150px]"
            >
              <div className="text-lg text-[#2d4856] mb-4">회원가입한 날짜</div>
              <div className="text-4xl font-bold text-[#2d4856]">
                {joinedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
