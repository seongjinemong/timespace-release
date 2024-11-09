/*
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

      
      
    </div>
  );
}

export default App;
*/
// src/App.jsx
import React from 'react';
import Header from './pages/profile/Header.jsx';
import Schedule from './pages/profile/Schedule.jsx';
import Friends from './pages/profile/Friend.jsx';
import Footer from './pages/profile/Footer.jsx';
import './pages/profile/Style.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Schedule />
        <Friends />
      </main>
      <Footer />
    </>
  );
}

export default App;
