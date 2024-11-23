import React from 'react';

const TimespaceButton = ({ label, onClick, styleType = 'timespace' }) => {
  let buttonClass = '';

  switch (styleType) {
    case 'timespace':
      buttonClass = `
        px-4 py-2 text-lg font-bold text-[#2d4856] 
        border-2 border-[#2d4856] bg-white 
        rounded-md shadow-md transition-all duration-200 ease-in-out 
        hover:shadow-lg hover:-translate-y-1 active:translate-y-1 active:shadow-none
      `;
      break;
    case 'timespace2':
      buttonClass = `
        px-4 py-2 text-lg font-bold text-[#2d4856] 
        border-4 border-[#2d4856] bg-white 
        rounded-md shadow-md transition-all duration-200 ease-in-out 
        hover:-translate-y-1 hover:shadow-[0_5px_0_0_#2d4856]
      `;
      break;
    case 'timespace3':
      buttonClass = `
        relative px-4 py-2 text-lg font-bold text-[#2d4856] 
        border-2 border-[#2d4856] bg-white 
        rounded-md shadow-md overflow-hidden transition-all duration-400 ease-in-out 
        hover:shadow-lg hover:text-[#2d4856] active:translate-y-1 active:shadow-none
      `;
      break;
    default:
      buttonClass = `
        px-4 py-2 text-lg font-bold text-white bg-blue-500 
        rounded-md transition-all duration-200 ease-in-out 
        hover:bg-blue-600 active:bg-blue-700
      `;
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default TimespaceButton;
