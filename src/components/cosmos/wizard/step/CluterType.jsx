import { Grid, Card, ToggleButton, CardMedia, Typography, CardContent, Button, Radio, Box, Stack } from "@mui/material";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DoneIcon from '@mui/icons-material/Done';
import DisabledIcon from '@mui/icons-material/Block';
import FieldName from "../FieldName";

function ClusterType() {
    const { wizard, dispatch } = useClusterWizardContext();

    const clickHandler = (e, v) => {
        dispatch({ field: { name: "type", value: e.target.value } });
    }

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    };

    const types = [{
        id: 'general',
        name: 'General',
        desc: 'Some description shows here',
        disabled: false,
    },
    {
        id: 'train',
        name: 'Train',
        desc: 'Some description shows here',
        disabled: true,
    },
    {
        id: 'inference',
        name: 'Inference',
        desc: 'Some description shows here',
        disabled: true,
    }];

    if (wizard.current != 1) {
        return null;
    }
    return (
        <Stack direction="column" spacing={2}>
            <FieldName title="Cluster Type" description="select the type of nodes aggregated in your cluster" />
            <Grid container spacing={1} className="justify-start">
                {
                    types.map((choice) => {
                        let size = {
                            width: 300, maxWidth: 345, position: 'relative', height: "100px"
                        };

                        let btnStyleChecked = null;
                        let btnStyleCheckedMark = null;
                        let btnStyleDisabled = null;
                        if ((wizard?.cluster?.type) === choice.id) {
                            // size.backgroundColor = "#0f34d1";
                            btnStyleCheckedMark = {
                                width: '3rem',
                                height: '3rem',
                                color: 'green',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            };
                        }
                        let itemStyle = null;
                        if (choice.disabled) {
                            btnStyleDisabled = {
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                border: "none",
                                ...size,
                                backgroundColor: "rgba(36,40, 50, 80%)",
                            }
                            itemStyle = {
                                boxShadow: "none",
                                color: "rgba(0, 0, 0, 1)",
                            }
                        }

                        return (
                            <Grid item key={choice.id}>
                                <Card sx={{ ...size, ...itemStyle }}>
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
                                            {choice.description}
                                        </Typography>
                                        <ToggleButton value={choice.id} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler} disabled={choice.disabled}>
                                            {
                                                ((wizard?.cluster?.type ?? "") === choice.id) && <DoneIcon sx={{ ...btnStyleCheckedMark }} />
                                            }
                                            {
                                                choice.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                                // choice.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                            }
                                        </ToggleButton>
                                    </CardContent>
                                </Card>
                            </Grid>)
                    })
                }
            </Grid>
        </Stack>
    )
}

export default ClusterType;