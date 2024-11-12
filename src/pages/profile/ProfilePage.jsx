import FriendsList from "./components/FriendList";
import GroupTab from "./components/GroupTab";
import TimeTable from "./components/TimeTable";

const ProfilePage = () => {
  return (
    <div className="bg-[#DFE4E6] min-h-screen p-5">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex gap-4">
          {/* Left side: TimeTable */}
          <div className="w-[1390px]">
            <TimeTable />
          </div>

          {/* Right side: FriendsList */}
          <div className="w-[471px]">
            <FriendsList />
          </div>
        </div>

        {/* Bottom: GroupTab */}
        <div className="mt-4">
          <GroupTab />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;