export default function GroupTab() {
  const groups = [
    { id: 1, name: "리엑트 스터디", active: true },
    { id: 2, name: "포리프", active: false },
  ];

  return (
    <div className="relative h-[108px]">
      <div className="absolute top-[11px] left-0 right-0 h-[97px] bg-[#254D64] rounded-[20px]" />
      <div className="relative h-[97px] bg-white border-[3px] border-[#254D64] rounded-[20px] px-8">
        <div className="flex items-center h-full gap-4">
          <span className="text-2xl font-bold">그룹</span>
          <div className="flex gap-4">
            {groups.map((group) => (
              <button
                key={group.id}
                className={`h-[61px] px-4 border-[3px] border-[#254D64] rounded-[10px] text-2xl
                    ${
                      group.active
                        ? "bg-[#254D64] text-white"
                        : "bg-white text-black"
                    }`}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
