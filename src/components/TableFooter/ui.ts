import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  '& > *': {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  '& > :last-child': {
    justifyContent: 'flex-end',
  },
}));
