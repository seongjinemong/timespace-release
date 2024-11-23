import { useState } from "react";

const FriendsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const allFriends = [
    "조성진",
    "홍성문",
    "박현수",
    "김다연",
    "박정호",
    "이송희",
    "이경민",
    "김수정",
    "유지훈",
    "최지영",
    "정예림",
  ];

  // 검색어에 따라 친구 필터링
  const filteredFriends = allFriends.filter((friend) =>
    friend.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-[842px]">
      {/* Background border */}
      <div className="absolute top-[11px] left-0 right-0 h-[831px] bg-[#254D64] rounded-[20px]" />

      {/* Main content */}
      <div className="relative h-[831px] bg-white border-[3px] border-[#254D64] rounded-[20px] p-4">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-bold text-black mb-4">친구</h2>

          {/* Search Box */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[67px] px-5 text-2xl border-[3px] border-[#254D64] rounded-[10px] text-black"
            />
          </div>

          {/* Friends List with Scroll */}
          <div className="flex-1 overflow-y-auto max-h-[550px]"> {/* max-h 추가하여 최대 높이 설정 */}
            {filteredFriends.map((name, index) => (
              <div key={name} className="relative">
                <div className="py-4 text-2xl text-black">{name}</div>
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

          {/* Bottom Actions */}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="친구 추가"
                className="w-full h-[67px] px-5 text-2xl border-[3px] border-[#254D64] rounded-[10px] text-black/30"
              />
            </div>
            <button className="w-[117px] h-[67px] border-[3px] border-[#254D64] rounded-[10px] text-2xl text-[#254D64]">
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
