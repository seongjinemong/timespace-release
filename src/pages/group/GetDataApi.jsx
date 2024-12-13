import axios from "axios";

const GetDataApi = async () => {
  try {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    console.log(`Fetching group data from: ${serverUrl}/group`);

    const response = await axios.get(`${serverUrl}/group`, {
      withCredentials: true, // 인증 쿠키 포함
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰 예시
      },
    });

    if (response.status === 200) {
      console.log("Group data received:", response.data);
      return response.data;
    } else {
      console.error("Failed to fetch group data:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error during API call:", error.message);
    return null;
  }
};

export default GetDataApi;
