import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CLUSTER_ROUTE } from "@/constants";
import { useNavigateWithParams } from "@/hooks";

export default function CloudNavigation() {
  const [value, setValue] = React.useState(0);
  const { goToUserDashboard, goClusters } = useNavigateWithParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        goToUserDashboard();
        break;
      case 1:
        goClusters();
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 3, display: "flex", height: "100%" }} className="mt-10">
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
      >
        <Tab label="Home" sx={{ minHeight: "56px" }} />
        <Tab label="Clusters" sx={{ minHeight: "56px" }} />
        <Tab label="MegaClusters" sx={{ minHeight: "56px" }} />
        <Tab label="Kubernetes" sx={{ minHeight: "56px" }} />
      </Tabs>
    </Box>
  );
}
