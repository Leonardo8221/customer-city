import { FC, useState } from 'react';
import { Typography, IconButton, Box } from '@mui/material';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { LoadingButton, Modal, TextButton } from 'components/ui';
import { ModalContainer, ModalHeader, ModalFooter, ButtonGroup, BackTo } from './ui';
import FirstPage, { ActionType } from './pages/First';
import SecondPage, { DetailType } from './pages/Second';
import Documents from './pages/Documents';

interface ProductModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const HyperFunnelModal: FC<ProductModalProps> = ({ open, toggleOpen }) => {
  const [actionType, setActionType] = useState<ActionType>('from-scratch');
  const [detailType, setDetailType] = useState<DetailType | undefined>(undefined);
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer sx={{ width: 640 }}>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {pageIndex === 0 && 'New Pipeline'}
            {pageIndex === 1 && (detailType !== undefined ? 'Sales Documentation' : 'New Pipeline')}
            {pageIndex === 2 && 'Pipeline stages'}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Box sx={{ height: 496 }}>
          {pageIndex === 0 && <FirstPage selected={actionType} onSelect={(type) => setActionType(type)} />}
          {pageIndex === 1 && (
            <>
              {detailType === undefined && (
                <SecondPage
                  onDetail={(detail) => {
                    setDetailType(detail);
                  }}
                />
              )}
              {detailType === 'documents' && <Documents />}
            </>
          )}
        </Box>

        <ModalFooter>
          {pageIndex > 0 &&
            (pageIndex === 1 && detailType !== undefined ? (
              <BackTo
                onClick={() => {
                  setDetailType(undefined);
                }}
              >
                <ArrowLeft />
                <Typography variant="p12">Back to Pipeline creating</Typography>
              </BackTo>
            ) : (
              <BackTo
                onClick={() => {
                  setPageIndex((p) => p - 1);
                  setDetailType(undefined);
                }}
              >
                <ArrowLeft />
                <Typography variant="p12">Back to Step {pageIndex}</Typography>
              </BackTo>
            ))}
          {pageIndex !== 1 && (
            <Box>
              <Typography variant="p14">{pageIndex + 1}</Typography>
              <Typography variant="p14" sx={{ color: 'neutral.n400' }}>
                {' / 3'}
              </Typography>
            </Box>
          )}
          <ButtonGroup>
            <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
              Cancel
            </TextButton>
            {pageIndex === 1 && detailType !== undefined ? (
              <LoadingButton variant="contained" onClick={() => setDetailType(undefined)}>
                {'Save and back to Pipeline'}
              </LoadingButton>
            ) : (
              <LoadingButton variant="contained" onClick={() => setPageIndex((p) => p + 1)}>
                {'Next'}
              </LoadingButton>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default HyperFunnelModal;
