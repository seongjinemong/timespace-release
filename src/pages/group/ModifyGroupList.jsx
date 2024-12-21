import React, { useState, useEffect } from "react";

const ModifyGroupList = ({ currentMembers, onUpdate, onClose }) => {
  const [allFriends, setAllFriends] = useState([]); // 전체 친구 목록
  const [selectedFriends, setSelectedFriends] = useState(currentMembers); // 선택된 멤버
  const serverUrl = import.meta.env.VITE_SERVER_URL; // 서버 URL 가져오기

  useEffect(() => {
    // 전체 친구 목록 가져오기
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${serverUrl}/friend`, { credentials: "include" }); // API 호출
        const data = await response.json();
        const friendsArray = Array.isArray(data) ? data : Object.values(data); // 배열로 변환
        setAllFriends(friendsArray || []); // 전체 친구 목록 설정
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    };

    fetchFriends();
  }, [serverUrl]);

  const handleCheckboxChange = (friend) => {
    const updatedFriends = selectedFriends.includes(friend.email)
      ? selectedFriends.filter((f) => f !== friend.email) // 체크 해제
      : [...selectedFriends, friend.email]; // 체크 추가

    setSelectedFriends(updatedFriends);
  };

  const handleSave = () => {
    onUpdate(selectedFriends); // 업데이트된 멤버 전달
    onClose(); // 팝업 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">그룹 멤버 수정</h2>

        <div className="max-h-60 overflow-y-auto">
          {allFriends.length > 0 ? (
            allFriends.map((friend) => (
              <div key={friend.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  checked={selectedFriends.includes(friend.email)} // 이메일 기준으로 선택 상태 확인
                  onChange={() => handleCheckboxChange(friend)}
                />
                <div>
                  <strong>{friend.name || "Unnamed"}</strong>
                  <span className="text-gray-500 ml-2">{friend.email}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">친구 목록이 비어 있습니다.</div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyGroupList;
