import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Auth from "@/utils/auth";
import { useNavigateWithParams } from "@/hooks";
import VoyagerApi from "@/api/voyager";

export default function InferenceList() {
  const [reload, setReload] = useState(0);
  const { navigateWithParams } = useNavigateWithParams();

  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(true);

  const columns = [
    {
      field: "node_id",
      headerName: "NodeId",
      type: "string",
      sortable: true,
      width: 300,
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
      headerName: "Quantity",
      type: "string",
      sortable: true,
    },
    {
      field: "brand_name",
      headerName: "Brand",
      type: "string",
      sortable: true,
    },
  ];

  useEffect(() => {
    //const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await VoyagerApi.loadNodesStatus();
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
    //goToWorkerDetail(data.node_id);
  };

  return (
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
          onRowClick={handleRowClick}
        />
      ) : (
        <h1>There is not work list data</h1>
      )}
    </Box>
  );
}
