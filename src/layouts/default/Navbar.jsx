import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  CLOUD_ROUTE,
  EXPLORER_ROUTE,
  WORKER_ROUTE,
  LOGIN_ROUTE,
} from "@/constants";
import { useNavigateWithParams } from "@/hooks";

export default function Navbar() {
  const { navigateWithParams } = useNavigateWithParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBtnClick = (key) => {
    switch (key) {
      case "cloud":
        navigateWithParams(CLOUD_ROUTE);
        break;
      case "explorer":
        navigateWithParams(EXPLORER_ROUTE);
        break;
      case "worker":
        navigateWithParams(WORKER_ROUTE);
        break;
      case "login":
        navigateWithParams(LOGIN_ROUTE);
        break;
      default:
        break;
    }
  };

  return (
    <div className=" text-white  sticky top-0 z-50 bg-[#090B0E]">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <img src="/icon.svg" alt="Logo" className="mr-10 h-7 w-[]118px]" />
        </div>

        <div className="flex items-center space-x-10">
          <div className="relative">
            <button
              className="hover:text-blue-500 focus:outline-none menu"
              onClick={() => handleBtnClick("cloud")}
            >
              Cosmos
            </button>
          </div>

          <div className="relative">
            <button
              className="hover:text-blue-500 focus:outline-none menu"
              onClick={() => handleBtnClick("explorer")}
            >
              Voyager
            </button>
          </div>

          <div className="relative">
            <button
              className="hover:text-blue-500 focus:outline-none menu"
              onClick={() => handleBtnClick("worker")}
            >
              Nexus
            </button>
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            sx={{ borderRadius: "25px" }}
            onClick={() => handleBtnClick("login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
