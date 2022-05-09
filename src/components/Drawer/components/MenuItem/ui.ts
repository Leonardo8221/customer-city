import { styled, Box } from '@mui/material';

export const BlueDot = styled(Box)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.primary.main,
}));
