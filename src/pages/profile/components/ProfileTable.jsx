import { useEffect, useState, useRef } from "react";
import { fetchTimetable } from "../../timetable/TimeTableGET";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
const TIME_SLOTS = [
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

const CELL_HEIGHT = 65; // 각 셀의 높이를 증가
const HEADER_HEIGHT = 60; // 헤더의 높이를 증가

const ProfileTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const timetableParent = useRef(null);
  const [timetableParentWidth, setTimetableParentWidth] = useState(0);

  useEffect(() => {
    const getTimetableData = async () => {
      try {
        setLoading(true);
        const data = await fetchTimetable();
        if (data) {
          setTimetableData(data);
        }
      } catch (error) {
        console.error("시간표 조회 에러:", error);
        setTimetableData([]);
      } finally {
        setLoading(false);
      }
    };

    getTimetableData();
  }, []);

  useEffect(() => {
    if (timetableParent.current) {
      setTimetableParentWidth(timetableParent.current.offsetWidth);
    }
  }, [timetableParent.current]);

  if (loading) {
    return (
      <div className="relative h-[842px]">
        <div className="absolute top-[11px] left-0 right-0 h-[831px] bg-[#254D64] rounded-[20px]" />
        <div className="relative h-[831px] bg-white border-[3px] border-[#254D64] rounded-[20px] p-4 flex items-center justify-center">
          <div>로딩중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[842px]">
      <div className="absolute top-[11px] left-0 right-0 h-[831px] bg-[#254D64] rounded-[20px]" />
      <div className="relative h-[831px] bg-white border-[3px] border-[#254D64] rounded-[20px] p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black font-bold">내 시간표</h2>
          <div className="flex space-x-2"></div>
        </div>

        <div className="h-[750px]">
          {" "}
          {/* 전체 높이 조정 */}
          <div
            className="border border-gray-300 bg-white w-full h-full flex flex-col"
            ref={timetableParent}
          >
            {/* 요일 헤더 */}
            <div
              className={`flex h-[${HEADER_HEIGHT}px] min-h-[${HEADER_HEIGHT}px]`}
            >
              <div className="flex flex-1 items-center justify-center border-r border-gray-300 text-black font-semibold bg-gray-100">
                {""}
              </div>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex flex-1 items-center justify-center border-r border-gray-300 text-black font-semibold bg-gray-100"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 시간 레이블과 그리드 */}
            <div className="relative flex-1">
              {TIME_SLOTS.map((time) => (
                <div
                  key={time}
                  className="absolute w-full border-b border-gray-300"
                  style={{
                    height: `${CELL_HEIGHT}px`,
                    top: `${TIME_SLOTS.indexOf(time) * CELL_HEIGHT}px`,
                  }}
                >
                  <div
                    className="absolute left-0 h-full flex items-center justify-center text-sm"
                    style={{
                      width: timetableParentWidth / 8,
                      borderRight: "1px solid #ccc",
                      backgroundColor: "#f3f3f3",
                    }}
                  >
                    {time}
                  </div>
                </div>
              ))}

              {/* 과목 데이터 */}
              {timetableData.map((subject, index) => {
                const startHour = Math.floor(subject.startTime / 60);
                const startIndex = startHour - 9; // 9시가 시작 시간
                const startTop = startIndex * CELL_HEIGHT;
                const duration = (subject.endTime - subject.startTime) / 60;
                const height = duration * CELL_HEIGHT;
                const dayIndex = DAYS.indexOf(subject.day);

                if (dayIndex === -1) return null;

                return (
                  <div
                    key={index}
                    className={`absolute text-black text-sm flex justify-center items-center ${subject.color}`}
                    style={{
                      top: `${startTop}px`,
                      left: `${(timetableParentWidth / 8) * (dayIndex + 1)}px`,
                      height: `${height}px`,
                      width: `${timetableParentWidth / 8}px`,
                    }}
                  >
                    {subject.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
