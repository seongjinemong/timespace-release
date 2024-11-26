import { useEffect, useState } from "react";

const ProfileTable = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTimetableData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/timetable");

      if (!response.ok) {
        setTimetableData({});
        return;
      }

      const data = await response.json();
      setTimetableData(data?.data || {});
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
      setTimetableData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const getCellContent = (time, day) => {
    if (!timetableData) return "\u00A0";
    return timetableData[`${day}-${time}`] || "\u00A0";
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

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-20 border bg-gray-50 text-gray-900 py-2"></th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">월</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">화</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">수</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">목</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">금</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">토</th>
              <th className="w-28 border bg-gray-50 text-gray-900 py-2">일</th>
            </tr>
          </thead>
          <tbody>
            {[
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
            ].map((time) => (
              <tr key={time}>
                <td className="border bg-gray-50 text-sm py-4 px-2">{time}</td>
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
                  (day) => (
                    <td key={`${day}-${time}`} className="border text-center">
                      {getCellContent(time, day)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTable;
