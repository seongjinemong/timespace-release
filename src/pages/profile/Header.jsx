// src/pages/profile/Header.jsx
import React from 'react';
import TimespaceButton from '../../components/TimespaceButton/TimespaceButton.jsx'

const Header = () => (
  <header>
    <h1>시공간</h1>
    <nav>
        <header>
        <nav>
            <TimespaceButton
            label="시간표 수정"
            onClick={() => alert('Basic Button Clicked')}
            styleType="timespace"/>
            <TimespaceButton
                label="마이 페이지"
                onClick={() => alert('Basic Button Clicked')}
                styleType="timespace"
            />
        </nav>
        </header>
    </nav>
    <div className="user-info">
    <span>유저이름</span>
    <TimespaceButton
                label="로그아웃"
                onClick={() => alert('Basic Button Clicked')}
                styleType="timespace"
            />
    </div>
  </header>
);

export default Header;
