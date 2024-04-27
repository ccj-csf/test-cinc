import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Auth from "@/utils/auth";
import { useNavigateWithParams } from "@/hooks";
import VoyagerApi from "@/api/voyager";

export default function HomeList() {
  const [reload, setReload] = useState(0);
  const { navigateWithParams } = useNavigateWithParams();

  const [rows, setRows] = useState([]);
  const [showTable, setShowTable] = useState(true);

  const columns = [
    {
      field: "brand_name",
      headerName: "Brand",
      type: "string",
      sortable: true,
      width: 200,
    },
    {
      field: "hardware_name",
      headerName: "Hardware",
      type: "string",
      sortable: true,
      width: 200,
    },
    {
      field: "total",
      headerName: "Quantity",
      type: "string",
      sortable: true,
    },
    {
      field: "price",
      headerName: "Price ($/Hour)",
      type: "string",
      sortable: true,
    },
    {
      field: "busy_percent",
      headerName: "Busy (%)",
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
        resp = await VoyagerApi.loadNetworkMarketSnapshot();
        if (resp && resp.code === 200 && resp.success) {
          if (resp.data.length > 0) {
            setRows(resp.data);
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
          getRowId={(row) => row.id}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[5, 100]}
          onRowClick={handleRowClick}
        />
      ) : (
        <h1>There is not work list data</h1>
      )}
    </Box>
  );
}
