import { useState } from "react";

export default function FriendsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const allFriends = [
    "조성진",
    "홍성문",
    "박현수",
    "김다연",
    "박정호",
    "이송희",
  ];
  const filteredFriends = allFriends.filter((friend) =>
    friend.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-[842px]">
      <div className="absolute top-[11px] left-0 right-0 h-[831px] bg-[#254D64] rounded-[20px]" />
      <div className="relative h-[831px] bg-white border-[3px] border-[#254D64] rounded-[20px] p-4">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-bold text-black mb-4">친구</h2>
          <div className="mb-6">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[67px] px-5 text-2xl border-[3px] border-[#254D64] rounded-[10px] text-black"
            />
          </div>
          <div className="flex-1">
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
}
