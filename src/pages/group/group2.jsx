import React, { useState } from 'react';

// 예시 데이터: 멤버별 시간표
const memberSchedules = {
  A: [
    { day: 'Mon', start: 9, end: 11 },
    { day: 'Tue', start: 12, end: 14 },
    { day: 'Wed', start: 10, end: 11 },
    { day: 'Thu', start: 15, end: 17 },
  ],
  B: [
    { day: 'Mon', start: 10, end: 12 },
    { day: 'Wed', start: 12, end: 13 },
    { day: 'Thu', start: 15, end: 17 },
    { day: 'Fri', start: 9, end: 10 },
  ],
  C: [
    { day: 'Tue', start: 11, end: 13 },
    { day: 'Thu', start: 10, end: 11 },
    { day: 'Thu', start: 15, end: 17 },
    { day: 'Fri', start: 9, end: 10 },
  ],
  D: [
    { day: 'Wed', start: 12, end: 14 },
    { day: 'Fri', start: 10, end: 11 },
    { day: 'Thu', start: 15, end: 17 },
    { day: 'Mon', start: 9, end: 10 },
    { day: 'Sat', start: 15, end: 18 },
  ],
  E: [
    { day: 'Mon', start: 9, end: 10 },
    { day: 'Wed', start: 10, end: 12 },
    { day: 'Thu', start: 15, end: 17 },
    { day: 'Fri', start: 9, end: 10 },
  ],
};

// 요일과 시간대 설정
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 9 AM to 9 PM

// 겹치는 시간 계산 함수
const calculateOverlaps = (selectedMembers) => {
  const scheduleMap = {};

  selectedMembers.forEach((member) => {
    const schedules = memberSchedules[member];
    schedules.forEach(({ day, start, end }) => {
      for (let hour = start; hour < end; hour++) {
        const key = `${day}-${hour}`;
        if (!scheduleMap[key]) scheduleMap[key] = [];
        scheduleMap[key].push(member);
      }
    });
  });

  return scheduleMap;
};

// 연속된 시간대의 셀 병합을 위해 각 시간 범위를 찾는 함수
const getMergedCells = (overlaps) => {
  const mergedCells = {};
  days.forEach((day) => {
    let startHour = null;
    let currentMembers = [];
    hours.forEach((hour) => {
      const key = `${day}-${hour}`;
      const members = overlaps[key] || [];

      if (members.length > 0 && currentMembers.join() === members.join()) {
        // 같은 멤버가 있는 시간대를 이어서 병합
        if (startHour === null) startHour = hour;
      } else {
        // 시간대가 변경되면 병합된 셀을 저장
        if (startHour !== null) {
          const cellKey = `${day}-${startHour}`;
          mergedCells[cellKey] = { members: currentMembers, span: hour - startHour };
          startHour = null;
        }
        if (members.length > 0) {
          startHour = hour;
          currentMembers = members;
        }
      }
    });
    // 마지막 시간에 대한 병합 처리
    if (startHour !== null) {
      const cellKey = `${day}-${startHour}`;
      mergedCells[cellKey] = { members: currentMembers, span: hours[hours.length - 1] + 1 - startHour };
    }
  });
  return mergedCells;
};

const GroupSchedule = () => {
  const [selectedMembers, setSelectedMembers] = useState(['A', 'B', 'C', 'D']);
  const overlaps = calculateOverlaps(selectedMembers);
  const mergedCells = getMergedCells(overlaps);

  return (
    <div className="overflow-x-auto bg-gray-100 p-5">
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">포커스 스터디</h2>
      </div>

      {/* 시간표 테이블 */}
      <table className="table-fixed w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-200 w-20"></th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-gray-300 px-4 py-2 text-center font-bold bg-gray-200"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              {/* 시간 열 */}
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold bg-gray-50">
                {hour < 12 ? `${hour} AM` : `${hour > 12 ? hour - 12 : hour} PM`}
              </td>

              {/* 각 요일별 시간대 */}
              {days.map((day) => {
                const key = `${day}-${hour}`;
                if (mergedCells[key]) {
                  const { members, span } = mergedCells[key];
                  return (
                    <td
                      key={key}
                      rowSpan={span}
                      className={`border border-gray-300 px-4 py-2 text-center ${
                        members.length === 1
                          ? "bg-green-100"
                          : members.length === 2
                          ? "bg-green-200"
                          : members.length === 3
                          ? "bg-green-300"
                          : "bg-green-400"
                      }`}
                    >
                      {members.length}명
                    </td>
                  );
                }
                if (!Object.keys(mergedCells).some((cellKey) => cellKey.startsWith(`${day}-${hour}`))) {
                  return (
                    <td
                      key={key}
                      className="border border-gray-300 px-4 py-2 bg-white"
                    ></td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupSchedule;
