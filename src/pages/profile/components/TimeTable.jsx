const TimeTable = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const times = [
    "9 AM",
    "10 AM",
    "11 AM",
    "Noon",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];

  const schedules = {
    "월-10:00": {
      title: "응용통계학",
      time: "10:00 - 11:30",
      color: "bg-[#FDD3D0]",
      duration: 1.5, // 90분 수업
    },
    "수-10:00": {
      title: "선형계획법",
      time: "10:00 - 11:30",
      color: "bg-[#FF9500]",
      duration: 1.5,
    },
    "목-10:00": {
      title: "투자과학",
      time: "10:00 - 11:30",
      color: "bg-[#00C7BE]",
      duration: 1.5,
    },
    "월-13:00": {
      title: "데이터구조론",
      time: "13:00 - 14:30",
      color: "bg-[#A5A6F6]",
      duration: 1.5,
    },
    "화-13:00": {
      title: "데이터구조론",
      time: "13:00 - 14:30",
      color: "bg-[#A5A6F6]",
      duration: 1.5,
    },
    "수-13:00": {
      title: "응용통계학",
      time: "13:00 - 14:30",
      color: "bg-[#FDD3D0]",
      duration: 1.5,
    },
    "목-13:00": {
      title: "선형계획법",
      time: "13:00 - 14:30",
      color: "bg-[#FF9500]",
      duration: 1.5,
    },
    "월-15:00": {
      title: "운영체제",
      time: "15:00 - 16:30",
      color: "bg-[#A5A6F6]",
      duration: 1.5,
    },
    "수-16:00": {
      title: "컴퓨터구조",
      time: "16:00 - 17:30",
      color: "bg-[#FDD3D0]",
      duration: 1.5,
    },
  };

  // 시간 변환 함수
  const getTimeKey = (time) => {
    const timeMap = {
      "9 AM": "09:00",
      "10 AM": "10:00",
      "11 AM": "11:00",
      Noon: "12:00",
      "1 PM": "13:00",
      "2 PM": "14:00",
      "3 PM": "15:00",
      "4 PM": "16:00",
      "5 PM": "17:00",
      "6 PM": "18:00",
    };
    return timeMap[time];
  };

  return (
    <div className="relative h-[842px]">
      {/* Background border */}
      <div className="absolute top-[11px] left-0 right-0 h-[831px] bg-[#254D64] rounded-[20px]" />

      {/* Main content */}
      <div className="relative h-[831px] bg-white border-[3px] border-[#254D64] rounded-[20px] p-4">
        <h2 className="text-xl font-bold text-black mb-4">내 시간표</h2>

        <div className="w-full">
          {/* Days Header */}
          <div className="grid grid-cols-8">
            <div className="w-16" />
            {days.map((day) => (
              <div
                key={day}
                className="h-6 text-center font-bold text-sm text-black"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="relative">
            {times.map((time) => (
              <div
                key={time}
                className="grid grid-cols-8 border-t border-black/30"
              >
                <div className="w-16 h-16 py-2 text-right pr-2 font-normal text-sm text-black">
                  {time}
                </div>
                {days.map((day) => {
                  const timeKey = getTimeKey(time);
                  const scheduleKey = `${day}-${timeKey}`;
                  const schedule = schedules[scheduleKey];

                  return (
                    <div
                      key={`${day}-${time}`}
                      className="h-16 border-l border-black/30 relative"
                    >
                      {schedule && (
                        <div
                          className={`absolute top-0 left-0 right-0 m-0.5 p-1.5 ${schedule.color} border-[3px] border-[#254D64] rounded-[5px]`}
                          style={{
                            height: `${schedule.duration * 64 - 4}px`,
                          }}
                        >
                          <div className="text-[10px] font-bold text-black">
                            {schedule.title}
                          </div>
                          <div className="text-[10px] text-black">
                            {schedule.time}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;