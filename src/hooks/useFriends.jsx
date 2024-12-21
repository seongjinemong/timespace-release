// src/hooks/useFriends.js
import { useState, useEffect, useCallback } from "react";
import { friendApi } from "../api/friendApi";

export const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 친구 목록 조회
  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      const data = await friendApi.getFriends();
      setFriends(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("친구 목록 조회 에러:", err);
      setError("친구 목록을 불러오는데 실패했습니다.");
      setFriends([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 친구 추가
  const addFriend = useCallback(async (email) => {
    try {
      if (!email.trim()) {
        throw new Error("이메일을 입력해주세요.");
      }
      const data = await friendApi.addFriend(email);
      setFriends(Array.isArray(data) ? data : []);
      setError("");
      return true;
    } catch (err) {
      console.error("친구 추가 에러:", err);
      setError(
        err.response?.data || err.message || "친구 추가에 실패했습니다."
      );
      return false;
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    loading,
    error,
    addFriend,
    refreshFriends: fetchFriends,
  };
};
