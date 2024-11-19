import React, { useMemo } from "react";

// 단계별 색상 정의
const backgroundColors = [
  "#D4F3D8", // 1단계 (가장 연한 초록색)
  "#ADEBB5", // 2단계
  "#85E292", // 3단계
  "#5ED970", // 4단계
  "#36CF4D", // 5단계 (가장 진한 초록색)
];

// count에 따른 색상을 반환하는 함수
const getBackgroundColor = (count) => {
  if (count === 0) return "white"; // 데이터가 없을 경우 흰색 배경
  return backgroundColors[Math.min(count - 1, backgroundColors.length - 1)];
};

function TimeTableRow({ timeNum, timeTableData }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const rowData = useMemo(() => {
    return days.map((day) => {
      // 해당 요일의 시간대에 겹치는 데이터 찾기
      const timeData = timeTableData[day]?.find(
        (lecture) => lecture.start <= timeNum && timeNum < lecture.end
      );

      if (timeData) {
        // 시작 시간이 현재 시간대라면 병합된 셀 생성
        if (timeData.start === timeNum) {
          return {
            count: timeData.count,
            rowSpan: timeData.end - timeData.start,
            namelist: timeData.namelist,
          };
        }
        // 병합된 범위 내의 시간대는 null로 처리
        return null;
      }

      // 해당 시간대에 데이터가 없는 경우 빈 셀 반환
      return { count: 0, rowSpan: 1, namelist: [] };
    });
  }, [timeNum, timeTableData]);

  return (
    <>
      {rowData.map((data, idx) =>
        data ? (
          <td
            key={idx}
            rowSpan={data.rowSpan}
            className="border border-black px-6 py-4 text-center relative"
            style={{
              backgroundColor: getBackgroundColor(data.count),
              boxShadow: data.count > 0 ? "inset 0 0 0 2px #22C55E" : "none", // 내부 초록색 테두리
              height: data.rowSpan === 1 ? "70px" : undefined, // 1시간 일정의 높이를 보장
            }}
          >
            {data.count > 0 && (
              <>
                <div>{data.count}</div>
                <div>{data.namelist.join(", ")}</div>
              </>
            )}
          </td>
        ) : null
      )}
    </>
  );
}

export default TimeTableRow;
