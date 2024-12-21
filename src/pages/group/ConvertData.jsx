import GetGroupData from "./GetDataApi";

const ConvertToTestData = async () => {
  try {
    const groupData = await GetGroupData();
    if (!groupData) {
      console.error("No group data available.");
      return null;
    }

    const testData = {
      timeTable: {},
      groups: {}
    };

    Object.entries(groupData.groups).forEach(([groupName, groupDetails]) => {
      // 그룹 ID와 멤버를 추가
      testData.groups[groupName] = { 
        id: groupDetails.id, // 그룹 ID 추가
        members: groupDetails.members 
      };

      groupDetails.members.forEach((member) => {
        // 시간표 초기화
        if (!testData.timeTable[member]) {
          testData.timeTable[member] = {
            "월": [], "화": [], "수": [], "목": [], "금": [], "토": [], "일": []
          };
        }

        // 시간표 데이터 추가
        const memberTimeTable = groupData.timeTable[member];
        if (memberTimeTable) {
          Object.entries(memberTimeTable).forEach(([day, entries]) => {
            entries.forEach((entry) => {
              const { name, start, end } = entry;
              // 중복 방지
              const existingEntry = testData.timeTable[member][day].find(
                (e) => e.name === name && e.start === start && e.end === end
              );

              if (!existingEntry) {
                testData.timeTable[member][day].push({ name, start, end });
              }
            });
          });
        }
      });
    });

    console.log("Converted Test Data:", JSON.stringify(testData, null, 2));
    return testData;
  } catch (error) {
    console.error("Error converting to test data:", error);
    return null;
  }
};

export default ConvertToTestData;
