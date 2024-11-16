const processData = (timeTableData) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
  
    const result = {};
  
    // 각 요일별로 처리
    days.forEach((day) => {
      const allLectures = [];
  
      // 모든 사람의 해당 요일 시간표 데이터를 수집
      Object.entries(timeTableData).forEach(([person, schedule]) => {
        if (schedule[day]) {
          schedule[day].forEach((lecture) => {
            allLectures.push({ ...lecture, person }); // 이름 추가
          });
        }
      });
  
      // 시간대별로 겹치는 데이터를 계산
      const mergedLectures = [];
      allLectures.sort((a, b) => a.start - b.start); // 시작 시간 순으로 정렬
  
      allLectures.forEach((lecture) => {
        const last = mergedLectures[mergedLectures.length - 1];
  
        if (last && last.end > lecture.start) {
          // 시간이 겹칠 경우 병합
          last.end = Math.max(last.end, lecture.end);
          last.count += 1;
          last.namelist.push(lecture.person); // 이름 추가
        } else {
          // 겹치지 않으면 새로운 시간대 추가
          mergedLectures.push({
            start: lecture.start,
            end: lecture.end,
            count: 1,
            namelist: [lecture.person], // 새로운 이름 리스트 추가
          });
        }
      });
  
      if (mergedLectures.length > 0) {
        result[day] = mergedLectures;
      }
    });
  
    return result;
  };
  
  export default processData;
  