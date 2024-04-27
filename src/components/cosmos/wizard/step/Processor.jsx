import { Grid, Card, CardActionArea, CardActions, CardMedia, Typography, CardContent, Button, Radio, Box, Stack } from "@mui/material";
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldName from "../FieldName";
import DoneIcon from '@mui/icons-material/Done';
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import _ from 'lodash-es';



import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AppleIcon from '@mui/icons-material/Apple';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

function Processor() {
    const { availableOptions, wizard, dispatch } = useClusterWizardContext();

    //for manuallfactory 
    const [brandName, setBrandName] = useState((wizard?.cluster?.processor) || "AMD");

    //for specific model
    const [selected, setSelected] = useState("");

    const handleChange = (e, v) => {
        setBrandName(v);
        dispatch({ field: { name: "brandName", value: v } });
    };

    const clickHandler = (e, v) => {
        setSelected(v);
        const hw = brands[brandName].find(hw => hw.hardware_id === v);
        if (hw) {
            dispatch({ field: { name: "hardwareId", value: v } });
            dispatch({ field: { name: "hardwareName", value: hw.name } });
            dispatch({ field: { name: "hardwareQuantity", value: hw.hardware_quantity } });
        }
    }

    // const types = [{
    //     type: 'AMD',
    //     icon: <DeveloperBoardIcon sx={{ fontSize: "5rem" }} />,
    //     processors: [{
    //         id: 'amd1',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'amd2',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'amd3',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'amd4',
    //         desc: 'some description shows here'
    //     }]
    // }, {
    //     type: 'NVIDIA',
    //     icon: <AutoGraphIcon sx={{ fontSize: "5rem" }} />,
    //     processors: [{
    //         id: 'nvidia1',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'nvidia2',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'nvidia3',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'nvidia4',
    //         desc: 'some description shows here'
    //     }]
    // }, {
    //     type: 'APPLE',
    //     icon: <AppleIcon sx={{ fontSize: "5rem" }} />,
    //     processors: [{
    //         id: 'apple1',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'apple2',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'apple3',
    //         desc: 'some description shows here'
    //     }, {
    //         id: 'apple4',
    //         desc: 'some description shows here'
    //     }]
    // }];

    const brands = (availableOptions?.hardwares && _.groupBy(availableOptions.hardwares, "brand_name") || {});
    if (wizard.current != 3) {
        return null;
    }

    if (_.isEmpty(brands)) return null;

    const brandNamesArr = _.keys(brands);
    const processors = brands[brandName];
    const icon = _.isEmpty(brandName) ? null : ((k) => {
        switch (k) {
            case 'Apple':
                return <AppleIcon sx={{ fontSize: "5rem" }} />;
            case 'NVIDIA':
                return <AutoGraphIcon sx={{ fontSize: "5rem" }} />;
            case 'AMD':
                return <DeveloperBoardIcon sx={{ fontSize: "5rem" }} />;

            default:
                return null;
        }
    })(brandName);

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }

    return (
        <Stack direction="column" spacing={2}>
            <FieldName title="Select Your Cluster Processor" description="Browse from a wide range of Chips suitable for different use cases, You Can Either Select a CPU Only Cluster or a GPU Only Cluster" />
            <Stack direction="row" className="justify-start">
                <Box sx={{ marginRight: "3%" }}>
                    {icon}
                </Box>
                <ToggleButtonGroup value={brandName} onChange={handleChange} exclusive={true}>
                    {
                        brandNamesArr.map((t) => (<ToggleButton value={t} key={t} sx={{ fontSize: "1.25rem", padding: "0 20px" }}>
                            {t}
                        </ToggleButton>))
                    }
                </ToggleButtonGroup>

            </Stack>
            <Box sx={{ maxHeight: 'calc(100vh *.5)', overflow: 'auto' }}>
                <Grid container spacing={1} className="justify-start">
                    {!processors && <Typography gutterBottom variant="h5" component="div">
                        Please select processor type
                    </Typography>}
                    {
                        processors && processors.map(p => {
                            let btnStyleChecked = null;
                            let btnStyleCheckedMark = null;
                            if (selected === p.hardware_id) {
                                // btnStyleChecked = {
                                //     backgroundColor: '#8acb8a57',
                                // }
                                btnStyleCheckedMark = {
                                    width: '3rem',
                                    height: '3rem',
                                    color: '#22c1c3',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                };
                            }
                            return <Grid item key={p.hardware_id}>
                                <Card sx={{ maxWidth: 400, position: 'relative' }}>
                                    <CardActionArea sx={{ paddingTop: 3.5 }}>
                                        {/* <CardMedia
                                            component="img"
                                            height="140"
                                            image="/assets/images/user/login-logo.png"
                                            alt="green iguana"
                                        /> */}
                                        <CardContent>
                                            <Typography gutterBottom variant="body1" component="div">
                                                {p.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {`device usage:${p.busy_percent}%`}
                                            </Typography>
                                            <ToggleButton value={p.hardware_id} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler}>
                                                {
                                                    (selected === p.hardware_id) && <DoneIcon sx={{ ...btnStyleCheckedMark }} />
                                                }
                                            </ToggleButton>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        </Stack>)
}

export default Processor;