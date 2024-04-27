import { Card, CardActionArea, CardActions, CardMedia, Typography, CardContent, Stack, Grid, ToggleButton } from "@mui/material";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DoneIcon from '@mui/icons-material/Done';
import FieldName from "../FieldName";
import { CosmosApiInstance } from "@/api";
import { useEffect } from "react";
import _ from 'lodash-es';

function Location() {
    const { wizard, dispatch } = useClusterWizardContext();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!_.isUndefined(wizard.cluster.hardwareId)) {
            setLoading(true);
            const loadOptions4CreatingCluster = async () => {
                try {
                    const resp = await CosmosApiInstance.createClusterRay(wizard.cluster.hardwareId);
                    if (resp && resp.code === 200 && resp.success) {
                        setLocations(resp.data.locations);
                    } else {
                        console.log("not data found");
                    }
                } catch (error) {
                    console.log("not data found");
                } finally {
                    setLoading(false);
                }
            }
            loadOptions4CreatingCluster();
        }
    }, [wizard.cluster.hardwareId]);

    const clickHandler = (e, v) => {
        const _loc = locations.filter(l => l.id === v).map(m => ({
            id: m.id,
            name: m.name,
            iso2: m.iso2,
        }));

        dispatch({ field: { name: "locations", value: _loc } });
    }

    const btnStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
    };

    if (_.isEmpty(locations)) {
        return null;
    }
    if (wizard.current != 4) {
        return null;
    }
    let w_loc;
    if (wizard?.cluster?.locations && !_.isEmpty(wizard.cluster.locations)) {
        w_loc = wizard.cluster.locations[0];
    }

    const desc = 'Select a location or multiple locations where the GPUs are located, Enjoy the advantage of decentralization and bring inference closer to your user, or training closer to your data.';
    return (<Stack direction="column" spacing={2}>
        <FieldName title="Location" description={desc} />
        <Grid container spacing={1} className="justify-center" >
            {
                locations.map((choice) => {
                    let btnStyleChecked = null;
                    let btnStyleCheckedMark = null;
                    if (w_loc && w_loc.id === choice.id) {
                        // btnStyleChecked = {
                        //     backgroundColor: '#8acb8a57',
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
                    return <Grid item key={choice.id} className="justify-content">
                        <Card sx={{ height: 80, width: 150, maxWidth: 150, position: 'relative' }}>
                            {/* <CardMedia
                                component="img"
                                height="140"
                                image=""
                                alt="green iguana"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {choice.name}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                                    {choice.description}
                                </Typography> */}
                                <ToggleButton value={choice.id} sx={{ ...btnStyle, ...btnStyleChecked }} onClick={clickHandler}>
                                    {
                                        (btnStyleCheckedMark !== null) && <DoneIcon sx={{ ...btnStyleCheckedMark }} />
                                    }
                                </ToggleButton>
                            </CardContent>
                        </Card>
                    </Grid>
                })
            }
        </Grid>
    </Stack>)
}

export default Location;