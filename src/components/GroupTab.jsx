import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 임포트
import ConvertToTestData from "../pages/group/ConvertData";

const GroupTab = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]); // 그룹 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const data = await ConvertToTestData();
        if (data && data.groups) {
          const fetchedGroups = Object.keys(data.groups).map((groupName, index) => ({
            id: index + 1,
            name: groupName,
            active: false,
          }));
          setGroups(fetchedGroups);
        }
      } catch (err) {
        console.error("Error fetching group data:", err);
        setError("Failed to load groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // 그룹 선택 시 active 상태 업데이트
  const handleGroupClick = (groupName) => {
    const updatedGroups = groups.map((group) => {
      // 클릭한 그룹의 active 값을 true로, 나머지 그룹의 active는 false로 설정
      if (group.name === groupName) {
        return { ...group, active: true };
      } else {
        return { ...group, active: false };
      }
    });

    // 상태 업데이트
    setGroups(updatedGroups);

    // 선택된 그룹 name 값을 부모 컴포넌트에 전달
    onSelectGroup(groupName);
  };

  if (loading) {
    return <p>Loading groups...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full">
      <nav className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center h-full gap-4">
          <span className="text-2xl font-bold">그룹</span>
          <div className="flex gap-4">
            {groups.map((group) => (
              <Link
                key={group.id}
                to={`/group/${group.name}`} // 링크를 클릭하면 해당 그룹 이름에 맞는 라우트로 이동
              >
                <button
                  className={`h-[61px] px-4 border-[3px] border-[#254D64] rounded-[10px] text-2xl
                  ${group.active ? "bg-[#254D64] text-white" : "bg-white text-black"}`}
                  onClick={() => handleGroupClick(group.name)} // 그룹 선택 시 active 업데이트
                >
                  {group.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GroupTab;