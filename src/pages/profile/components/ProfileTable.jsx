import { useEffect, useState } from "react";
import axios from "axios";

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
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTimetableData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/timetable`,
        { withCredentials: true }
      );
      setTimetableData(response.data?.data || {});
    } catch (error) {
      console.error("시간표 조회 에러:", error);
      setTimetableData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

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

        {/* 시간표 그리드 컨테이너 */}
        <div className="overflow-auto h-[730px]">
          <div className="grid grid-cols-[100px_repeat(7,1fr)]">
            {/* 헤더 행 */}
            <div className="bg-gray-50 border p-2"></div>
            {DAYS.map((day) => (
              <div
                key={day.id}
                className="bg-gray-50 border p-2 text-center font-medium"
              >
                {day.label}
              </div>
            ))}

            {/* 시간대별 행 */}
            {TIME_SLOTS.map((time) => (
              // 각 시간대 행
              <>
                {/* 시간 셀 */}
                <div
                  key={`time-${time}`}
                  className="bg-gray-50 border p-2 text-sm"
                >
                  {time}
                </div>
                {/* 각 요일 셀 */}
                {DAYS.map((day) => (
                  <div
                    key={`${day.id}-${time}`}
                    className="border p-2 text-center"
                  >
                    {timetableData?.[`${day.id}-${time}`] || "\u00A0"}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;
