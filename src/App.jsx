import { BrowserRouter } from "react-router-dom";
import { RenderRouter } from "@/router";
import { MessageProvider } from "@/hooks/useMessage";
import { ErrorBoundary } from "@/biz-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.less";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <MessageProvider>
        {/* <ErrorBoundary> */}
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
        {/* </ErrorBoundary> */}
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;
