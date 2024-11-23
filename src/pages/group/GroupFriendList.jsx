import { useState } from "react";
import TimespaceButton from "../../components/TimespaceButton";
import ShadowBox from "../../components/ShadowBox";

const FriendsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const allFriends = [
    "조성진",
    "홍성문",
    "박현수",
    "김다연",
    "박정호",
  ];

  // 검색어에 따라 친구 필터링
  const filteredFriends = allFriends.filter((friend) =>
    friend.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (name) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(name)
        ? prevSelectedFriends.filter((friend) => friend !== name) // 체크 해제
        : [...prevSelectedFriends, name] // 체크 추가
    );
  };

  return (
    <div>
      {/* Background border */}
      <div className="flex flex-col">
        {/* Bottom Actions */}
        <div className="flex items-center justify-center m-3">
          <ShadowBox>
            <button>
              그룹에 친구추가
            </button>
          </ShadowBox>
        </div>

        {/* Friends List with Scroll */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {filteredFriends.map((name, index) => (
            <div key={name} className="relative flex items-center justify-center py-4 text-2xl text-black">
              {/* 체크박스 */}
              <input
                type="checkbox"
                className="w-6 h-6 mr-2"  // 체크박스 크기 조정과 오른쪽 마진 추가
                checked={selectedFriends.includes(name)}
                onChange={() => handleCheckboxChange(name)}
              />
              <div className="flex items-center justify-center">{name}</div> {/* 이름 */}
              {index !== filteredFriends.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 border-b-[3px] border-[#254D64]" />
              )}
            </div>
          ))}
          {filteredFriends.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
