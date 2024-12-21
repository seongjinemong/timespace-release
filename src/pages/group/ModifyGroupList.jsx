import React, { useState, useEffect } from "react";

const ModifyGroupList = ({ currentMembers, groupId, onUpdate, onClose }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState(
    currentMembers.map((member) => member.id)
  ); // ID로 초기화
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    // 친구 목록 가져오기
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${serverUrl}/friend`, {
          credentials: "include",
        });
        const data = await response.json();
        const friendsArray = Array.isArray(data) ? data : Object.values(data);
        setAllFriends(friendsArray || []);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      }
    };

    // 그룹 멤버 가져오기
    const fetchGroupMembers = async () => {
      try {
        const response = await fetch(`${serverUrl}/group/${groupId}`, {
          credentials: "include",
        });
        const groupData = await response.json();
        setSelectedFriends(groupData.members.map((member) => member.id)); // ID로 초기화
      } catch (error) {
        console.error("Failed to fetch group members:", error);
      }
    };

    fetchFriends();
    fetchGroupMembers();
  }, [serverUrl, groupId]);

  const handleCheckboxChange = async (friend) => {
    const isSelected = selectedFriends.includes(friend.id);
    const updatedFriends = isSelected
      ? selectedFriends.filter((id) => id !== friend.id)
      : [...selectedFriends, friend.id];
  
    setSelectedFriends(updatedFriends);
  
    try {
      const endpoint = isSelected
        ? `${serverUrl}/group/${groupId}/removefriend`
        : `${serverUrl}/group/${groupId}/addfriend`;
  
      const requestBody = [friend.id]; // 배열 형식의 요청 바디
      console.log(`Calling API: ${endpoint}`);
      console.log("Request Body:", requestBody);
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API call failed: ${errorData.message}`);
      }
  
      console.log("API call successful");
    } catch (error) {
      console.error("Failed to update friend status:", error.message);
    }
  };
  

const handleSave = async () => {
  try {
    // 부모 컴포넌트로 데이터 갱신 신호 전달
    onUpdate();
    onClose(); // 팝업 닫기
  } catch (error) {
    console.error("Failed to save changes:", error);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">그룹 멤버 수정</h2>

        {/* 그룹 ID 출력 */}
        <div className="mb-4">
          <strong>Group ID:</strong> {groupId}
        </div>

        {/* 선택된 친구 ID 목록 출력 */}
        <div className="mb-4">
          <strong>Selected Friends (IDs):</strong>
          <pre className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(selectedFriends, null, 2)}
          </pre>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {allFriends.length > 0 ? (
            allFriends.map((friend) => (
              <div key={friend.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  checked={selectedFriends.includes(friend.id)}
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
