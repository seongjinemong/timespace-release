// src/pages/profile/Friends.jsx
import React from 'react';

const Friends = () => (
  <aside className="friends">
    <h2>친구</h2>
    <input type="text" placeholder="검색" />
    <ul>
      <li>조성진</li>
      <li>홍성문</li>
      <li>박현수</li>
      <li>김다연</li>
      <li>박정호</li>
    </ul>
    <div className="add-friend">
      <input type="text" placeholder="친구 추가" />
      <button>추가</button>
    </div>
  </aside>
);

export default Friends;
