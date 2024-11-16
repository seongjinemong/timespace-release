import React, { useMemo } from "react";

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
          data.rowSpan > 1 ? (
            <td
              key={idx}
              rowSpan={data.rowSpan}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "center",
              }}
            >
              {data.count > 0 && (
                <>
                  {data.count}
                  <br />
                  {data.namelist.join(", ")}
                </>
              )}
            </td>
          ) : (
            <td
              key={idx}
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "center",
              }}
            >
              {data.count > 0 && (
                <>
                  {data.count}
                  <br />
                  {data.namelist.join(",")}
                </>
              )}
            </td>
          )
        ) : null
      )}
    </>
  );
}

export default TimeTableRow;
