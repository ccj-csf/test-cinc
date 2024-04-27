import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WorkerJobItem from "./WorkerJobItem";
import WorkerApi from "@/api/nexus";

export default function WorkerJobs({ w }) {
  const [workerJobs, setWorkerJobs] = useState({});
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await WorkerApi.loadNodeJobs(w.node_id);
        if (resp && resp.code === 200 && resp.success) {
          setShowContent(true);
          setWorkerJobs(resp.data);
        } else {
          console.log("Error: Can not get the work list data!");
          setShowContent(false);
        }
      } catch (e) {
        console.log("Exception: Failure to load the worker list data!", e);
        setShowContent(false);
      }
    };

    asyncFun();
  }, []);

  const jobs = workerJobs.jobs;
  return (
    <Container maxWidth="xl">
      {showContent ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Jobs
            </Typography>
          </Grid>

          {jobs.map((job, index) => {
            return (
              <Grid item key={job.for} xs={12}>
                <WorkerJobItem job={job} index={index + 1} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h1>There is not work list data</h1>
      )}
    </Container>
  );
}
