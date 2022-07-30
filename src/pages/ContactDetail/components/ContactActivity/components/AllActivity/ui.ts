import { styled, Box } from '@mui/material';

export const EmptyContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#EDF0F5',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const ActivityContainer = styled(Box)(() => ({
  padding: 5,
  overflowY: 'auto',
  height: 'calc(100vh - 17rem)',
}));
