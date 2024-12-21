import { useEffect, useState } from "react";
import { fetchTimetable } from "../../timetable/TimeTableGET";

// 상수 데이터
const DAYS = [
  { id: "mon", label: "월" },
  { id: "tue", label: "화" },
  { id: "wed", label: "수" },
  { id: "thu", label: "목" },
  { id: "fri", label: "금" },
  { id: "sat", label: "토" },
  { id: "sun", label: "일" },
];

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => {
  const hour = i + 9;
  return `${hour}:00 ~ ${hour + 1}:00`;
});

const ProfileTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 시간표 데이터를 시간과 요일에 맞게 찾는 함수
  const findSubject = (day, timeSlot) => {
    const [startHourStr] = timeSlot.split(":");
    const startHour = parseInt(startHourStr);

    // 점심시간(12:00-13:00)은 항상 비워둡니다
    if (startHour === 12) {
      return null;
    }

    const startTime = startHour * 60; // 시작 시간을 분으로 변환

    const subject = timetableData.find(
      (subject) =>
        subject.day === day.label &&
        subject.startTime <= startTime + 60 &&
        subject.endTime > startTime
    );

    return subject;
  };

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

        <div className="overflow-auto h-[730px]">
          <div className="grid grid-cols-[100px_repeat(7,1fr)]">
            <div className="bg-gray-50 border p-2"></div>
            {DAYS.map((day) => (
              <div
                key={day.id}
                className="bg-gray-50 border p-2 text-center font-medium"
              >
                {day.label}
              </div>
            ))}

            {TIME_SLOTS.map((timeSlot) => (
              <>
                <div
                  key={`time-${timeSlot}`}
                  className="bg-gray-50 border p-2 text-sm"
                >
                  {timeSlot}
                </div>
                {DAYS.map((day) => {
                  const subject = findSubject(day, timeSlot);
                  return (
                    <div
                      key={`${day.id}-${timeSlot}`}
                      className={`border p-2 text-center ${
                        subject?.color || ""
                      }`}
                    >
                      {subject?.name || "\u00A0"}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
