import { Box, Card, Container, Stack, Typography } from "@mui/material";
import ClusterType from "./step/CluterType";
import SupplierSustainable from "./step/combined/SupplierSustainable";
import Location from "./step/Location";
import Processor from "./step/Processor";
import SecurityCompliance from "./step/SecurityCompliance";
import ConnectivityTier from "./step/ConnectivityTier";
import SingleChoice from "./step/SingleChoice";
import ClusterName from "./step/ClusterName";
import BaseImage from "./step/BaseImage";
import WizardSummary from "./step/WizardSummary";
import ImageName from "./step/combined/ImageName";


const buildStep = (cs, type = "element", swiperRef, handleClose) => {
    let stepComponent;
    // console.log(cs.id);
    switch (cs.id) {
        case 'type':
            stepComponent = type === "element" ? <ClusterType /> : "";
            break;
        case 'sustainableGPU_supplier':
            stepComponent = type === "element" ? <SupplierSustainable /> : "";
            break;
        case 'processor':
            stepComponent = type === "element" ? <Processor /> : "";
            break;
        case 'location':
            stepComponent = type === "element" ? <Location /> : "";
            break;
        case 'security':
            stepComponent = type === "element" ? <SecurityCompliance /> : "";
            break;
        case 'connectivity':
            stepComponent = type === "element" ? <ConnectivityTier /> : "";
            // stepComponent = type === "element" ? <SingleChoice options={[]} defaultVal="medium" fieldTitle="Hello" fieldDesc="World" callback={() => { }} /> : "";
            break;
        case 'baseImage_name':
            stepComponent = type === "element" ? <ImageName /> : "";
            break;
        // case 'baseImage':
        //     stepComponent = type === "element" ? <BaseImage /> : "";
        //     break;
        case 'summary':
            stepComponent = type === "element" ? <WizardSummary swiperRef={swiperRef} handleClose={handleClose} /> : "";
            break;
        default:
            stepComponent = type === "element" ? null : "";
            break;
    }
    return stepComponent;
}


function Wrapper({ step, swiperRef, handleClose }) {
    const style = {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: 'red',
    };
    return (
        <Container sx={style}>
            <Box>
                <Stack direction="row" spacing={3}>
                    {
                        buildStep(step, "element", swiperRef, handleClose)
                    }
                </Stack>
            </Box>
        </Container>
    );
}

export default Wrapper;