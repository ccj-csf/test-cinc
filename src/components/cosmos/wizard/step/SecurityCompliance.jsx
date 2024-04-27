import { Card, CardActionArea, Typography, CardContent, Stack } from "@mui/material";
import { useState } from "react";
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import DoneIcon from '@mui/icons-material/Done';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldName from "../FieldName";
import SecurityIcon from '@mui/icons-material/Security';
import SyncLockIcon from '@mui/icons-material/SyncLock';

function SecurityCompliance() {
    const { wizard, dispatch } = useClusterWizardContext();

    const handleChange = (e, v) => {
        dispatch({ field: { name: "securityComliance", value: v } });
    };

    const comps = [
        { id: "socs_hipaa", name: "SOC2/HIPAA", icon: <SecurityIcon fontSize="large" /> },
        { id: "e2eEncrypted", name: "End-to-End Encrypted", icon: <SyncLockIcon fontSize="large" /> }
    ];
    const desc = "Select the Level of Security for your cluster. In all choices your model graphs and weights are end to end encrypted and read proof. all the data traffic in-transit between the GPU workers is TLS encrypted.";
    if (wizard.current != 5) {
        return null;
    }
    return (<Stack direction="column" spacing={2}>
        <FieldName title="Security Compliance" description={desc} />
        <Stack direction="row" className="justify-center">
            <ToggleButtonGroup
                value={(wizard?.cluster?.securityComliance) || "socs_hipaa"}
                onChange={handleChange} exclusive>
                {
                    comps.map(d => (<ToggleButton value={d.id} key={d.id} sx={{ marginRight: 3, fontSize: '1.25rem' }}>
                        {(wizard?.cluster?.securityComliance === d.id) && (<DoneIcon sx={{ color: 'green', width: '3rem', height: '3rem' }} />)}
                        {d.name}
                        {d.icon}
                    </ToggleButton>))
                }
            </ToggleButtonGroup>
        </Stack>
    </Stack >)
}

export default SecurityCompliance;