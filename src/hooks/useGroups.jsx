// src/hooks/useGroups.jsx
import { useState, useEffect, useCallback } from "react";
import { groupApi } from "../api/groupApi";
import { getUserInfo } from "../api/userApi";
import { useAuthStore } from "../store/authStore";

export const useGroups = () => {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const setUserId = useAuthStore((state) => state.setUserId);
  const userId = useAuthStore((state) => state.userId);

  // 사용자 정보 가져오기
  const fetchUserInfo = useCallback(async () => {
    if (!userId) {
      const userInfo = await getUserInfo();
      if (userInfo?.id) {
        setUserId(userInfo.id);
      }
    }
  }, [userId, setUserId]);

  // 그룹 목록 조회
  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      const data = await groupApi.getGroups();
      setGroups(Array.isArray(data) ? data : []);
      if (data.length > 0 && !activeGroup) {
        setActiveGroup(data[0].id);
      }
      setError("");
    } catch (err) {
      console.error("그룹 목록 조회 에러:", err);
      setError("그룹 목록을 불러오는데 실패했습니다.");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 그룹 생성
  const createGroup = useCallback(
    async (groupData) => {
      try {
        if (!groupData.name.trim()) {
          throw new Error("그룹 이름을 입력해주세요.");
        }
        if (!userId) {
          await fetchUserInfo();
        }
        if (!userId) {
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }
        const data = await groupApi.createGroup(
          groupData.name,
          userId.toString()
        );
        await fetchGroups();
        setError("");
        return true;
      } catch (err) {
        console.error("그룹 생성 에러:", err);
        setError(
          err.response?.data || err.message || "그룹 생성에 실패했습니다."
        );
        return false;
      }
    },
    [userId, fetchUserInfo, fetchGroups]
  );

  useEffect(() => {
    fetchUserInfo();
    fetchGroups();
  }, [fetchUserInfo, fetchGroups]);

  return {
    groups,
    activeGroup,
    loading,
    error,
    createGroup,
    selectGroup: useCallback((groupId) => setActiveGroup(groupId), []),
    refreshGroups: fetchGroups,
  };
};
