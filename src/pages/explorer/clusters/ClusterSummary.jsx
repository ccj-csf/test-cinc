import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import VoyagerApi from "@/api/voyager";

export default function ClusterSummary() {
  const [reload, setReload] = useState(0);
  const [cluster, setCluster] = useState([]);

  useEffect(() => {
    //const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await VoyagerApi.loadNetworkClusters();
        if (resp && resp.code === 200 && resp.success) {
          setCluster(resp.data);
        } else {
          console.log("Error: Can not get the work list data!");
          setShowTable(false);
        }
      } catch (e) {
        console.log("Exception: Failure to load the worker list data!", e);
        setShowTable(false);
      }
    };

    asyncFun();
  }, [reload]);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={2}>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">Total Clusters Payments</Typography>
              <Typography variant="subtitle" display="block">
                ${cluster.total_earnings} <br />
                <Typography variant="caption" display="block">
                  Paid
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">
                Todays Clusters Payments
              </Typography>
              <Typography variant="subtitle" display="block">
                ${cluster.today_earnings} <br />
                <Typography variant="caption" display="block">
                  Paid
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">
                Total Compute Hours Served
              </Typography>
              <Typography variant="subtitle" display="block">
                {cluster.total_compute_hours_served} <br />
                <Typography variant="caption" display="block">
                  Hours Served
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">
                Today Compute Hours Served
              </Typography>
              <Typography variant="subtitle" display="block">
                {cluster.today_compute_hours_served} <br />
                <Typography variant="caption" display="block">
                  Hours Served
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">Total Clusters Created</Typography>
              <Typography variant="subtitle" display="block">
                {cluster.total_clusters_created} <br />
                <Typography variant="caption" display="block">
                  Clusters
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
