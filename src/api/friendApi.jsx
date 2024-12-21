// src/api/friendApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const friendApi = {
  // 친구 목록 조회
  getFriends: async () => {
    const response = await axios.get(`${BASE_URL}/friend`, {
      withCredentials: true,
    });
    return response.data;
  },

  // 친구 추가
  addFriend: async (email) => {
    const response = await axios.post(
      `${BASE_URL}/friend/add`,
      { email },
      { withCredentials: true }
    );
    return response.data;
  },
};
