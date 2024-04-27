import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ClusterList from "./ClusterList";
import ClusterSummary from "./ClusterSummary";

export default function ClusterExplorer() {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Cluster Explorer"
        />
        <Divider />
        <CardContent>
          <ClusterSummary />
        </CardContent>
        <CardContent>
          <Box sx={{ height: 400, width: "100%" }}>
            <ClusterList />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
