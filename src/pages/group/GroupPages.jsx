import React from "react";
import TimeTable from "../table/GroupTable";
import processData from "./processData";
import GroupFriendList from "./GroupFriendList";
import GroupTab from "../../components/GroupTab";
import Navigation from "../../components/Navigation"; // Navigation 컴포넌트 불러오기
import ShadowBox from "../../components/ShadowBox";

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
      <div className="m-3">  
        <ShadowBox>
          <Navigation />
        </ShadowBox>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 첫 번째 콘텐츠 영역: 왼쪽 (TimeTable) */}
        <div className="flex-1 flex">
          <div className="w-[70%] border-4 border-white bg-white m-2">  
            <ShadowBox>
              <TimeTable timeTableData={result} />
            </ShadowBox>
          </div>
          {/* 오른쪽: FriendTable */}
          <div className="w-[30%] border-4 border-white bg-white m-2">
            <ShadowBox>
              <GroupFriendList />
            </ShadowBox>
          </div>
        </div>
      </div>

      <div className="m-3 ">  
        <ShadowBox>
          <GroupTab />
        </ShadowBox>  
      </div>
      
      <footer className="w-full"
        style={{ height: "90%" }}>
      </footer>
    </div>
  );
};

export default GroupPage;