import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 24,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 24,
    position: 'absolute',
    top: 8,
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
  },
}));

export const HyperFunnelContainer = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '2.5rem',
}));
