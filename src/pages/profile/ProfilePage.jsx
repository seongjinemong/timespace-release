import ProfileTable from "./components/ProfileTable";
import FriendsList from "./components/FriendsList";
import GroupTab from "./components/GroupTab";

export default function ProfilePage() {
  return (
    <div>
      <div className="max-w-[1920px] mx-auto p-5">
        <div className="flex gap-4">
          <div className="w-[1390px]">
            <ProfileTable />
          </div>
          <div className="w-[471px]">
            <FriendsList />
          </div>
        </div>
        <div className="mt-4">
          <GroupTab />
        </div>
      </div>
    </div>
  );
}
