import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimeTable from "../table/GroupTable";
import timeTableData from "../../testdataset/testdata.json"; // JSON 파일 import
import processData from "./processData"; // processData 함수 import
import GroupFriendList from "./GroupFriendList";
import GroupTab from "../../components/GroupTab";
import Navigation from "../../components/Navigation"; // Navigation 컴포넌트 불러오기
import ShadowBox from "../../components/ShadowBox";

const GroupPage = () => {
  const { name } = useParams(); // 선택된 그룹 이름
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    // 선택된 그룹 데이터 가져오기
    const group = timeTableData.groups[name];
    if (group) {
      setGroupData(group);
    }
  }, [name]);

  // 멤버들의 시간표만 필터링하여 전달
  const filteredTimeTableData = {};
  if (groupData) {
    const { members } = groupData; // 그룹 멤버들
    members.forEach((member) => {
      filteredTimeTableData[member] = timeTableData.timeTable[member];
    });
  }

  // processData로 필터링된 데이터 처리
  const result = processData(filteredTimeTableData);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
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
              {/* 필터링된 멤버들의 시간표 데이터만 전달 */}
              <TimeTable timeTableData={result} groupName={name} />
            </ShadowBox>
          </div>
          {/* 오른쪽: FriendTable */}
          <div className="w-[30%] border-4 border-white bg-white m-2">
            <ShadowBox>
              <GroupFriendList members={groupData ? groupData.members : []} />
            </ShadowBox>
          </div>
        </div>
      </div>

      <div className="m-3">
        <ShadowBox>
          <GroupTab />
        </ShadowBox>
      </div>

      <footer className="w-full" style={{ height: "90%" }}></footer>
    </div>
  );
};

export default GroupPage;
