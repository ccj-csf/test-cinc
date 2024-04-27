import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  CLUSTER_ROUTE,
  WORKER_ROUTE,
} from "@/constants";

export default function MainNav() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Container maxWidth="sm">
      <Stack
        spacing={{ xs: 1, sm: 1 }}
        direction="column"
        useFlexGap
        flexWrap="wrap"
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link}
          to={CLUSTER_ROUTE}
        >
          <ListItemIcon>
            <FilterDramaIcon />
          </ListItemIcon>
          <ListItemText primary="Clusters" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          component={Link}
          to={WORKER_ROUTE}
        >
          <ListItemIcon>
            <InstallDesktopIcon />
          </ListItemIcon>
          <ListItemText primary="Workers" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          component={Link}
          to={LOGIN_ROUTE}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemButton>
      </Stack>
    </Container>
  );
}
