import React from "react";
import TimeTableRow from "./TableRow";

const hourData = Array.from({ length: 11 }, (_, j) => j + 9); // 9~19시
const days = ["월", "화", "수", "목", "금", "토", "일"];

const TimeTable = ({ timeTableData, Edit }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10">
      <h2 className="text-black text-2xl font-bold mb-6">강의시간표</h2>
      <table className="table-fixed border-collapse w-full max-w-5xl text-black">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2 w-1/8">시간</th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-black px-4 py-2 text-center w-1/8"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hourData.map((time) => (
            <tr key={time}>
              <td className="border border-black px-4 py-2 text-center">{`${time}:00-${time + 1}:00`}</td>
              <TimeTableRow timeNum={time} timeTableData={timeTableData} Edit={Edit} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
