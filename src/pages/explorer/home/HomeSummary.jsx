import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import VoyagerApi from "@/api/voyager";

export default function HomeSummary() {
  const [reload, setReload] = useState(0);
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    //const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await VoyagerApi.loadNetworkInfo();
        if (resp && resp.code === 200 && resp.success) {
          setNetworks(resp.data);
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
        {networks.map((network) => {
          return (
            <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
              <CardContent>
                <Stack spacing={4}>
                  <Typography variant="subtitle">
                    {network.name.toUpperCase()}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle" display="block">
                      {network.total_gpu} <br />
                      <Typography variant="caption" display="block">
                        Total GPUs
                      </Typography>
                    </Typography>
                    <Typography variant="subtitle" display="block">
                      {network.total_cpu} <br />
                      <Typography variant="caption" display="block">
                        Total CPUs
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="subtitle">Render Network</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="subtitle" display="block">
                  23651 <br />
                  <Typography variant="caption" display="block">
                    Total GPUs
                  </Typography>
                </Typography>
                <Typography variant="subtitle" display="block">
                  1006 <br />
                  <Typography variant="caption" display="block">
                    Total CPUs
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: cardColor[700], minWidth: 200 }}>
          <CardContent>
            <Stack spacing={4}>
              <Typography variant="subtitle">Filecoin</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="subtitle" display="block">
                  1024 <br />
                  <Typography variant="caption" display="block">
                    Total GPUs
                  </Typography>
                </Typography>
                <Typography variant="subtitle" display="block">
                  1024 <br />
                  <Typography variant="caption" display="block">
                    Total CPUs
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
