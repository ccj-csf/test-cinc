import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useNavigateWithParams } from "@/hooks";
import { Outlet } from "react-router-dom";

export default function WorkerLayout() {
  const { goToWorkerCreate } = useNavigateWithParams();

  const handleClick = (event, index) => {
    goToWorkerCreate();
  };

  return (
    <Container maxWidth="lg">
      <Stack
        spacing={{ xs: 12, sm: 6 }}
        direction="column"
        useFlexGap
        flexWrap="wrap"
      >
        <Box width={1} height={1}>
          <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={handleClick}
            >
              Connect New Worker
            </Button>
          </Box>
          <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
            <Outlet />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
