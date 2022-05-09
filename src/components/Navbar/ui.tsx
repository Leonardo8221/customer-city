import {
  styled,
  AppBar as MuiAppBar,
  Box,
  Button as MuiButton,
  IconButton as MuiIconButton,
  Drawer as MuiDrawer,
  alpha,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from '@mui/material';

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

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 280,
    backgroundColor: theme.palette.neutral.darkBlueHigh,
    paddingTop: NAV_BAR_HEIGHT,
  },
  '& .MuiBackdrop-root': {
    backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  },
}));

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  ...theme.typography.labelMedium14,
  height: 48,
  color: theme.palette.neutral.n400,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  position: 'relative',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
    color: theme.palette.neutral.white,
    '&::before': {
      content: '" "',
      width: 4,
      height: 48,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 0,
    },
    '& svg path': {
      stroke: theme.palette.neutral.white,
    },
  },
}));

export const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  height: 24,
  width: 24,
  minWidth: 24,
  marginRight: theme.spacing(2),
}));

export const BottomContainer = styled(Box)(({ theme }) => ({
  height: 160,
  borderTop: `1px solid ${theme.palette.primary.subtone310}`,
}));

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

export const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  ...theme.typography.p12,
  flex: 1,
  height: 32,
  backgroundColor: theme.palette.neutral.darkBlueMedium,
  color: theme.palette.neutral.n200,
  textTransform: 'none',
  borderRadius: 4,
  ':hover, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.subtone310,
  },
  '&.Mui-selected': {
    borderRadius: 4,
    color: theme.palette.neutral.n200,
    backgroundColor: theme.palette.primary.subtone310,
  },
  ':not(:last-of-type)': {
    borderTopRightRadius: '4px !important',
    borderBottomRightRadius: '4px !important',
  },
}));

export const ThemeIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  width: 16,
  height: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
