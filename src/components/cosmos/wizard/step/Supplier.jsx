import { Grid, Card, CardActionArea, CardActions, CardMedia, Typography, CardContent, ToggleButton, Stack } from "@mui/material";

import DoneIcon from '@mui/icons-material/Done';
import FieldName from "../FieldName";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DisabledIcon from '@mui/icons-material/Block';

function Supplier() {
    const { wizard, dispatch } = useClusterWizardContext();
    const [selected, setSelected] = useState(false);
    const clickHandler = (e, v) => {
        // setSelected((prev) => !prev);
        dispatch({ field: { name: "supplier", value: v } });
    }

    const suppliers = [{
        id: "cinc",
        name: "CINC",
        disabled: false,
        desc: "Some description shows here"
    }, {
        id: "google",
        name: "GOOGLE",
        desc: "Some description shows here",
        disabled: true,
    }, {
        id: "microsoft",
        name: "MICROSOFT",
        desc: "Some description shows here",
        disabled: true,
    }];
    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }
    if (wizard.current != 2) {
        return null;
    }
    return (<>
        <Stack direction="column" spacing={2}>
            <FieldName title="Supplier" description="select the Supplier you want your cluster to be Powered by" />
            <Grid container spacing={1} className="justify-start">
                {
                    suppliers.map((d) => {
                        let size = { maxWidth: 260, minWidth: 260, minHeight: "8rem", maxHeight: "8rem", overflow: "hidden" };
                        let btnStyleChecked = null;
                        let btnStyleCheckedMark = null;
                        let itemStyle = null;
                        let btnStyleDisabled = null;
                        if ((wizard?.cluster?.supplier) === d.id) {

                            btnStyleCheckedMark = {
                                width: '3rem',
                                height: '3rem',
                                color: 'green',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            };
                        }
                        if (d.disabled) {
                            btnStyleDisabled = {
                                ...size,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                border: "none",
                                backgroundColor: "rgba(36,40, 50, 80%)",
                            }
                            size = {
                                ...size,
                                boxShadow: "none",
                                // backgroundColor: "#dddada",
                                color: "rgba(0, 0, 0, 1)",
                            };
                            // itemStyle = {
                            //     boxShadow: "none",
                            //     backgroundColor: "#dddada",
                            //     color: "rgba(0, 0, 0, 1)",
                            // }

                        }

                        return <Grid item key={d.id}>
                            <Card sx={{ position: 'relative', ...size, ...itemStyle }}>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image="/assets/images/user/login-logo.png"
                                    alt="green iguana"
                                /> */}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {d.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {d.desc}
                                    </Typography>
                                    <ToggleButton value={d.id} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler} disabled={d.disabled}>
                                        {(wizard?.cluster?.supplier) === d.id && <DoneIcon sx={{ ...btnStyleCheckedMark }} />}
                                        {/* {!selected && <UnpublishedOutlinedIcon sx={{ ...btnStyleUCheckedMark }} />} */}
                                        {
                                            d.disabled && <DisabledIcon sx={{ ...btnStyleDisabled }} />
                                        }
                                    </ToggleButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </Stack>




    </>)
}

export default Supplier;