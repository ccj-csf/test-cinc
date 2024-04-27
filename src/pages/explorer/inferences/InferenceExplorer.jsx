import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InferenceList from "./InferenceList";
import InferenceSummary from "./InferenceSummary";

export default function InferenceExplorer() {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Inference Explorer"
        />
        <Divider />
        <CardContent>
          <InferenceSummary />
        </CardContent>
        <CardContent>
          <Box sx={{ height: 400, width: "100%" }}>
            <InferenceList />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
