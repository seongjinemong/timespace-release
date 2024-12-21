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
        return { ...group, members: groupData.members };
      })
    );

    console.log("Final group details:", groupDetails);
    return groupDetails;
  } catch (error) {
    console.error("Error during API call:", error.message);
    return null;
  }
};

export default GetGroupData;
