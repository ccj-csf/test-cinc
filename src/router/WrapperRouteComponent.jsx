import React, { useEffect } from "react";
import PrivateRoute from "./PrivateRoute";

const WrapperRouteComponent = ({ auth, title, children }) => {
  useEffect(() => {
    document.title = title; // 设置文档标题为传入的标题
  }, [title]); // 依赖列表中的 title 确保只在 title 改变时更新
  if (auth) {
    return <PrivateRoute>{children}</PrivateRoute>;
  }
  return <>{children}</>;
};

export default WrapperRouteComponent;
