import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigateWithParams } from "@/hooks";
import "./index.less";

const NewNavbar = () => {
  const { goToHome, goToLogin, goToUserDashboard, goToWorker, goToExplorer } =
    useNavigateWithParams();

  return (
    <main className=" text-white  sticky top-0 z-50  flex justify-between items-center py-5">
      <div className="flex items-center">
        <img
          src="/icon.svg"
          alt="Logo"
          className="mr-10 h-7 w-[]118px] cursor-pointer"
          onClick={goToHome}
        />
        <div className="flex items-center space-x-10 ml-20">
          <span
            className="cursor-pointer hover:text-blue-500"
            onClick={goToUserDashboard}
          >
            Cosmos
          </span>
          <span
            className="cursor-pointer hover:text-blue-500"
            onClick={goToWorker}
          >
            Voyager
          </span>
          <span
            className="cursor-pointer hover:text-blue-500"
            onClick={goToExplorer}
          >
            Nexus
          </span>
        </div>
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={goToLogin}
          sx={{ borderRadius: "25px" }}
        >
          Sign Up
        </Button>
      </div>
    </main>
  );
};

export default NewNavbar;
