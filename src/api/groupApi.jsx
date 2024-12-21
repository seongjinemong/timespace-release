// src/api/groupApi.jsx
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const groupApi = {
  getGroups: async () => {
    const response = await axios.get(`${BASE_URL}/group`, {
      withCredentials: true,
    });
    return response.data;
  },

  createGroup: async (name, userId) => {
    const response = await axios.post(
      `${BASE_URL}/group/new`,
      {
        name,
        user_ids: userId, // 현재 유저 ID 전달
      },
      { withCredentials: true }
    );
    return response.data;
  },
};
