import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blueGrey as cardColor } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import WorkJobItemProp from "./WorkJobItemProp";

export default function WorkerJobsItem({ job, index }) {
  function getJobProps(job) {
    const jobProps = [
      {
        key: "status",
        label: "Status",
        value: job && job.status ? job.status : "--",
      },
      {
        key: "start_time",
        label: "Start",
        value: job && job.start_time ? job.start_time : "--",
      },
      {
        key: "end_time",
        label: "End",
        value: job && job.end_time ? job.end_time : "--",
      },
      {
        key: "compute_hours_hired",
        label: "Compute Hours Hired",
        value: job && job.compute_hours_hired ? job.compute_hours_hired : "--",
      },
      {
        key: "compute_hours_served",
        label: "Compute Hours Served",
        value:
          job && job.compute_hours_served ? job.compute_hours_served : "--",
      },
      {
        key: "total_hire rate",
        label: "Total Hire Rate",
        value: job && job.total_hire ? job.total_hire : "--",
      },
      {
        key: "earned",
        label: "Earned",
        value: job && job.earned ? job.earned : "--",
        url:
          job && job.earning_claim_txid_url ? job.earning_claim_txid_url : "--",
      },
      {
        key: "slashed",
        label: "Slashed",
        value: job && job.slashed ? job.slashed : "--",
      },
    ];
    return jobProps;
  }
  const jobProps = getJobProps(job);
  console.log("job", job);
  console.log("jobProps", jobProps);

  return (
    <Card sx={{ backgroundColor: cardColor[700] }}>
      <CardContent>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Compute Job ID: {index}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              For: {job.for}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Job Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" align="left">
              Uptime Percentage
            </Typography>
            <Typography variant="caption" display="block" align="right">
              {job.uptime_percent}%
            </Typography>
            <LinearProgress variant="determinate" value={100} />
          </Grid>
          {jobProps.map((prop) => {
            return (
              <Grid item key={prop.key} xs={3}>
                <WorkJobItemProp p={prop} />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
