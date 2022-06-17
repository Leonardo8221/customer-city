import { styled, Modal as MuiModal, Box, alpha } from '@mui/material';

export const Modal = styled(MuiModal)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiBackdrop-root': {
    backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  },
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  maxHeight: '90%',
  overflowY: 'auto',
  maxWidth: 980,
  width: '100%',
  backgroundColor: theme.palette.neutral.white,
  borderRadius: 4,
  padding: '16px 32px',
}));

export const ModalHeader = styled(Box)(() => ({
  padding: '8px 0 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ModalFooter = styled(Box)(() => ({
  paddingTop: 16,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

export const PaginatedModalFooter = styled(Box)(() => ({
  width: '100%',
  paddingTop: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ModalMain = styled(Box)(() => ({
  padding: '32px 0 52px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));
