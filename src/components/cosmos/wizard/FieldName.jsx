import { Typography } from "@mui/material";
function FieldName({ title, description }) {
    return (<>
        <Typography gutterBottom variant="h4" component="h4">
            {title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
            {description}
        </Typography>
    </>);
}

export default FieldName;