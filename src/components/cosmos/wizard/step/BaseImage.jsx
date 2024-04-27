import { Box, Grid, Typography, Stack, CardContent, CardMedia, CardActionArea, Card, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import FieldName from "../FieldName";
import DoneIcon from '@mui/icons-material/Done';
import DisabledIcon from '@mui/icons-material/Block';
import { border } from "@mui/system";


function BaseImage() {
    const { wizard, dispatch } = useClusterWizardContext();
    // const [selectedValue, setSelectedValue] = useState('');

    const choices = [
        { id: "rayApp", name: "Ray App", description: "some description", disabled: false, icon: <DoneIcon /> },
        { id: "pytorchFSDP", name: "Pytorch FSDP", description: "some description", disabled: false, icon: null },
        { id: "ludwig", name: "Ludwig", description: "some description", disabled: false, icon: null },
        { id: "ioNavtiveApp", name: "IO Navtive App", description: "some description", disabled: false, icon: null },
        { id: "unrealEngine5", name: "Unreal Engine 5", description: "some description", disabled: true, icon: null },
        { id: "unityStream", name: "Unity Streaming", description: "some description", disabled: false, icon: null },
    ];

    const clickHandler = (e, v) => {
        // setSelectedValue(v);
        dispatch({ field: { name: "baseImage", value: e.target.value } });
    }

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    };
    return (
        <Stack direction="column" spacing={2}>
            <FieldName title="Cluster Base Image " description="Choose your cluster purpose with out of the box configuration that requires no additional setups and ready for your exisiting codebase." />
            <Grid container spacing={1} className="justify-start">
                {
                    choices.map((choice) => {
                        let size = {
                            minWidth: 300, minHeight: "8rem",
                            // backgroundColor: "#22c1c4",
                        };
                        let itemStyle = null;
                        let btnStyleChecked = null;
                        let btnStyleCheckedMark = null;
                        let btnStyleDisabled = null;
                        if ((wizard?.cluster?.baseImage) === choice.id) {
                            btnStyleCheckedMark = {
                                width: '3rem',
                                height: '3rem',
                                color: 'green',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            };
                        }


                        if (choice.disabled) {
                            btnStyleDisabled = {
                                // color: 'grey',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                border: "none",
                                ...size,
                                backgroundColor: "rgba(36,40, 50, 80%)",
                            }
                            itemStyle = {
                                boxShadow: "none",
                                // backgroundColor: "#dddada",
                                color: "rgba(0, 0, 0, 1)",
                            }
                        }

                        return (
                            <Grid item key={choice.id}>
                                <Card sx={{ position: 'relative', ...size, ...itemStyle }}>
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
                                                ((wizard?.cluster?.baseImage) === choice.id) && <DoneIcon sx={{ ...btnStyleCheckedMark }} />
                                            }
                                            {
                                                choice.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                                // choice.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                            }
                                        </ToggleButton>
                                    </CardContent>
                                </Card></Grid>)
                    })
                }
            </Grid>
        </Stack >
    )
}

export default BaseImage;