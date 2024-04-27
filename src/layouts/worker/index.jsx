import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Outlet } from "react-router-dom";
import WorkerNavigation from "@/pages/worker/WorkerNavigation";

const WorkerLayout = () => {
  return (
    <Card width={1} height={1}>
      <CardContent width={1} height={1}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <WorkerNavigation />
          </Grid>
          <Grid item xs={10}>
            <Outlet />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WorkerLayout;
