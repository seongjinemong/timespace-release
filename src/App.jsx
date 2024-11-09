// Imports
// 리엑트
import { useState } from "react";
// 라우팅
import { useNavigate } from "react-router-dom";

import TimespaceButton from "./components/TimespaceButton/TimespaceButton";



function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Customized Timespace Buttons</h1>

      <h1 className="font-bold text-7xl">FORIF-REACT-2024</h1>

      {/* 기본 버튼 */}
      <TimespaceButton
        label="기본 버튼"
        onClick={() => alert('Basic Button Clicked')}
        styleType="timespace"
        style={{ marginBottom: '200px' }}
      />

      {/* 이중 테두리 스타일 버튼 */}
      <TimespaceButton
        label="이중 테두리 버튼"
        onClick={() => alert('Double Border Button Clicked')}
        styleType="timespace2"
      />

      {/* Danger 스타일 버튼 */}
      <TimespaceButton
        label="Danger 버튼"
        onClick={() => alert('Danger Button Clicked')}
        styleType="timespace3"
      />
      
    </div>
  );
}

export default App;