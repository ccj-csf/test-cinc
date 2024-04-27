import { Card, CardActionArea, Typography, CardContent, Stack, Avatar, Grid } from "@mui/material";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DoneIcon from '@mui/icons-material/Done';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldName from "../FieldName";
import SecurityIcon from '@mui/icons-material/Security';

function SingleChoice({ options, defaultVal, fieldTitle, fieldDesc, callback }) {
    // const { updater } = useClusterWizardContext();
    const [selectedValue, setSelectedValue] = useState(defaultVal);

    const handleChange = (event, value) => {
        setSelectedValue(value);
    };

    const demoData = [
        {
            id: "low",
            name: "Low Speed",
            description: (<Typography gutterBottom variant="body1" component="div">
                {`100MB/s       75MB/s`}<br />
                {`download      upload`}
            </Typography>),
            icon: <Avatar sx={{ bgcolor: "pink[500]" }}>
                <SecurityIcon />
            </Avatar>
        },
        {
            id: "medium", name: "Medium Speed",
            description: (<Typography gutterBottom variant="body1" component="div">
                {`100MB/s       75MB/s`}<br />
                {`download      upload`}
            </Typography>),
            icon: <Avatar sx={{ bgcolor: "pink[500]" }}>
                <SecurityIcon />
            </Avatar>
        },
        {
            id: "high", name: "High Speed",
            description: (<Typography gutterBottom variant="body1" component="div">
                {`100MB/s       75MB/s`}<br />
                {`download      upload`}
            </Typography>),
            icon: <Avatar sx={{ bgcolor: "pink[500]" }}>
                <SecurityIcon />
            </Avatar>
        },
        {
            id: "ultra", name: "Ultra High Speed",
            description: (<Typography gutterBottom variant="body1" component="div">
                {`100MB/s       75MB/s`}<br />
                {`download      upload`}
            </Typography>),
            icon: <Avatar sx={{ bgcolor: "pink[500]" }}>
                <SecurityIcon />
            </Avatar>
        }
    ];

    const control = {
        value: selectedValue,
        onChange: handleChange,
        exclusive: true,
    }
    return (

        <Stack direction="column" spacing={2}>
            <FieldName title={fieldTitle} description={fieldDesc} />
            <ToggleButtonGroup {...control}>
                <Grid container spacing={1} className="justify-start">
                    {
                        // demoData.map(d => (
                        //     <Grid item>
                        //         <ToggleButton value={d.id} key={d.id}>
                        //             <div>{(selectedValue === d.id) && (<DoneIcon />)}</div>
                        //             <Stack direction="column" spacing={2}>
                        //                 {d.icon}
                        //                 <Typography paragraph gutterBottom variant="h6" component="div">
                        //                     {d.name}
                        //                 </Typography>
                        //                 <div>
                        //                     {d.description}
                        //                 </div>
                        //             </Stack>
                        //         </ToggleButton>
                        //     </Grid>
                        // ))
                    }
                </Grid>
            </ToggleButtonGroup>

        </Stack>
    )
}

export default SingleChoice;