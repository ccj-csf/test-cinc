import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 z-50 right-0 bottom-0">
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 34, color: "#d9d9d9" }} spin />
        }
      />
    </div>
  );
};

export default Loading;
