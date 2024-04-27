import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import WorkerApi from "@/api/nexus";
import Auth from "@/utils/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { WORKER_CREATE_ROUTE } from "@/constants";
import { useNavigateWithParams } from "@/hooks";

export default function WorkerList() {
  const [reload, setReload] = useState(0);
  const { goToWorkerDetail, navigateWithParams } = useNavigateWithParams();

  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(true);

  const [nodeInfo, setNodeInfo] = useState({});
  const [open, setOpen] = React.useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

  const columns = [
    {
      field: "node_id",
      headerName: "NodeId",
      type: "string",
      sortable: true,
      width: 200,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      sortable: true,
    },
    {
      field: "is_working",
      headerName: "Working",
      type: "string",
      sortable: true,
    },
    {
      field: "hardware_name",
      headerName: "Hardware",
      type: "string",
      sortable: true,
      width: 200,
    },

    {
      field: "hardware_quantity",
      headerName: "Hardware Quantity",
      type: "string",
      sortable: true,
    },
    {
      field: "brand_name",
      headerName: "Brand",
      type: "string",
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DriveFileRenameOutlineIcon />}
          label="Rename"
          onClick={() => {
            renameWorker(params.id, params.row.name);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteWorker(params.id, params.row.name);
          }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<IndeterminateCheckBoxIcon />}
          label="Terminate"
          onClick={() => {
            terminateWorker(params.id, params.row.name);
          }}
          showInMenu
        />,
      ],
    },
  ];

  function renameWorker(node_id, node_name) {
    setNodeInfo({ nodeId: node_id, nodeName: node_name });
    handleDialogOpen();
  }
  function terminateWorker(node_id, node_name) {
    setNodeInfo({ nodeId: node_id, nodeName: node_name });
    _execute("t", node_id);
  }

  function deleteWorker(node_id, node_name) {
    setNodeInfo({ nodeId: node_id, nodeName: node_name });
    handleDeleteDialogOpen();
  }

  function _execute(action, node_id, node_name) {
    console.log(" [Execute]", action, node_id, node_name);

    const asyncFun = async () => {
      let resp = null;
      try {
        switch (action) {
          case "r":
            resp = await WorkerApi.nodeRename(node_id, node_name);
            break;
          case "t":
            resp = await WorkerApi.nodeTerminate(node_id);
            break;
          case "d":
            resp = await WorkerApi.nodeDelete(node_id);
            break;
        }

        if (resp && resp.code === 200 && resp.success) {
          setReload(reload + 1);
        } else {
          console.log("Error: Can not delete the worker!");
          setShowTable(false);
        }
      } catch (e) {
        console.log("Exception: Failure to delete the worker!", e);
      }
    };

    asyncFun();
  }

  useEffect(() => {
    const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await WorkerApi.loadUserNodes(userId);
        if (resp && resp.code === 200 && resp.success) {
          if (resp.data.nodes.length > 0) {
            setRows(resp.data.nodes);
          } else {
            console.log("There is not data!");
            setShowTable(false);
          }
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

  const handleRowClick = (params) => {
    const data = params.row;
    goToWorkerDetail(data.node_id);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSubmit = (node_id, node_name) => {
    _execute("r", node_id, node_name);
    handleDialogClose();
  };

  const handleDeleteDialogOpen = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteDialogSubmit = (node_id) => {
    _execute("d", node_id);
    handleDeleteDialogClose();
  };

  const handleCreateBtnClick = () => {
    navigateWithParams(WORKER_CREATE_ROUTE);
  };
  return (
    <Container maxWidth="xl">
      <Box display="flex" sx={{ justifyContent: "right" }}>
        <Button variant="outlined" onClick={handleCreateBtnClick}>
          Connect new worker
        </Button>
      </Box>
      <Card>
        <CardHeader subheader="Manage the notifications" title="Workers" />
        <Divider />
        <CardContent>
          <Box sx={{ height: 400, width: "100%" }}>
            {showTable ? (
              <DataGrid
                getRowId={(row) => row.node_id}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 20 },
                  },
                }}
                pageSizeOptions={[5, 20]}
                checkboxSelection
                onRowClick={handleRowClick}
              />
            ) : (
              <h1>There is not work list data</h1>
            )}
          </Box>
          <Dialog
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const name = formJson.name;
                handleDialogSubmit(nodeInfo.nodeId, name);
              },
            }}
          >
            <DialogTitle>Rename Device Name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To change the device name, please enter the new device name
                here.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label={nodeInfo.nodeName}
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={showDeleteAlert}
            onClose={handleDeleteDialogClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                handleDeleteDialogSubmit(nodeInfo.nodeId);
              },
            }}
          >
            <DialogTitle>Delete Device Name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete this device?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Container>
  );
}
