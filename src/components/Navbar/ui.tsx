import { styled, AppBar as MuiAppBar, Box, Button as MuiButton } from '@mui/material';

export const AppBar = styled(MuiAppBar)(() => ({
  minHeight: 60,
}));

export const LeftContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const RightContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: theme.spacing(3),
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));
