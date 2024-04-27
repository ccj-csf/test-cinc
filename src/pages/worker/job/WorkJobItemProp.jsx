import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export default function WorkJobDetailProp({ p }) {
  return (
    <Card sx={{ backgroundColor: cardColor[600], height: 100 }}>
      <CardContent>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={8}>
            <Typography variant="subtitle2" gutterBottom>
              {p.value}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {p.label}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <AutoAwesomeMotionIcon color="primary" fontSize="large" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
