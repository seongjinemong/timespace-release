// src/components/FriendsList.jsx
import { useState } from "react";
import { useFriends } from "../../../hooks/useFriends";

export default function FriendsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const { friends, loading, error, addFriend } = useFriends();

  const handleAddFriend = async () => {
    const success = await addFriend(newFriendEmail);
    if (success) {
      setNewFriendEmail("");
    }
  };

  const filteredFriends = Array.isArray(friends)
    ? friends.filter(
        (friend) =>
          friend.name &&
          friend.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="relative min-h-[842px]">
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
            {loading ? (
              <div className="text-center text-gray-500 mt-4">로딩중...</div>
            ) : (
              <>
                {filteredFriends.map((friend, index) => (
                  <div key={friend.email} className="relative">
                    <div className="py-4 px-5 text-2xl text-black text-left">
                      {friend.name}
                    </div>
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
              </>
            )}
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
          )}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="친구 이메일"
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                className="w-full h-[67px] px-5 text-2xl border-[3px] border-[#254D64] rounded-[10px] text-black"
              />
            </div>
            <button
              onClick={handleAddFriend}
              className="w-[117px] h-[67px] border-[3px] border-[#254D64] rounded-[10px] text-2xl text-[#254D64] hover:bg-[#254D64] hover:text-white transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
