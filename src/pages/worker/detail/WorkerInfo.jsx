import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { blueGrey as cardColor } from "@mui/material/colors";

export default function WorkerInfo({ w }) {
  console.log("worker", w);
  return (
    <Container maxWidth="xl">
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title={`Device Name ${w.name}`}
        />
        <Divider />
        <CardContent sx={{ backgroundColor: cardColor[900] }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="subtitle2" gutterBottom>
                Device ID: {w.node_id}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Status: {w.status} <br />
                Location: {w.location_name}, OS: {w.operating_system} <br />
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ fontSize: 10, textAlign: "left" }}>
              <Typography variant="caption" display="block" align="right">
                {w.device_type.toUpperCase()}, {w.brand_name} <br />x
                {w.hardware_quantity} {w.hardware_name}
              </Typography>
              <img src={w.brand_icon} style={{ float: "right" }} />
            </Grid>

            <Grid item xs={12} sx={{ fontSize: 10, textAlign: "right" }}>
              <Typography variant="caption" display="block" align="right">
                {100 - w.down_percentage}% Uptime
              </Typography>
              <LinearProgress
                variant="determinate"
                value={100 - w.down_percentage}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
