import { useState } from "react";
import { Box, ButtonGroup, CardMedia, CardContent, Typography, Button, Card, Paper, Skeleton, Stack, CardActionArea, CardActions, Container } from "@mui/material";
import { CosmosApiInstance } from "@/api";
import ClusterTable from "./ClusterTable";
import { useCallback } from "react";
import { useEffect } from "react";
// import Auth from "@/utils/auth";
// import ClusterInformation from "./ClusterInformation";
import { useNavigateWithParams } from "@/hooks";
// import ClusterCreateBtnGrp from "@/components/cosmos/ClusterCreateBtnGrp";
import ClusterCreateModal from "@/components/cosmos/ClusterCreateModal";
import _ from 'lodash-es';
import Auth from "@/utils/auth";



// const columnsStringArray = 'amount_paid,amount_refunded,band_width_level_name,brand_info,cluster_id,cluster_name,compute_hours_remaining,compute_hours_served,download_speed_mbps,finished_at,hardware_info,is_failed,jupyter_url,locations,percent_completed,python_version,ray_dashboard_url,ray_version,resource_type,running_for,security_compliance,service_icon,service_name,started_at,status,total_age,upload_speed_mbps,vscode_url'.split(",");
const clusterColumnLabels = {
    cluster_name: 'Name',
    brand_info: 'Brand',
    hardware_info: 'Hardware',
    locations: 'Locations',
    service_name: 'Base Image',
    status: 'Status'
}
const columnsStringArray = 'cluster_name,brand_info,hardware_info,locations,service_name,status'.split(",");
const columns = columnsStringArray.map(c => ({ id: c, label: clusterColumnLabels[c] }));


function UserClusters(props) {
    const { goClusterInfo } = useNavigateWithParams()
    //cluster data list
    const [clusters, setClusters] = useState(null);
    // single cluster info
    const [cluster, setCluster] = useState(null);
    const [createClusterModalOpen, setCreateClusterModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createClusterSelection, setCreateClusterSelection] = useState(false);
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

    useEffect(() => {
        const loadUserClusters = async () => {
            setLoading(() => !loading);
            try {
                const user = Auth.getProfile();
                const resp = await CosmosApiInstance.loadUserCluster(user.id, "cluster", { page: page.number + 1, page_size: page.size });
                if (resp && resp.code === 200 && resp.data.resources) {
                    setClusters(() => [...resp.data.resources]);
                } else {
                    console.log("not data found");
                }
            } catch (e) {
                console.log("something went wrong!")
            } finally {
                setLoading(() => false);
            }
        }
        loadUserClusters();
    }, []);

    const toggleModal = useCallback(() => {
        setCreateClusterModalOpen((isOpen) => !isOpen);
    }, [createClusterModalOpen]);

    const showDetails = useCallback((newClusterInfo) => {
        console.log(newClusterInfo);
        setCluster(newClusterInfo)
        // setShowDetail(true);
        goClusterInfo(newClusterInfo.cluster_id, newClusterInfo);
    }, [cluster]);

    const tableProps = { rowData: clusters, page, showDetails, columns }
    return (
        <>
            <Stack direction="column" spacing={2}>
                <div className="text-3xl py-10 text-gray-light">
                    Clusters
                </div>
                <ButtonGroup variant="outlined" color="primary" size="large" aria-label="Cluster actions" size="lg">
                    <Button onClick={() => setCreateClusterSelection(true)}>Create new cluster</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
                {!_.isEmpty(clusters) && <ClusterTable {...tableProps} />}
            </Stack>
            {/* <ClusterCreateBtnGrp buttonCallBack={toggleModal} /> */}
            {
                createClusterModalOpen && <ClusterCreateModal isOpen={createClusterModalOpen} onCloseModal={toggleModal} />
            }
            {
                createClusterSelection && <ClusterTypeSelection />
            }
        </>
    );
}

export default UserClusters;