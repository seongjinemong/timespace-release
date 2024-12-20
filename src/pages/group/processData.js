const processData = (timeTableData) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const result = {};

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
    const timeIntervals = Array(24).fill(null).map(() => []); // 시간대를 24시간으로 나눔

    allLectures.forEach((lecture) => {
      for (let i = lecture.start; i < lecture.end; i++) {
        timeIntervals[i].push(lecture.person);
      }
    });

    const mergedLectures = [];
    let currentInterval = null;

    for (let i = 0; i < timeIntervals.length; i++) {
      const names = timeIntervals[i];

      if (names.length > 0) {
        if (!currentInterval) {
          // 새로운 시간대 시작
          currentInterval = { start: i, end: i + 1, count: names.length, namelist: [...names] };
        } else if (
          JSON.stringify(currentInterval.namelist.sort()) === JSON.stringify(names.sort())
        ) {
          // 동일한 참여자가 계속되는 시간대
          currentInterval.end = i + 1;
        } else {
          // 참여자가 변경된 경우 기존 시간대를 추가
          mergedLectures.push(currentInterval);
          currentInterval = { start: i, end: i + 1, count: names.length, namelist: [...names] };
        }
      } else if (currentInterval) {
        // 시간이 비어 있는 경우 기존 시간대를 추가
        mergedLectures.push(currentInterval);
        currentInterval = null;
      }
    }

    // 마지막 시간대 추가
    if (currentInterval) {
      mergedLectures.push(currentInterval);
    }

    if (mergedLectures.length > 0) {
      result[day] = mergedLectures;
    }
  });

  return result;
};

export default processData;
