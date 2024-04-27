import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WorkerServicesItem from "./WorkerServicesItem";
import WorkerApi from "@/api/nexus";

export default function WorkerServices({ w }) {
  const [workerServices, setWorkerServices] = useState({});
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await WorkerApi.loadNodeServices(w.node_id);
        if (resp && resp.code === 200 && resp.success) {
          setShowContent(true);
          setWorkerServices(resp.data);
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

  let services = [];
  services.push(workerServices);

  console.log("worker services", services);
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
              Services
            </Typography>
          </Grid>

          {services.map((service, index) => {
            return (
              <Grid item key={index} xs={4}>
                <WorkerServicesItem service={service} />
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
