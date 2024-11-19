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
    ],
    E: [
      { day: 'Mon', start: 9, end: 10 },
      { day: 'Wed', start: 10, end: 12 },
      { day: 'Thu', start: 15, end: 17 },
      { day: 'Fri', start: 9, end: 10 },
    ],
  };
  

// 요일과 시간대 설정 (토요일, 일요일 추가)
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

const GroupSchedule = () => {
  const [selectedMembers, setSelectedMembers] = useState(['A', 'B', 'C', 'D']);
  const overlaps = calculateOverlaps(selectedMembers);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', height: '100vh', overflowY: 'auto' }}>
      {/* 상단 타이틀 및 필터 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>포커스 스터디</h2>
        <div>
          <button style={{ marginRight: '10px', padding: '5px 10px' }}>겹치는 부분 표시</button>
          <button style={{ padding: '5px 10px' }}>안겹치는 부분 표시</button>
        </div>
      </div>

      {/* 시간표 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(7, 1fr)', gap: '1px' }}>
        <div></div>
        {days.map((day) => (
          <div
            key={day}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'black',
              height: '40px', // 요일 셀 높이 고정
            }}
          >
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'black',
                height: '60px', // 시간 셀 높이 고정
                display: 'flex',
                alignItems: 'flex-start', // 텍스트를 위로 정렬

                justifyContent: 'center',
              }}
            >
              {hour < 12 ? `${hour} AM` : `${hour > 12 ? hour - 12 : hour} PM`}
            </div>
            {days.map((day) => {
              const key = `${day}-${hour}`;
              const members = overlaps[key] || [];
              const overlapCount = members.length;

              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: overlapCount === 1 ? '#cde6d0' :
                                     overlapCount === 2 ? '#a8d4a3' :
                                     overlapCount === 3 ? '#7fbf7c' :
                                     overlapCount >= 4 ? '#5ca55a' : '#fff',
                    textAlign: 'center',
                    padding: '10px',
                    border: overlapCount > 0 ? '4px solid #2d4856' : '2px solid #ddd', // 테두리 두께 및 색상 설정
                    color: 'black',
                    height: '60px', // 일정 셀 높이 고정
                    display: 'flex',
                    flexDirection: 'column', // 수직 방향으로 정렬
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box', // 테두리가 셀 내부에 위치하게 설정
                  }}
                >
                  <div style={{ fontSize: '1em', marginBottom: '4px' }}>{overlapCount > 0 ? overlapCount : ''}</div>
                  <div style={{ fontSize: '0.8em', color: '#555' }}>{members.join(', ')}</div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GroupSchedule;
