import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NewNavbar from "./NewNavbar";
import NewFooter from "./NewFooter";
const HomeLayout = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="bg-black min-h-screen text-white max-w-[1920px]  mx-auto px-[120px]">
        <NewNavbar></NewNavbar>
        <div style={{ minHeight: "calc(100vh - 210.5px)" }}>
          <Outlet />
        </div>
        <NewFooter></NewFooter>
      </div>
    </ThemeProvider>
  );
};
export default HomeLayout;
