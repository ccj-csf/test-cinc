import React from "react";
import "./index.css";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 z-50 right-0 bottom-0">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
