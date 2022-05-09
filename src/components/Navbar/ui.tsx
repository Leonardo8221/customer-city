import { styled, AppBar as MuiAppBar, Box, Button as MuiButton, IconButton as MuiIconButton } from '@mui/material';

import { NAV_BAR_HEIGHT } from 'core/constants';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: NAV_BAR_HEIGHT,
  backgroundColor: theme.palette.neutral.darkBlueHigh,
  '& .MuiToolbar-root': {
    minHeight: NAV_BAR_HEIGHT,
  },
  zIndex: theme.zIndex.drawer + 1,
}));

export const LeftContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
}));

export const RightContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: theme.spacing(3),
  height: '100%',
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  '& svg path': {
    stroke: theme.palette.neutral.white,
  },
}));

export const NavLogoButton = styled(MuiIconButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 16,
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(2),
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    top: '50%',
    marginTop: -8,
    width: 1,
    backgroundColor: theme.palette.primary.subtone320,
  },
}));
