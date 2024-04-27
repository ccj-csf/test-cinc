import { Stack } from "@mui/material";
import Supplier from "../Supplier";
import SustainableGPU from "../SustainableGPU";

function SupplierSustainable() {
    return (
        <Stack direction="column" spacing={2}>
            <SustainableGPU />
            <Supplier />
        </Stack>
    );
}

export default SupplierSustainable;