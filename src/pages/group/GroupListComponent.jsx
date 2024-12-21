import React, { useEffect, useState } from "react";
import GetGroupDataApi from "./ConvertData";

const GroupListComponent = () => {
  const [groups, setGroups] = useState([]); // 그룹 데이터를 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true); // 로딩 상태 시작
        const data = await GetGroupDataApi(); // 비동기 API 호출
        if (data) {
          setGroups(data); // 데이터를 상태에 저장
        }
      } catch (err) {
        console.error("Failed to fetch group data:", err);
        setError(err.message); // 에러 상태 저장
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    fetchGroups();
  }, []);

  if (isLoading) {
    return <p>Loading group data...</p>; // 로딩 중 메시지
  }

  if (error) {
    return <p>Error: {error}</p>; // 에러 메시지 출력
  }

  return (
    <div>
      <h1>Group List</h1>
      {groups.length > 0 ? (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <strong>Name:</strong> {group.name} <br />
              <strong>Created At:</strong> {new Date(group.createdAt).toLocaleString()} <br />
              <strong>Updated At:</strong> {new Date(group.updatedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No groups found.</p> // 그룹 데이터가 없을 경우
      )}
    </div>
  );
};

export default GroupListComponent;
