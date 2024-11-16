import React from "react";
import TimeTableRow from "./TableRow";

const hourData = Array.from({ length: 11 }, (_, j) => j + 9); // 9~19시
const days = ["월", "화", "수", "목", "금", "토", "일"];

const TimeTable = ({ timeTableData, Edit }) => {
  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>강의시간표</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>시간</th>
            {days.map((day) => (
              <th
                key={day}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hourData.map((time) => (
            <tr key={time}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >{`${time}:00-${time + 1}:00`}</td>
              <TimeTableRow timeNum={time} timeTableData={timeTableData} Edit={Edit} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
