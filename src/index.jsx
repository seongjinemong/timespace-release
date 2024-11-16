import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot를 가져오기
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // root 노드를 생성
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
