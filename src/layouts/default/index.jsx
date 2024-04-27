import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import NewNavbar from "../HomeLayout/NewNavbar";
import NewFooter from "../HomeLayout/NewFooter";

const DefaultLayout = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-black-light min-h-screen text-white max-w-[1920px] mx-auto px-[10px] flex-column justify-start">
        <NewNavbar />
        <div>
          <Outlet />
        </div>
        {/* No footer in system <NewFooter></NewFooter> */}
      </div>
    </ThemeProvider>
  );
};

export default DefaultLayout;
