import { Stack } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import FieldName from "../FieldName";
import { useClusterWizardContext } from "@/hooks/useCreateClusterWizard";
import { isEmpty } from "@/utils";

function ClusterName() {
    const { wizard, dispatch } = useClusterWizardContext();

    const updateWizardData = (e) => {
        dispatch({ field: { name: "name", value: e.target.value } });
    }
    return (<>
        <Stack direction="column" spacing={2}>
            <FieldName title="Name Your Cluster" description="Choose a unique name for your cluster" />
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: "100%" }}>
                    <TextField fullWidth id="filled-basic" label="" variant="standard" defaultValue={wizard?.cluster?.name ?? ""} onChange={updateWizardData} />
                </Box>
            </Stack>
        </Stack>
    </>);
}

export default ClusterName;