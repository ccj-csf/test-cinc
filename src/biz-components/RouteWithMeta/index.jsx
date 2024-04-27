// RouteWithMeta.js
import React, { useEffect } from "react";
import { Route } from "react-router-dom";

const RouteWithMeta = ({ title, ...routeProps }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <Route {...routeProps} />;
};

export default RouteWithMeta;
