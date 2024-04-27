import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import WorkerList from "./WorkerList";
import WorkerSummary from "./WorkerSummary";

export default function WorkerExplorer() {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Worker Explorer"
        />
        <Divider />
        <CardContent>
          <WorkerSummary />
        </CardContent>
        <CardContent>
          <Box sx={{ height: 400, width: "100%" }}>
            <WorkerList />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
