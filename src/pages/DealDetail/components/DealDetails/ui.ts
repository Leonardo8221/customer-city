import { styled, Box } from '@mui/material';
import { TextButton } from 'components/ui';

export const Container = styled(Box)(() => ({
  flex: 8,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  overflowY: 'auto',
  height: 'calc(100vh - 3.5rem)',
}));

export const AddButton = styled(TextButton)(({ theme }) => ({
  marginTop: 8,
  color: theme.palette.primary.main,
  fontSize: 12,
  fontWeight: 400,
  height: 32,
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
}));
