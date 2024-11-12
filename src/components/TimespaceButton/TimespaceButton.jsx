import React from 'react';
import './TimespaceButton.css';

const TimespaceButton = ({ label, onClick, styleType = 'timespace' }) => {
  return (
    <button className={`custom-button ${styleType}`} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default TimespaceButton;