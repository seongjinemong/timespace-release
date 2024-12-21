import React from "react";

const ShadowBox = ({
  children,
  className = "",
  width = "w-full",
  padding = "p-2",
}) => {
  return (
    <div className={`relative ${width} ${className}`}>
      <div className="absolute -inset-x-1 -top-1 -bottom-2 bg-seagull-900 rounded-lg shadow-lg"></div>
      <div className={`relative bg-white rounded-lg ${padding}`}>
        {children}
      </div>
    </div>
  );
};

export default ShadowBox;
