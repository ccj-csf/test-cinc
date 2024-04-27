import { Grid, ToggleButton, Stack, Card, CardActionArea, CardActions, CardMedia, Typography, CardContent, Button, Box } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import FieldName from "../FieldName";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';

function SustainableGPU() {
    const { wizard, dispatch } = useClusterWizardContext();

    const clickHandler = (e, v) => {
        // setSelected((prev) => !prev);
        dispatch({ field: { name: "sustainableGPU", value: !(wizard?.cluster?.sustainableGPU) } });
    }

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }

    let size = {
        minWidth: 500,
        maxWidth: 600,
        position: 'relative',
        // backgroundColor: "#22c1c4"
    };
    let btnStyleChecked = null;
    let btnStyleCheckedMark = null;
    if ((wizard?.cluster?.sustainableGPU)) {
        // btnStyleChecked = {
        //     backgroundColor: '#8acb8a57',
        // }
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
    let btnStyleUCheckedMark = {
        width: '3rem',
        height: '3rem',
        position: 'absolute',
        top: 0,
        right: 0,
    };

    if (wizard.current != 2) {
        return null;
    }
    return (
        <Stack direction="column" spacing={2}>
            <FieldName title="Sustainable GPUs" description="Green 100% clean energy powered by GPUs" />
            <Grid container spacing={1} className="justify-start">
                <Grid item>
                    <Card sx={{ ...size }}>
                        {/* <CardMedia
                            component="img"
                            height="140"
                            image=""
                            alt="green iguana"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Green GPUs
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                        {choice.description}
                                    </Typography> */}
                            <ToggleButton value={(wizard?.cluster?.sustainableGPU) || false} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler}>
                                {
                                    (wizard?.cluster?.sustainableGPU) && <TaskAltOutlinedIcon sx={{ ...btnStyleCheckedMark }} />
                                }
                                {!(wizard?.cluster?.sustainableGPU) && <UnpublishedOutlinedIcon sx={{ ...btnStyleUCheckedMark }} />}
                            </ToggleButton>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default SustainableGPU;