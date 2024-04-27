import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function WorkServicesItem({ service }) {
  console.log("service", service);
  return (
    <Card sx={{ backgroundColor: cardColor[700] }}>
      <CardContent>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={10}>
            <GridViewSharpIcon color="primary" fontSize="large" />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" gutterBottom>
              {service.is_running ? (
                <ChangeCircleIcon color="primary" />
              ) : (
                <CancelIcon color="primary" />
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              {service.name}
            </Typography>
            <Typography variant="caption" gutterBottom>
              Status: {service.status}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
