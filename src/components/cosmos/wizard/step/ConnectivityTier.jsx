import { Grid, Card, CardMedia, CardActionArea, Typography, CardContent, Stack } from "@mui/material";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DoneIcon from '@mui/icons-material/Done';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldName from "../FieldName";
import SecurityIcon from '@mui/icons-material/Security';
import SyncLockIcon from '@mui/icons-material/SyncLock';

function ConnectivityTier() {
    const { availableOptions, wizard, dispatch } = useClusterWizardContext();

    const clickHandler = (e, v) => {
        const tmp = availableOptions.band_width_levels.find(f => f.band_width_level_id === v);

        dispatch({ field: { name: "band_width_level_name", value: tmp.name } });
        dispatch({ field: { name: "download_speed_mbps", value: tmp.download_speed_mbps } });
        dispatch({ field: { name: "upload_speed_mbps", value: tmp.upload_speed_mbps } });
    }

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    };

    const desc = "Specify your desired connectivity speed. If you want to save on connectivity, you can select the lowest speed and if the speed is critical you can go for the hgiher tier.";

    if (wizard.current != 6 || !availableOptions.band_width_levels) {
        return null;
    }

    const comps = [...availableOptions.band_width_levels];

    return (<Stack direction="column" spacing={2}>
        <FieldName title="Connectivity Tier" description={desc} />
        <Grid container spacing={1} className="justify-start">
            {
                comps.map(choice => {
                    let btnStyleChecked = null;
                    let btnStyleCheckedMark = null;
                    if ((wizard?.cluster?.band_width_level_name) === choice.name) {
                        // btnStyleChecked = {
                        //     backgroundColor: '#8acb8a57',
                        //     // hover: '#8acb8a57'
                        // }
                        btnStyleCheckedMark = {
                            width: '3rem',
                            height: '3rem',
                            color: 'green',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        };
                    }

                    return (
                        <Grid item key={choice.band_width_level_id}>
                            <Card sx={{ minWidth: 500, position: 'relative' }}>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image=""
                                    alt="green iguana"
                                /> */}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {choice.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${choice.download_speed_mbps}MB/s   |   ${choice.upload_speed_mbps}MB/s`}<br />
                                        {`Download   |   Upload`}<br />
                                    </Typography>
                                    <ToggleButton value={choice.band_width_level_id} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler}>
                                        {
                                            (btnStyleCheckedMark !== null) && <DoneIcon sx={{ ...btnStyleCheckedMark }} />
                                        }
                                    </ToggleButton>
                                </CardContent>
                            </Card>
                        </Grid>)
                })
            }
        </Grid>
    </Stack>)
}

export default ConnectivityTier;