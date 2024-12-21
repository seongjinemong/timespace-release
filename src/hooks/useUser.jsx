// src/hooks/useUser.js
import { useState, useEffect } from "react";
import { getUserInfo } from "../api/userApi";

export const useUser = () => {
  const [userName, setUserName] = useState("");
  const isLoggedIn = localStorage.getItem("Credential") !== null;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn) {
        const userInfo = await getUserInfo();
        setUserName(userInfo?.name || ""); // email 대신 name을 사용
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  return { userName, isLoggedIn };
};
