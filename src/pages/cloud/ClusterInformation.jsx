import { Box, Grid, Stack } from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _ from 'lodash-es';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { height } from "@mui/system";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ClusterInformation() {
  // const cluster_id_in_path = useParams();
  const { state } = useLocation();
  if (_.isUndefined(state)) {
    return <h1>No Cluster Info found!</h1>
  }

  const info = { ...state };
  const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '4px', transform: 'scale(1)', color: 'green' }}>
      •
    </Box>
  );

  const labelStyle = 'text-gray-dark text-xl ml-5';
  const valueStyle = 'text-gray-light text-2xl ml-3'
  const rowStyle = 'mt-3 mb-3';

  const cardInStackSizeSM = { width: '20rem', height: 160, maxHeight: 300 };
  const cardInStackSizeMD = { width: '30rem', height: 200, maxHeight: 400 };
  const cardInStackSizeLG = { width: '40rem', height: 300, maxHeight: 500 };
  const cardLabelStyle = `text-gray-dark text-xl my-2`;
  const cardValueStyle = `text-gray-light text-2xl my-2`;

  const gridCommonStyle = {
    container: true,
    direction: "row",
    columnSpacing: 1,
    rowSpacing: 1,
    sx: { marginTop: 2 },
    justifyContent: "space-flex-start",
    // justifyContent: 'space-around',
  };
  return (

    <div className='pt-5 overflow-hidden'>
      <div style={{ height: 'calc(100vh - 300px)' }} className="relative overflow-auto p-2">
        <div>
          <div className="mt-10 mb-5">
            <span className="ml-3 text-3xl gray-light">Cluster Name</span> <span className="text-3xl text-gray-100 ml-5">{info.cluster_name}</span>
          </div>
        </div>
        <div className="mt-10">
          {/* =======================Cluster General Info======================= */}
          <Box>
            <Stack spacing={2} direction='column'>
              <Card variant="outlined">
                <CardContent>
                  <div className=" text-green-300 text-lg">
                    Running for : {(_.isEmpty(info.running_for) ? '0h 0m' : info.running_for)}<br />
                  </div>
                  <div className={rowStyle}>
                    {bull} <span className="text-green-500">Live</span>
                    <span className={labelStyle}>Cluster ID:</span> <span className={valueStyle}>{info.cluster_id}</span>
                  </div>
                  <div className={rowStyle}>
                    <span className={labelStyle}>Cluster hours served:</span> <span className={valueStyle}>25 Hours</span>
                    <span className={labelStyle}>Computed hours remaining:</span> <span className={valueStyle}>30 Hours</span>
                    <div className="ml-5 mt-5 max-w-10xl">
                      <LinearProgress variant="determinate" value={67} />
                      <span className="text-gray-dark text-2xl ml-1">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Stack >
          </Box >
          {/* =======================Cluster Card small 4 cards======================= */}
          <Grid {...gridCommonStyle} columnSpacing={3}>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeSM }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Cluster Started
                  </div>
                  <div className={cardValueStyle}>
                    {info.started_at}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeSM }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Cluster Ended
                  </div>
                  <div className={cardValueStyle}>
                    -
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeSM }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Paid
                  </div>
                  <div className={cardValueStyle}>
                    $666
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeSM }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Refound
                  </div>
                  <div className={cardValueStyle}>
                    $888
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid >
          {/* =======================Cluster Card 3 medium cards======================= */}
          < Grid {...gridCommonStyle}>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Connectivity Tier: <span className="text-gray-light text-20">{info.band_width_level_name}</span>
                  </div>
                  <div className={cardValueStyle}>
                    {info.download_speed_mbps} mbp/s
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {info.upload_speed_mbps} mbp/s
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Cluster Purpose
                  </div>
                  <div className={cardValueStyle}>
                    {info.service_name}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Security Compliance
                  </div>
                  <div className={cardValueStyle}>
                    {info.security_compliance}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Cluster Dashboard
                  </div>
                  <div className={cardValueStyle}>
                    $888
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Service name
                  </div>
                  <div className={cardValueStyle}>
                    $888
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeMD }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    Service name$$$
                  </div>
                  <div className={cardValueStyle}>
                    $888
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid >

          {/* =======================Workers Search bar======================= */}
          < Stack direction="column" className='mt-5' >
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <div className={cardLabelStyle}>
                  Worker
                </div>
                <Typography variant="h5" component="div">
                  <Autocomplete
                    id="grouped-demo"
                    options={["work1, work2,work3"]}
                    // groupBy={}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Search..." />}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Stack >

          {/* =======================Workers Card======================= */}
          < Grid {...gridCommonStyle}>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeLG }}>
                <CardContent>
                  <div className={cardLabelStyle}>
                    IO Worker 1
                  </div>
                  <div className={cardValueStyle}>
                    {info.status}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" sx={{ ...cardInStackSizeLG }}>
                <CardContent >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    IO Worker 2
                  </Typography>
                  <Typography variant="h5" component="div">
                    {info.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid >
        </div>

      </div>
    </div>
  );
}

export default ClusterInformation;
