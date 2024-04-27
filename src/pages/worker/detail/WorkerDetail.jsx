import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import WorkerInfo from "./WorkerInfo";
import WorkerStatus from "./WorkerStatus";
import WorkerJobs from "../job/WorkerJobs";
import WorkerServices from "../service/WorkerServices";
import WorkerApi from "@/api/nexus";

export default function WorkerDetail() {
  const [workerInfo, setWorkerInfo] = useState({});
  const [showContent, setShowContent] = useState(false);
  const params = useParams();

  useEffect(() => {
    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await WorkerApi.loadNodeDetails(params.id);
        if (resp && resp.code === 200 && resp.success) {
          setShowContent(true);
          setWorkerInfo(resp.data);
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

  return (
    <Container maxWidth="lg">
      {showContent ? (
        <Stack
          spacing={{ xs: 12, sm: 6 }}
          direction="column"
          useFlexGap
          flexWrap="wrap"
        >
          <WorkerInfo w={workerInfo} />
          <WorkerStatus w={workerInfo} />
          <WorkerServices w={workerInfo} />
          <WorkerJobs w={workerInfo} />
        </Stack>
      ) : (
        <h1>There is not work list data</h1>
      )}
    </Container>
  );
}
