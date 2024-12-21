import { useState } from "react";
import { useGroups } from "../../../hooks/useGroups";
import { useNavigate, useLocation } from "react-router-dom";

export default function GroupTab() {
  const [newGroupName, setNewGroupName] = useState("");
  const { groups, activeGroup, loading, error, createGroup, selectGroup } =
    useGroups();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateGroup = async () => {
    const success = await createGroup({ name: newGroupName });
    if (success) {
      setNewGroupName("");
    }
  };

  const handleGroupClick = (groupId, groupName) => {
    selectGroup(groupId);
    navigate(`/group/${groupName}`);
  };

  // Check if we're currently in a group page
  const isInGroupPage = location.pathname.startsWith("/group/");

  return (
    <div className="relative h-[108px]">
      <div className="absolute top-[11px] left-0 right-0 h-[97px] bg-[#254D64] rounded-[20px]" />
      <div className="relative h-[97px] bg-white border-[3px] border-[#254D64] rounded-[20px] px-8">
        <div className="flex items-center h-full gap-4">
          <span className="text-xl font-bold">그룹</span>
          {loading ? (
            <div>로딩중...</div>
          ) : (
            <>
              <div className="flex gap-4 flex-1">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupClick(group.id, group.name)}
                    className={`h-[61px] px-4 border-[3px] border-[#254D64] rounded-[10px] text-base
                    ${
                      isInGroupPage && group.id === activeGroup
                        ? "bg-[#254D64] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="새 그룹 이름"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="h-[61px] px-4 text-base border-[3px] border-[#254D64] rounded-[10px]"
                />
                <button
                  onClick={handleCreateGroup}
                  className="h-[61px] px-4 border-[3px] border-[#254D64] rounded-[10px] text-base bg-white text-[#254D64] hover:bg-[#254D64] hover:text-white transition-colors"
                >
                  추가
                </button>
              </div>
            </>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm absolute -bottom-6 left-8">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
