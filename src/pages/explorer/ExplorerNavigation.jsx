import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  EXPLORER_ROUTE,
  EXPLORER_NETWORK_ROUTE,
  EXPLORER_CLUSTERS_ROUTE,
  EXPLORER_WORKERS_ROUTE,
} from "@/constants";
import { useNavigateWithParams } from "@/hooks";

export default function ExplorerNavigation() {
  const [value, setValue] = React.useState(0);
  const { navigateWithParams } = useNavigateWithParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigateWithParams(EXPLORER_ROUTE);
        break;
      case 1:
        navigateWithParams(EXPLORER_NETWORK_ROUTE);
        break;
      case 2:
        navigateWithParams(EXPLORER_CLUSTERS_ROUTE);
        break;
      case 3:
        navigateWithParams(EXPLORER_WORKERS_ROUTE);
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
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Home" sx={{ minHeight: "56px" }} />
        <Tab label="Network Map" sx={{ minHeight: "56px" }} />
        <Tab label="Clusters" sx={{ minHeight: "56px" }} />
        <Tab label="Workers" sx={{ minHeight: "56px" }} />
      </Tabs>
    </Box>
  );
}
