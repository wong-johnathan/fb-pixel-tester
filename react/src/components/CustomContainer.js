import React from "react";

const CustomContainer = ({ children }) => {
  return (
    <div
      style={{ backgroundColor: "#f8f8f8", border: "1px #d9d9d9 solid" }}
      className="mt-4"
    >
      {children}
    </div>
  );
};

export default CustomContainer;
