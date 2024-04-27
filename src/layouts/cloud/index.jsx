import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import TopNavbar from "../default/Navbar";
import CloudNavigation from "@/pages/cloud/CloudNavigation";
const CloudLayout = () => {
  return (
    <div className="m-1 py-2 flex overflow-hidden" style={{ height: 'calc(100vh - 90px)' }}>
      {/* <h1>Cluster Main Content</h1> */}
      <div className="flex-none p-5 w-1/6">
        <CloudNavigation />
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default CloudLayout;
