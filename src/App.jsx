

// // // Imports
// // // 리엑트
// // import { useState } from "react";
// // // 구글 로그인을 위한 컴포넌트
// // import GoogleAuth from "./components/GoogleAuth";
// // // 구글 로그아웃
// // import { googleLogout } from "@react-oauth/google";
// // // zustand에서 로그인 정보 저장소(store)
// // import { useAuthStore } from "./lib/store";
// // // api 서버와 통신을 위한 라이브러리 (baseUrl 설정을 위해 custom을 사용 src/lib/axios.js 확인)
// // import customAaxios from "./lib/axios";
// // // 화면에 필요한 요소
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// // import "./App.css";
// // // 토스트 알림 띄우기 위해 쓰는 라이브러리
// // import { toast } from "react-toastify";

// // // App 컴포넌트
// // function App() {
// //   // zustand 로그인 정보 저장소에 저장된 정보를 가져옴
// //   const credentials = useAuthStore((state) => state.credentials);
// //   // 로그아웃 구현을 위해 로그인 정보 저장소에서 정보를 지우는 함수를 가져옴
// //   const clearCredentials = useAuthStore((state) => state.clearCredentials);

// //   // api 서버와 로그인 정보 확인 절차가 진행중인지 저장하는 state
// //   const [verifying, setVerifying] = useState(false);

// //   const handleVerifyUser = async () => {
// //     // verify state true로 변경 -> 버튼 비활성화
// //     setVerifying(true);

// //     // 만약 로그인 정보가 있다면
// //     if (credentials) {
// //       // 로그인 정보 확인 도중 에러 발생할 수 있으므로 try catch 사용
// //       try {
// //         // 서버에서 로그인 정보 확인
// //         const res = await customAaxios.post("/user/login", credentials);
// //         // 확인 여부 콘솔에 표시

// //         // 인증된 사용자라면
// //         if (res.data) {
// //           // 인증 확인 알림
// //           toast.success("Verified");
// //         } else {
// //           // 아니라면 에러 표시
// //           toast.error("Not Verified");
// //         }
// //       } catch (e) {
// //         // try catch에서 에러가 발생할 수 있는 부분은 Network Error
// //         // 에러 내용 출력
// //         console.log(e);
// //         // 에러 발생 알림
// //         toast.error(e.message);
// //       }
// //     } else {
// //       // 로그인 정보 없다면
// //       // 로그인 되지 않았다고 알림
// //       toast.error("Not Logged In");
// //     }

// //     // verify state true로 변경 -> 버튼 활성화
// //     setVerifying(false);
// //   };

// //   const handleGetSessionData = async () => {
// //     // verify state true로 변경 -> 버튼 비활성화
// //     setVerifying(true);

// //     // 만약 로그인 정보가 있다면
// //     if (credentials) {
// //       // 로그인 정보 확인 도중 에러 발생할 수 있으므로 try catch 사용
// //       try {
// //         // 서버에서 로그인 정보 확인
// //         const res = await customAaxios.get("/user/profile");
// //         // 확인 여부 콘솔에 표시
// //         console.log("Session Data", res);

// //         toast.success(JSON.stringify(res.data));
// //       } catch (e) {
// //         // try catch에서 에러가 발생할 수 있는 부분은 Network Error
// //         // 에러 내용 출력
// //         console.log(e);
// //         // 에러 발생 알림
// //         toast.error(e.message);
// //       }
// //     } else {
// //       // 로그인 정보 없다면
// //       // 로그인 되지 않았다고 알림
// //       toast.error("Not Logged In");
// //     }

// //     // verify state true로 변경 -> 버튼 활성화
// //     setVerifying(false);
// //   };

// //   const handleLogout = async () => {
// //     // verify state true로 변경 -> 버튼 비활성화
// //     setVerifying(true);
// //     // 위에서 가져온 정보 삭제 함수
// //     clearCredentials();
// //     // 구글 로그아웃
// //     googleLogout();

// //     try {
// //       // 서버에서 로그아웃
// //       const res = await customAaxios.get("/user/logout");

// //       toast.success(JSON.stringify(res.data));
// //     } catch (e) {
// //       // try catch에서 에러가 발생할 수 있는 부분은 Network Error
// //       // 에러 내용 출력
// //       console.log(e);
// //       // 에러 발생 알림
// //       toast.error(e.message);
// //     }
// //     // verify state true로 변경 -> 버튼 활성화
// //     setVerifying(false);
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center h-screen">
// //       {/* 예제 코드 */}

// //       {/* 구글 로그인 예제 */}
// //       <div className="flex flex-row w-full justify-center">
// //         <a href="https://vitejs.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1 className="font-bold">구글 로그인 예제</h1>
// //       <div className="card">
// //         <p>
// //           <code>src/App.jsx</code> 와 <code>src/components/GoogleAuth.jsx</code>{" "}
// //           를 참고하세요
// //         </p>
// //       </div>

// //       {/* 작성한 코드 */}
// //       <div className="flex flex-col gap-4 mt-4 items-center">
// //         {/* 구글 로그인 버튼 + 기능 */}
// //         <GoogleAuth />

// //         {/* 로그인 정보가 있다면 clientId를 출력하고, 없다면 로그인되어있지 않다고 출력 */}
// //         <div>{credentials ? `${credentials.clientId}` : "Not Logged In"}</div>

// //         <button
// //           onClick={() => {
// //             window.location.href = "/profile";
// //           }}
// //         >
// //           Profile Page
// //         </button>

// //         {/* 로그아웃 구현 버튼 */}
// //         <button
// //           onClick={handleLogout}
// //           // 위에서 만든 verifying state에 따라 버튼 활성화 여부 결정
// //           disabled={verifying}
// //         >
// //           Clear User
// //         </button>

// //         {/* api 서버에서 로그인 정보를 verify 하기 위한 버튼 */}
// //         <button
// //           onClick={handleVerifyUser}
// //           // 위에서 만든 verifying state에 따라 버튼 활성화 여부 결정
// //           disabled={verifying}
// //         >
// //           Verify User
// //         </button>

// //         <button
// //           onClick={handleGetSessionData}
// //           // 위에서 만든 verifying state에 따라 버튼 활성화 여부 결정
// //           disabled={verifying}
// //         >
// //           Get Session Data
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import { useState } from "react";
// import GoogleAuth from "./components/GoogleAuth";
// import { useAuthStore } from "./lib/store";
// import { useNavigate } from "react-router-dom";
// import "./App.css";
// import { toast } from "react-toastify";
// import TimespaceButton from "../src/components/Button/TimespaceButton"

// function App() {
//   const credentials = useAuthStore((state) => state.credentials);
//   const navigate = useNavigate();

//   const handleLoginSuccess = () => {
//     toast.success("Login successful!");
//     navigate("/timetable");
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen gap-8 p-6">
//       <h1 className="font-bold text-3xl title">언제볼까?</h1>
//       <div className="w-full max-w-sm flex flex-col items-center gap-4 login-section">
//         {/* <TimespaceButton text="Sign in with Google" onClick={handleLoginSuccess} /> */}
//         <GoogleAuth/>
//       </div>
//       <div className="w-full max-w-lg flex justify-center description">
//         <p>
//           언제 볼까?는 친구 및 그룹과의 일정을 실시간으로 비교하여, 겹치는 시간을 한눈에 확인하고 약속을 쉽게 조율할 수 있는 서비스입니다. 개인 일정 관리뿐 아니라, 친구 추가 및 그룹 생성 기능을 통해 빠르고 효율적인 일정 조율을 지원하여 사용자들의 시간을 아껴줍니다.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useNavigate } from "react-router-dom";
import GoogleAuth from "./components/GoogleAuth";
import "./App.css";
import { toast } from "react-toastify";
import Logo from "../src/assets/Logo.png";

function App() {
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
          언제 볼까?는 친구 및 그룹과의 일정을 실시간으로 비교하여, 겹치는 시간을 한눈에 확인하고 약속을 쉽게 조율할 수 있는 서비스입니다. 개인 일정 관리뿐 아니라, 친구 추가 및 그룹 생성 기능을 통해 빠르고 효율적인 일정 조율을 지원하여 사용자들의 시간을 아껴줍니다.
        </p>
      </div>
    </div>
  );
}

export default App;
