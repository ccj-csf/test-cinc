import { useState } from "react";
import { isEmpty } from "@/utils";
import { Box, Button, Card, Paper, Skeleton, Stack, CardActionArea, CardActions, Container } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { VoyagerApiInstance, CosmosApiInstance } from "@/api";
import ClusterTable from "./ClusterTable";
import ClusterCreateBtnGrp from "@/components/cosmos/ClusterCreateBtnGrp";
import { useCallback } from "react";
import ClusterCreateModal from "@/components/cosmos/ClusterCreateModal";
import { useEffect } from "react";


const columns = [
  {
    id: 'cluster_id',
    label: 'cluster_id',
  }, {
    id: 'cluster_name',
    label: 'cluster_name',
  }, {
    id: 'hardware_name',
    label: 'hardware_name',
  }, {
    id: 'is_mega_cluster',
    label: 'is_mega_cluster',
  },
  {
    id: 'status',
    label: 'status',
  }
];

function Clusters() {

  const [loading, setLoading] = useState(false);
  const [clusters, setCluster] = useState([]);
  const [deviceBrands, setDeviceBrands] = useState([]);
  const [createClusterModalOpen, setCreateClusterModalOpen] = useState(false);
  const [page, setPage] = useState({
    number: 0,
    size: 10,
    sizeOptions: [10, 25, 100],
    handleChangePage: (e, number) => {
      setPage(() => ({ ...page, number: number }));
    },
    handleChangeRowsPerPage: (val) => {
      setPage(() => ({ ...page, size: val, number: 0 }));
    }
  });

  // const [options4CreateCluster, setOptions4CreateCluster] = useState([]);

  const btnClickHandler = async (e) => {
    const api_id = e.target.id;

    setLoading(() => !loading);
    try {
      let resp = null;
      switch (api_id) {
        case "clusterStatus":
          resp = await VoyagerApiInstance.loadClustersStatus({ page: page.number + 1, page_size: page.size });
          if (resp && resp.code === 200 && resp.success) {
            setCluster(() => [...resp.data.clusters]);
          } else {
            console.log("not data found");
          }
          break;
        case "networkDevice":
          resp = await VoyagerApiInstance.loadNetworkBrands();
          if (resp && resp.code === 200 && resp.success) {
            setDeviceBrands(() => [...resp.data]);
          } else {
            console.log("not data found");
          }
          break;
        default:
          break;
      }
    } catch (e) {
      console.log("something went wrong!")
    } finally {
      setLoading(() => false);
    }
  }

  const toggleModal = useCallback(() => {
    setCreateClusterModalOpen((isOpen) => !isOpen);
  }, [createClusterModalOpen]);

  return (
    <>
      <h1>This component shows clusters list.</h1>
      <Stack direction="row" spacing={1}>
        <Button id="clusterStatus" onClick={btnClickHandler} disabled={loading} variant="contained">
          {!loading && `Show Cluster Status`}
          {loading && `loading`}
        </Button>

        <Button id="networkDevice" onClick={btnClickHandler} variant="contained">
          Network Devices
        </Button>

      </Stack>


      <Paper>
        <Box>
          <Stack spacing={1}>
            {
              (loading && new Array(10).fill("").map((e, idx) => <Skeleton key={`skeletion_${idx}`} animation="wave" variant="rounded" width={'80%'} height={20} />))
            }
            {
              !loading && !isEmpty(clusters) && <ClusterTable columns={columns} rowData={clusters} page={page} />
            }
          </Stack>
        </Box>
      </Paper>
      {
        deviceBrands.length !== 0 &&
        deviceBrands.map(d => (<Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {d.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                the description shows here
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              device action
            </Button>
          </CardActions>
        </Card>))
      }

      <ClusterCreateBtnGrp buttonCallBack={toggleModal} />

      {
        createClusterModalOpen && <ClusterCreateModal isOpen={createClusterModalOpen} onCloseModal={toggleModal} />
      }
    </>
  );
}


function ClustersStatus() {
  return (<div>List table to show clusters</div>);
}

export default Clusters;
