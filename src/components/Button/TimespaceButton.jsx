import React from 'react';
import './TimespaceButton.css'; // Make sure to save the CSS below in CustomButton.css

function TimespaceButton({ text, onClick }) {
  return (
    <button onClick={onClick} className="custom-button timespace">
      {text}
    </button>
  );
}

export default TimespaceButton;
