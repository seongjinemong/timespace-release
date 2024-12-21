import axios from "axios";

const GetGroupData = async () => {
  try {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    // Step 1: Fetch groups the user belongs to
    console.log(`Fetching group data from: ${serverUrl}/group`);

    const groupResponse = await axios.get(`${serverUrl}/group`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (groupResponse.status !== 200) {
      console.error("Failed to fetch group data:", groupResponse.status);
      return null;
    }

    const groups = groupResponse.data; // List of groups the user belongs to
    console.log("Groups received:", groups);

    const groupDetails = await Promise.all(
      groups.map(async (group) => {
        // Step 2: Fetch group members for each group
        console.log(`Fetching members for group ID: ${group.id}`);

        const memberResponse = await axios.get(`${serverUrl}/group/${group.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (memberResponse.status !== 200) {
          console.error(
            `Failed to fetch members for group ID ${group.id}:`,
            memberResponse.status
          );
          return { ...group, members: [] };
        }

        const groupData = memberResponse.data;

        // Step 3: Fetch timetable for each member in the group
        const membersWithTimetables = await Promise.all(
          groupData.members.map(async (member) => {
            console.log(`Fetching timetable for member ID: ${member.id}`);

            try {
              const timetableResponse = await axios.get(`${serverUrl}/timetable/${member.id}`, {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              if (timetableResponse.status === 200) {
                return { ...member, timetable: timetableResponse.data };
              } else {
                console.error(`Failed to fetch timetable for member ID ${member.id}`);
                return { ...member, timetable: null };
              }
            } catch (error) {
              console.error(`Error fetching timetable for member ID ${member.id}:`, error);
              return { ...member, timetable: null };
            }
          })
        );

        return { ...groupData, members: membersWithTimetables };
      })
    );

    // Step 4: Transform data into required format with groups and members
    const groupDataWithMembers = {
      timeTable: {},
      groups: {}
    };

    groupDetails.forEach((group) => {
      groupDataWithMembers.groups[group.name] = { members: [] };

      group.members.forEach((member) => {
        groupDataWithMembers.groups[group.name].members.push(member.name);

        if (!groupDataWithMembers.timeTable[member.name]) {
          groupDataWithMembers.timeTable[member.name] = {
            "월": [], "화": [], "수": [], "목": [], "금": [], "토": [], "일": []
          };
        }

        if (member.timetable && member.timetable.data) {
          member.timetable.data.forEach((entry) => {
            const { day, name, startTime, endTime } = entry;
            const startHour = Math.floor(startTime / 60);
            const endHour = Math.floor(endTime / 60);

            const existingEntry = groupDataWithMembers.timeTable[member.name][day].find(
              (e) => e.name === name && e.start === startHour && e.end === endHour
            );

            if (!existingEntry) {
              groupDataWithMembers.timeTable[member.name][day].push({
                name,
                start: startHour,
                end: endHour
              });
            }
          });
        }
      });
    });

    console.log("Final Group Data with Members and TimeTables:", JSON.stringify(groupDataWithMembers, null, 2));
    return groupDataWithMembers;
  } catch (error) {
    console.error("Error during API call:", error.message);
    return null;
  }
};

export default GetGroupData;
