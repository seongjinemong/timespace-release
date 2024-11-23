import React from "react";
import TimeTable from "./pages/group/Table";
import processData from "./pages/group/processData";


const timeTableData = {
  월: [
    {name: "Math", start: 9, end: 11 },
    {name: "English", start: 11, end: 12 },
  ],
  화: [{name: "History", start: 10, end: 12 }],
  수: [{name: "Physics", start: 14, end: 16 }],
  목: [],
  금: [{name: "Chemistry", start: 13, end: 15 }],
  토: [{name: "Programming", start: 10, end: 13 }],
  일: [{name: "AI Workshop", start: 14, end: 16 }],
};

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

function App() {
  return <TimeTable timeTableData={result} />;
}

export default App;
