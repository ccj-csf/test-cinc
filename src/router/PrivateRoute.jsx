import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { LOGIN_ROUTE } from "@/constants";
import Auth from "@/utils/auth";

const PrivateRoute = ({ children }) => {
  // 假设用户总是已登录
  // const logged = true; // 这里保持为 true，表示用户总是登录的
  const [profile, setProfile] = useState(Auth.getProfile());
  const logged = profile.email ? true : false;
  // TODO 完善的做法还需要增加一个获取当前用户信息的方法，进入每个页面之前请求一次更新用户来判断是否登录

  // 如果用户未登录，重定向到登录页面（在这个假设下不会发生）
  return logged ? <div>{children}</div> : <Navigate to={LOGIN_ROUTE} replace />;
};

export default PrivateRoute;
