import React from "react";
import TimeTable from "./Table";
import processData from "./processData";
import FriendList from "../profile/components/FriendList";
import GroupFriendList from "./GroupFriendList";
import GroupList from "../profile/components/GroupTab";
import Navigation from "../../components/Navigation"; // Navigation 컴포넌트 불러오기


const timeTableData2 = {
  A: {
    월: [{ name: "Math", start: 9, end: 11 }],
    화: [{ name: "English", start: 10, end: 12 }],
    수: [{ name: "Physics", start: 13, end: 15 }],
    목: [{ name: "Chemistry", start: 9, end: 10 }],
    금: [{ name: "Biology", start: 14, end: 16 }],
    토: [{ name: "History", start: 11, end: 12 }],
    일: [{ name: "Literature", start: 10, end: 11 }],
  },
  B: {
    월: [{ name: "Physics", start: 9, end: 10 }],
    화: [{ name: "Biology", start: 11, end: 13 }],
    수: [{ name: "History", start: 10, end: 11 }],
    목: [{ name: "Math", start: 14, end: 15 }],
    금: [{ name: "Chemistry", start: 9, end: 11 }],
    토: [{ name: "English", start: 10, end: 12 }],
    일: [{ name: "Philosophy", start: 13, end: 14 }],
  },
  C: {
    월: [{ name: "Chemistry", start: 10, end: 11 }],
    화: [{ name: "History", start: 10, end: 11 }],
    수: [{ name: "Math", start: 9, end: 10 }],
    목: [{ name: "Literature", start: 11, end: 12 }],
    금: [{ name: "Philosophy", start: 10, end: 11 }],
    토: [{ name: "Biology", start: 14, end: 16 }],
    일: [{ name: "English", start: 9, end: 10 }],
  },
};

const result = processData(timeTableData2);

const GroupPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto" >
      {/* 상단 네비게이션 바 */}
      <Navigation />

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 첫 번째 콘텐츠 영역: 왼쪽 (TimeTable) */}
        <div className="flex-1 flex">
          <div className="w-[70%] border-4 border-white bg-white ">
            <TimeTable timeTableData={result} />
          </div>

          {/* 오른쪽: FriendTable */}
          <div className="w-[30%] border-4 border-white bg-white ">
            <GroupFriendList />
          </div>
        </div>
      </div>

      <GroupList />

      <footer className="w-full bg-white text-black flex items-center justify-center"
        style={{ height: "80%" }}>
        <p className="text-sm">© 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default GroupPage;