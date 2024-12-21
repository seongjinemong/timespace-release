// src/api/userApi.js
import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/profile`, // /user/info 가 아니라 /user/profile로 수정
      { withCredentials: true }
    );
    return response.data; // 백엔드에서 user 객체를 직접 보내므로 .data 한번만 사용
  } catch (error) {
    console.error("사용자 정보 조회 에러:", error);
    return null;
  }
};
