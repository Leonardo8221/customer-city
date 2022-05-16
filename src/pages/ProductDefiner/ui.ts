import { styled, Box } from '@mui/material';

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

export const SectionTitleContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const CounterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  borderRadius: 4,
  width: 26,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
}));

export const ProducsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkBg.main,
  minHeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));
