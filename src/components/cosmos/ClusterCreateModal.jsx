import { useState } from 'react';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseButton from '@mui/icons-material/Close';
import ClusterCreateWizard from './ClusterCreateWizard';
import ClusterWizardContextProvider from '../../hooks/useCreateClusterWizard';
import { useMemo } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '50vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

const styleFull = {
    position: 'absolute',
    top: '5vh',
    bgcolor: 'background.paper',
    width: '100%',
    height: '90%',
};

const Confirm = ({ open, confirmAction }) => {
    const btnClickHandler = (action, reason) => {
        if (action === 'cancel') {
            confirmAction.cancel()
        } else {
            confirmAction.abort();
        }
    }
    const handleClose = (e, m) => {
        if ("backdropClick" === m) {
            return false;
        }
    }
    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, height: '15rem' }}>
                <h2 className='text-3xl m-2'>{confirmAction.message.title}</h2>
                <p className="text-xl m-2">
                    {confirmAction.message.content}
                </p>
                <div className='absolute bottom-5'>
                    <Button size='large' variant='outlined' onClick={() => { btnClickHandler('cancel') }} sx={{ mr: 2 }}>Cancel</Button>
                    <Button size='large' color="warning" variant='outlined' onClick={() => { btnClickHandler('abort') }}>Abort</Button>
                </div>
            </Box>
        </Modal>
    </>);
}
export default function ClusterCreateModal({ isOpen, onCloseModal }) {
    const [open, setOpen] = useState(isOpen);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleClose = (evt, reason) => {
        // console.log(evt);
        if ("backdropClick" === reason) {
            return false;
        }
        onCloseModal();
        setOpen(false)
    };
    const confirmAction = useMemo(() => {
        return {
            abort: () => {
                setConfirmOpen(false)
                setOpen(false)
                onCloseModal();
            },
            cancel: () => { setConfirmOpen(false) },
            message: { title: "Are you sure?", content: "you are creating cluster, all your setting will not save and cluster will not be create." }
        };
    }, [confirmOpen]);
    return (
        <div>
            <div className='absolute top-5 right-5 bg-black-dark rounded-full scale-150' style={{ zIndex: 1305 }}>
                <IconButton size='large' onClick={() => setConfirmOpen(true)} aria-label="delete">
                    <CloseButton />
                </IconButton>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={styleFull}>
                        <ClusterWizardContextProvider>
                            <ClusterCreateWizard handleClose={handleClose} />
                        </ClusterWizardContextProvider>
                    </Box>
                </Fade>
            </Modal>
            <Confirm open={confirmOpen} confirmAction={confirmAction} />
        </div>
    );
}
