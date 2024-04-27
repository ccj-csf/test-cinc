import { Stack } from "@mui/material";
import BaseImage from "../BaseImage";
import ClusterName from "../ClusterName";

function ImageName() {
    return (
        <Stack direction="column" spacing={5}>
            <ClusterName />
            <BaseImage />
        </Stack>
    );
}

export default ImageName;