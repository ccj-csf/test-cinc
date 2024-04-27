import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { WORKER_ROUTE, WORKER_CREATE } from "@/constants";
import { useNavigateWithParams } from "@/hooks";

export default function WorkerNavigation() {
  const [value, setValue] = React.useState(0);
  const { navigateWithParams } = useNavigateWithParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigateWithParams(WORKER_ROUTE);
        break;
      case 1:
        navigateWithParams(WORKER_CREATE);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{ flexGrow: 3, display: "flex", height: "auto" }}
      className="mt-20"
    >
      <Tabs
        orientation="vertical"
        value={value}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label="Workers"
          sx={{ minHeight: "56px" }}
          onClick={() => navigateWithParams(WORKER_ROUTE)}
        />
      </Tabs>
    </Box>
  );
}
