import { styled, Box } from '@mui/material';
import { TextButton } from 'components/ui';

export const Container = styled(Box)(() => ({
  width: 400,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
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
