import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { blueGrey as cardColor } from "@mui/material/colors";

export default function WorkerStatus({ w }) {
  const C_HEIGHT = 180;

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={3}>
          <Card sx={{ backgroundColor: cardColor[700], height: 140 }}>
            <CardContent>
              <Grid container spacing={{ xs: 1, md: 1 }} height={120}>
                <Grid item xs={12}>
                  <Typography variant="subtitle">Reputation Score</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption">Uptime Percent</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Gauge
                    width={200}
                    height={80}
                    value={100 - w.down_percentage}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                        transform: "translate(0px, 0px)",
                      },
                    }}
                    text={({ value, valueMax }) => `${value}%`}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ backgroundColor: cardColor[700], height: 140 }}>
            <CardContent>
              <Grid container spacing={{ xs: 4, md: 4 }}>
                <Grid item xs={12}>
                  <Typography variant="caption">Traffic Transmitted</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle" display="block">
                    {w.download_speed_mbps} mb/s
                  </Typography>
                  <Typography variant="caption">Download</Typography>
                  <DownloadIcon color="primary" fontSize="small" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle" display="block">
                    {w.upload_speed_mbps} mb/s
                  </Typography>
                  <Typography variant="caption">Upload</Typography>
                  <UploadIcon color="primary" fontSize="small" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ backgroundColor: cardColor[700], height: 140 }}>
            <CardContent>
              <Grid container spacing={{ xs: 4, md: 4 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle">
                    Connectivity Tier: {w.band_with_level_name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle" display="block">
                    {w.busy_percent} GB/s
                  </Typography>
                  <Typography variant="caption">Inbound</Typography>
                  <DownloadIcon color="primary" fontSize="small" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle" display="block">
                    {w.down_percentage} GB/s
                  </Typography>
                  <Typography variant="caption">Outbound</Typography>
                  <UploadIcon color="primary" fontSize="small" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ backgroundColor: cardColor[700], height: 140 }}>
            <CardContent>
              <Grid container spacing={{ xs: 2, md: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle">
                    Security Compliance
                  </Typography>
                </Grid>
                {/*
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  sx={{ width: 1 }}
                >
                  <Typography variant="caption">SOC2/HIPAA</Typography>
                </Button>
              </Grid>
              */}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<LockIcon />}
                    sx={{ width: 1 }}
                  >
                    <Typography variant="caption">
                      End-to-End Encrypted
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
