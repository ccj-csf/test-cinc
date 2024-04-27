import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Auth from "@/utils/auth";
import { useNavigateWithParams } from "@/hooks";
import VoyagerApi from "@/api/voyager";

export default function ClusterList() {
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(0);
  const [showTable, setShowTable] = useState(true);
  const { navigateWithParams } = useNavigateWithParams();

  const columns = [
    {
      field: "cluster_id",
      headerName: "ClusterId",
      type: "string",
      sortable: true,
      width: 300,
    },
    {
      field: "cluster_name",
      headerName: "Cluster Name",
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
      field: "hardware_name",
      headerName: "Hardware",
      type: "string",
      sortable: true,
      width: 300,
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
    {
      field: "percent_completed",
      headerName: "Completed (%)",
      type: "string",
      sortable: true,
      width: 200,
    },
  ];

  useEffect(() => {
    //const { id: userId } = Auth.getProfile();

    let resp = null;
    const asyncFun = async () => {
      try {
        resp = await VoyagerApi.loadClustersStatus();
        if (resp && resp.code === 200 && resp.success) {
          if (resp.data.clusters.length > 0) {
            setRows(resp.data.clusters);
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
          getRowId={(row) => row.cluster_id}
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
