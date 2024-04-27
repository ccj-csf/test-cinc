import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import HomeList from "./HomeList";
import HomeSummary from "./HomeSummary";

export default function HomeExplorer() {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Home Explorer"
        />
        <Divider />
        <CardContent>
          <HomeSummary />
        </CardContent>
        <CardContent>
          <Box sx={{ height: 400, width: "100%" }}>
            <HomeList />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
