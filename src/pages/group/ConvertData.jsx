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
      // Initialize group members
      testData.groups[groupName] = { members: groupDetails.members };

      groupDetails.members.forEach((member) => {
        // Initialize member in the timeTable
        if (!testData.timeTable[member]) {
          testData.timeTable[member] = {
            "월": [], "화": [], "수": [], "목": [], "금": [], "토": [], "일": []
          };
        }

        // Add timetable data to the member
        const memberTimeTable = groupData.timeTable[member];
        if (memberTimeTable) {
          Object.entries(memberTimeTable).forEach(([day, entries]) => {
            entries.forEach((entry) => {
              const { name, start, end } = entry;
              // Avoid duplicate entries for the same day and name
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
