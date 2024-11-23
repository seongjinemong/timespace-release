const GroupTab = () => {
  const groups = [
    { id: 1, name: "리엑트 스터디", active: true },
    { id: 2, name: "포리프", active: false },
  ];

  return (
    <div className="w-full">
      {/* Main content with border */}
      <nav className="w-full px-6 py-4 flex justify-between items-center">
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
      </nav>
    </div>
  );
};

export default GroupTab;