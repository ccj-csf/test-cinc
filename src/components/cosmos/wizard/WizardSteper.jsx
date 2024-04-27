
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton, StepLabel } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isEmpty } from '@/utils';
import { useClusterWizardContext } from '@/hooks/useCreateClusterWizard';
import { CREATE_CLUSTER_STEPS } from '@/constants';

const clusterCreateStepLabel = {
    type: 'Cluster Type',
    sustainableGPU_supplier: 'GPU & Supplier',
    processor: 'Hardware',
    location: 'Location',
    security: 'Security',
    connectivity: 'Connectivity',
    baseImage_name: 'Base Image',
    summary: 'Summer',
}
function WizardSteper({ swiperRef }) {
    const { wizard, dispatch } = useClusterWizardContext();
    const { current } = wizard;

    const $steps = CREATE_CLUSTER_STEPS.map(x => x.id);

    const isStepFailed = (step) => {
        return false;
    };
    const handleStep = (index) => {
        dispatch({ isChangeStep: true, currentIndex: index });
        if (swiperRef !== null) {
            swiperRef.slideTo(index, 500, false);
        }
    }

    return (<Box sx={{ width: '100%' }}>
        <Stepper activeStep={current} nonLinear alternativeLabel>
            {$steps.map((label, index) => {
                const labelProps = {};
                if (isStepFailed(index)) {
                    labelProps.optional = (
                        <Typography variant="caption" color="error">
                            Alert message
                        </Typography>
                    );
                    labelProps.error = true;
                }

                return (
                    <Step key={label}>
                        {
                            labelProps.error && <StepLabel {...labelProps}>{label.id}</StepLabel>
                        }
                        {isEmpty(labelProps) && <StepButton color="inherit" onClick={() => { handleStep(index) }}>
                            {clusterCreateStepLabel[label]}
                        </StepButton>}

                    </Step>
                );
            })}
        </Stepper>
    </Box >);
}

export default WizardSteper;