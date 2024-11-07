// import { useState, useEffect } from "react";
// import customAaxios from "../lib/axios";
// import Divider from "../components/Divider";
// import { toast } from "react-toastify";

// export default function Timetable() {
//   const [timetable, setTimetable] = useState({ data: {} });
//   const [timetable_input, setTimetableInput] = useState("");
//   const [user_id, setUserId] = useState("");
//   const [user_timetable, setUserTimetable] = useState({ data: {} });

//   useEffect(() => {
//     async function fetchTimetable() {
//       try {
//         const res = await customAaxios.get("/timetable");
//         setTimetable(res.data);
//         setTimetableInput(JSON.stringify(res.data.data));
//       } catch (error) {
//         console.error("Failed to fetch timetable:", error);
//         toast.error(error.response.data);
//       }
//     }
//     fetchTimetable();
//   }, []);

//   async function updateTimetable() {
//     try {
//       const res = await customAaxios.post("/timetable", {
//         timetable: JSON.parse(timetable_input),
//       });
//       setTimetable(res.data);
//     } catch (error) {
//       console.error("Failed to update timetable:", error);
//       toast.error(error.response.data);
//     }
//   }

//   async function getTimetablebyUserId(user_id) {
//     try {
//       const res = await customAaxios.get(`/timetable/${user_id}`);
//       setUserTimetable(res.data);
//     } catch (error) {
//       console.error("Failed to get timetable:", error);
//       toast.error(error.response.data);
//     }
//   }

//   return (
//     <div className="flex flex-col justify-center gap-4">
//       <div className="font-bold text-xl">Timetable API</div>

//       <div className="flex flex-col">
//         <div>My Timetable</div>
//         <div>{JSON.stringify(timetable)}</div>
//       </div>

//       <Divider />

//       <div className="flex flex-col">
//         <div>Update Timetable</div>
//         <input
//           className="p-3 rounded-lg"
//           placeholder="Timetable"
//           value={timetable_input}
//           type="text"
//           onChange={(e) => setTimetableInput(e.target.value)}
//         />
//         <button onClick={updateTimetable}>Update</button>
//       </div>

//       <Divider />

//       <div className="flex flex-col">
//         <div>Get Timetable of UserId</div>
//         <input
//           className="p-3 rounded-lg"
//           placeholder="UserId"
//           value={user_id}
//           type="text"
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <button onClick={() => getTimetablebyUserId(user_id)}>Get</button>
//         <div>{JSON.stringify(user_timetable)}</div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import StyledBox from "../components/StyledBox";

export default function Timetable() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      {/* 마이페이지로 이동하는 버튼 */}
      <button
        onClick={() => navigate("/mypage")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        마이페이지
      </button>

      {/* StyledBox 컴포넌트 표시 */}
      <StyledBox className="p-4 shadow-md rounded-lg bg-white w-full max-w-md">
        <div className="text-lg font-bold mb-2">여기에 시간표를 넣어주세여~~~~~~~~~~~~~~~~~~~~~~</div></StyledBox>
    </div>
  );
}
