import React from "react";

const ShadowBox = ({
  children,
  className = "",
  width = "w-full",
  padding = "p-4",
}) => {
  return (
    <div className={`relative ${width} ${className}`}>
      <div className="absolute -inset-x-0.5 -top-0.5 -bottom-2 bg-seagull-500 rounded-lg shadow-lg"></div>
      <div className={`relative bg-white rounded-lg ${padding}`}>
        {children}
      </div>
    </div>
  );
};

export default ShadowBox;
