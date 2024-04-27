import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import VoyagerApi from "@/api/voyager";

export default function WorkerSummary() {
  const [reload, setReload] = useState(0);
  const [worker, setWorker] = useState([]);

  useEffect(() => {
    //const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await VoyagerApi.loadNetworkNodes();
        if (resp && resp.code === 200 && resp.success) {
          setWorker(resp.data);
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
              <Typography variant="caption">Total Worker Earnings</Typography>
              <Typography variant="subtitle" display="block">
                ${worker.total_earnings} <br />
                <Typography variant="caption" display="block">
                  Earned
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="caption">Todays Worker Earning</Typography>
              <Typography variant="subtitle" display="block">
                ${worker.today_earnings} <br />
                <Typography variant="caption" display="block">
                  Earned
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
                {worker.total_compute_hours_served} <br />
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
              <Typography variant="caption">Total Workers</Typography>
              <Typography variant="subtitle" display="block">
                {worker.total_nodes} <br />
                <Typography variant="caption" display="block">
                  Total Worker
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
