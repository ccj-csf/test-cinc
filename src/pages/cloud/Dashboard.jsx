import { useState } from "react";
import { Box, Button, Card, Paper, Skeleton, Stack, CardActionArea, CardActions, Container } from "@mui/material";

import ClusterCreateBtnGrp from "@/components/cosmos/ClusterCreateBtnGrp";
import { useCallback } from "react";
import ClusterCreateModal from "@/components/cosmos/ClusterCreateModal";
import UserClusters from "./UserClusters";

function Dashboard() {
  const [createClusterModalOpen, setCreateClusterModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setCreateClusterModalOpen((isOpen) => !isOpen);
  }, [createClusterModalOpen]);

  return (
    <>
      <div className="mx-auto w-48 h-12 py-10 text-3xl text-white-light">
        Deploy a cluter
      </div>
      <Stack>
        <ClusterCreateBtnGrp buttonCallBack={toggleModal} />
        {/* <UserClusters /> */}
      </Stack>

      {
        createClusterModalOpen && <ClusterCreateModal isOpen={createClusterModalOpen} onCloseModal={toggleModal} />
      }
    </>
  );
}
export default Dashboard;
