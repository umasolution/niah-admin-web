import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import RevisionModalContent from './revisionModalContent';
import { Button } from '@mui/material';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: 9999;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
 
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 850,
  bgcolor: 'background.paper',
  border: '2px solid',
  p: 2,
  px: 4,
  pb: 3,
  borderRadius : 6,
  boxShadow: 10
};

export default function ModalUnstyledDemo({isOpen, onClose, children}) {
 
const handleClose = () => {
    onClose(false);
}
 
  return (
    <div>
     
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick 
      >
        <Box sx={style}>
         {children}
        </Box>
      
      </StyledModal>
     
    </div>
  );
}
