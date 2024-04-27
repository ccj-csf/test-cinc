import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import { Card, CardContent, Box, Stack, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import FieldName from '../FieldName';
import _ from 'lodash-es';
import { CREATE_CLUSTER_STEPS } from '@/constants';
import { CosmosApiInstance } from '@/api';
import { useState } from 'react';
import SubmitProgress from './SubmitProgress';

function WizardSummary({ swiperRef, handleClose }) {

    const { wizard, dispatch } = useClusterWizardContext();
    const [showEdit, setShowEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const changeDuration = (e, v) => {
        dispatch({ field: { name: "duration_type", value: v } });
    }

    const changeDurationCount = (e) => {
        dispatch({ field: { name: "duration_count", value: parseInt(e.target.value) } });
    }
    const changeQuantity = (e) => {
        dispatch({ field: { name: "hardware_quantity", value: parseInt(e.target.value) } });
    }

    const clusterKeys = _.keys(wizard.cluster);
    const editWdizard = (key) => {
        const index = CREATE_CLUSTER_STEPS.findIndex(v => {
            return v.id.indexOf(key) !== -1;
        });
        dispatch({ isChangeStep: true, currentIndex: index });
        if (swiperRef !== null) {
            swiperRef.slideTo(index, 500, false);
        }
    }

    const saveAndCreate = () => {
        const cluster = {
            "amount_paid": 0,
            "band_width_level_name": wizard.cluster.band_width_level_name,
            // "brand_icon": "string",
            "brand_name": wizard.cluster.brandName,
            "cluster_type": wizard.cluster.type,
            "download_speed_mbps": wizard.cluster.download_speed_mbps,
            "duration_count": wizard.cluster?.duration_count || 10,
            "duration_type": wizard.cluster?.duration_type || "Hourly",
            "finished_at": new Date().toISOString().replace('T', ' ').replace(/\..*/g, ''),
            "hardware_id": wizard.cluster.hardwareId,
            "hardware_name": wizard.cluster.hardwareName,
            "hardware_quantity": wizard.cluster?.hardware_quantity || 10,
            "locations": [...wizard.cluster.locations],
            "name": wizard.cluster.name,
            "python_version": "3.2.1",
            "ray_version": "1.2.3",
            // "service_icon": "string",
            "service_name": wizard.cluster.baseImage,
            "started_at": new Date().toISOString().replace('T', ' ').replace(/\..*/g, ''),
            // "status": "string",
            "upload_speed_mbps": wizard.cluster.upload_speed_mbps,
        }
        setSubmitting(true);
        setTimeout(() => {
            try {
                CosmosApiInstance.createCluster(cluster);
            } catch (error) {
                console.log(error)
            } finally {
                setSubmitting(false);
                handleClose();
            }
        }, 15000);

    }

    if (wizard.current != CREATE_CLUSTER_STEPS.length - 1) {
        return null;
    }


    if (submitting) {
        return (<>
            <SubmitProgress swiperRef={swiperRef} handleClose={handleClose} />
        </>);
    }

    const numberInputStyle = {
        color: "black",
        width: "5rem",
        height: "2rem",
        padding: "1rem",
        borderRadius: "5px",
    }
    let size = {
        width: "50%"
    };
    return (<>

        {_.isEmpty(wizard.cluster) && <h1>Show Cluster Summary</h1>}
        {!_.isEmpty(wizard.cluster) && <Stack direction="column" spacing={2}>
            <FieldName title="Summary" description={`Review your cluster settings, click <Create> to create your cluster`} />
            <Stack direction="row" spacing={2}>
                <Card sx={{ ...size }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Enter GPUs Quantity :
                        </Typography>
                        <Box>
                            <input type="number" defaultValue="10" onChange={changeQuantity} style={{ ...numberInputStyle }} />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ ...size }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Enter Duration
                        </Typography>
                        <ToggleButtonGroup
                            value={wizard.cluster.duration}
                            exclusive
                            onChange={changeDuration}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="Hourly" aria-label="left aligned">
                                Hourly
                            </ToggleButton>
                            <ToggleButton value="Daily" aria-label="centered">
                                Daily
                            </ToggleButton>
                            <ToggleButton value="Weekly" aria-label="right aligned">
                                Weekly
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Box sx={{ display: "inline-block", marginLeft: 1 }}>
                            <input type="number" defaultValue="10" onChange={changeDurationCount} style={{ ...numberInputStyle }} />
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", maxHeight: "calc(100vh * 0.5)", overflow: "auto", justifyContent: "flex-start" }}>
                {
                    clusterKeys.map(key => (
                        <Card key={key} sx={{ marginBottom: "0.5rem !important" }}>
                            <CardContent>
                                <Typography gutterBottom variant="body2" component="div">
                                    {key}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {(key === 'locations') && wizard.cluster.locations[0].name}
                                    {_.isBoolean(wizard.cluster[key]) && (_.isBoolean(wizard.cluster[key] == true) ? "Enabled" : "Disabled")}
                                    {key !== 'locations' && <div>{wizard.cluster[key]}</div>}

                                </Typography>
                                <IconButton aria-label='edit' color='default' onClick={() => { editWdizard(key) }}>
                                    <EditIcon />
                                </IconButton>
                            </CardContent>
                        </Card>


                    ))
                }
            </Stack>
            <Button variant="contained" size='large' onClick={saveAndCreate}>Deploy</Button>
        </Stack>}

    </>);
}
export default WizardSummary;