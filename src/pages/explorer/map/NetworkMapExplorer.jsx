import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

export default function NetworkMapExplorer() {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader subheader="Manage the notifications" title="Network Map" />
        <Divider />
        <CardContent>
          <img src="/world.svg" style={{ width: "100%", height: "100%" }} />
        </CardContent>
      </Card>
    </Container>
  );
}
