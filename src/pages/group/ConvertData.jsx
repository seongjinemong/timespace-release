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

    groupData.forEach((group) => {
      // Initialize group members
      testData.groups[group.name] = { members: [] };

      group.members.forEach((member) => {
        // Add member to the group's member list
        testData.groups[group.name].members.push(member.email);

        // Initialize member in the timeTable
        if (!testData.timeTable[member.email]) {
          testData.timeTable[member.email] = {
            "월": [], "화": [], "수": [], "목": [], "금": [], "토": [], "일": []
          };
        }

        // Add timetable data to the member
        if (member.timetable && member.timetable.data) {
          member.timetable.data.forEach((entry) => {
            const { day, name, startTime, endTime } = entry;
            const startHour = Math.floor(startTime / 60);
            const endHour = Math.floor(endTime / 60);

            // Avoid duplicate entries for the same day and name
            const existingEntry = testData.timeTable[member.email][day].find(
              (e) => e.name === name && e.start === startHour && e.end === endHour
            );

            if (!existingEntry) {
              testData.timeTable[member.email][day].push({
                name,
                start: startHour,
                end: endHour
              });
            }
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
