import React, { useEffect, useState } from "react";
import GetGroupDataApi from "./GetDataApi";

const ApiTest = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const data = await GetGroupDataApi(); // API 호출
        if (data) {
          setGroups(data); // 데이터 상태 업데이트
        }
      } catch (err) {
        console.error("Error fetching group data:", err);
        setError(err.message); // 에러 상태 저장
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchGroups();
  }, []);

  if (isLoading) {
    return <p>Loading group data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Group Data</h1>
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
        <p>No groups found.</p>
      )}
    </div>
  );
};

export default ApiTest;
