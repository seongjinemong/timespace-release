import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Navigation from "../../components/Navigation";
import { TbTrash } from "react-icons/tb"; // 쓰레기통 아이콘

import DirectAddModal from "./TimeTableComponents/DirectAddModal"; // 직접 추가 모달
import ShadowBox from "../../components/ShadowBox"; // 테두리
import useTimetableEdit from "./TimeTableFunction/useTimetableEdit"; // 삭제 모드 by 쓰레기통 아이콘

const days = ["월", "화", "수", "목", "금", "토", "일"];
const timeLabels = [
  "09:00 ~ 10:00",
  "10:00 ~ 11:00",
  "11:00 ~ 12:00",
  "12:00 ~ 13:00",
  "13:00 ~ 14:00",
  "14:00 ~ 15:00",
  "15:00 ~ 16:00",
  "16:00 ~ 17:00",
  "17:00 ~ 18:00",
  "18:00 ~ 19:00",
];

const Timetable = () => {
  // 삭제 모드
  const { isEditMode, toggleEditMode, message } = useTimetableEdit();

  const [isDirectAddModalOpen, setDirectAddModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  // // 서버에 시간표 데이터 GET 요청
  // const fetchTimetable = async () => {
  //   try {
  //     const res = await axios.get(
  //       import.meta.env.VITE_SERVER_URL + "/timetable", 
  //       { timetable: subjects },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.status === 200 && Array.isArray(res.data)) {
  //       setSubjects(res.data);
  //       toast.success("GET timetable successful!");
  //     } else {
  //       toast.error("GET failed!");
  //     }
  //   } catch (e) {
  //     toast.error(e.message);
  //   }
  // };

  // // 컴포넌트 렌더링 시 GET
  // useEffect(() => {
  //   fetchTimetable();
  // }, []); // 빈 배열로 설정 -> 한 번만 실행


  const openDirectAddModal = () => setDirectAddModalOpen(true);
  const closeDirectAddModal = () => setDirectAddModalOpen(false);

  const addSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };

  // 쓰레기통 icon 클릭 -> 과목 삭제 filter로 거르기
  const deleteSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // "저장" 버튼 핸들러
  const saveTimetable = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/timetable",
        { timetable: subjects },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("POST timetable successful!");
      } else {
        toast.error("POST failed!");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 transform -translate-y-4">
      <div className="w-4/5 transform -translate-y-4">
        <Navigation />
      </div>

      {/* 삭제 모드 메시지 */}
      {message && (
        <div
          className="animate-fadeOut fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-center text-lg px-4 py-2 rounded shadow-lg z-50"
          style={{ transition: "opacity 0.5s ease-in-out" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      <ShadowBox width="w-3/4 max-w-4xl" padding="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-l text-black font-bold">내 시간표</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleEditMode}
              className="text-gray-500 hover:text-red-700"
            >
              <TbTrash size={20} />
            </button>

            <ShadowBox width="w-auto" padding="p-0">
              <button
                className="px-4 py-1 bg-white text-black font-semibold rounded-lg active:translate-y-1 active:shadow-none"
                onClick={saveTimetable} // "저장" 버튼 -> POST
              >
                저장
              </button>
            </ShadowBox>
          </div>
        </div>

        {/* 시간표 영역 */}
        <div
          className="relative border border-gray-300 bg-white"
          style={{ width: "700px", height: "500px" }}
        >
          {/* 요일 */}
          <div className="absolute top-0 left-[100px] flex">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center border-r border-gray-300 text-black font-semibold bg-gray-100"
                style={{ width: "100px", height: "40px" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 시간표 셀 */}
          <div
            className="absolute top-[40px] left-[100px] grid"
            style={{
              gridTemplateColumns: `repeat(${days.length}, 100px)`,
              gridTemplateRows: `repeat(${timeLabels.length}, 46px)`,
            }}
          >
            {Array.from({ length: days.length * timeLabels.length }).map(
              (_, index) => (
                <div
                  key={index}
                  className="border-b border-r border-gray-300"
                  style={{ height: "46px" }}
                ></div>
              )
            )}
          </div>

          {/* 가로선과 시간 레이블 */}
          <div className="absolute top-[40px] left-0">
            {timeLabels.map((time) => (
              <div
                key={time}
                className="relative flex items-center border-b border-gray-300 text-black bg-gray-200"
                style={{ height: "46px", fontSize: "12px" }} // 폰트 크기 조정 및 배경색 설정
              >
                <div
                  className="absolute left-0 w-[100px] h-full flex items-center justify-center"
                  style={{
                    borderRight: "1px solid #ccc",
                    backgroundColor: "#f3f3f3", // 추가로 회색 강조
                  }}
                >
                  {time}
                </div>
              </div>
            ))}
          </div>

          {/* 과목 데이터 */}
          {subjects.map((subject, index) => {
            const startTop = ((subject.startTime - 540) * 46) / 60; // 09:00 = 540분 기준
            const height = ((subject.endTime - subject.startTime) * 46) / 60;
            const dayIndex = days.indexOf(subject.day);

            if (dayIndex === -1) return null;

            return (
              <div
                key={index}
                className={`absolute text-black text-sm rounded-lg flex justify-center items-center ${subject.color}`} // 색상 적용
                style={{
                  top: `${startTop + 40}px`, // 상단 요일 헤더 높이 보정
                  left: `${100 * dayIndex + 100}px`,
                  height: `${height}px`,
                  width: "100px",
                }}
                onClick={() => isEditMode && deleteSubject(index)}
              >
                {subject.name}
              </div>
            );
          })}
        </div>
      </ShadowBox>

      {/* 하단 버튼 */}
      <ShadowBox width="w-auto" padding="p-3">
        <div className="flex justify-center space-x-10 transform -translate-y-1">
          <ShadowBox width="w-auto" padding="p-0">
            <button
              onClick={openDirectAddModal}
              className="px-4 py-2 bg-white text-black font-semibold rounded-lg active:translate-y-1 active:shadow-none"
            >
              추가하기
            </button>
          </ShadowBox>
        </div>
      </ShadowBox>

      {/* 모달 컴포넌트 */}
      <DirectAddModal
        isOpen={isDirectAddModalOpen}
        onClose={closeDirectAddModal}
        onAddSubject={addSubject}
      />
    </div>
  );
};

export default Timetable;
