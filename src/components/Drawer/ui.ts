import {
  styled,
  Box,
  Drawer as MuiDrawer,
  alpha,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from '@mui/material';

import { NAV_BAR_HEIGHT } from 'core/constants';

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

export const MainListContainer = styled(Box)(() => ({
  height: `calc(100% - ${160}px)`,
  overflowY: 'auto',
}));

export const ListItem = styled(MuiListItem)<{ nested?: boolean }>(({ theme, nested = false }) => ({
  ...theme.typography.labelMedium14,
  height: 48,
  color: theme.palette.neutral.n400,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  position: 'relative',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: nested ? 'inherit' : theme.palette.neutral.darkBlueMedium,
    color: theme.palette.neutral.white,
    '&::before': {
      content: '" "',
      width: 4,
      height: 48,
      backgroundColor: nested ? 'inherit' : theme.palette.primary.main,
      position: 'absolute',
      left: 0,
    },
    '& svg path': {
      stroke: theme.palette.neutral.white,
    },
  },
}));

export const ListItemIcon = styled(MuiListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'marginRight' && prop !== 'small',
})<{ marginRight?: number; small?: boolean }>(({ theme, marginRight, small }) => ({
  height: small ? 16 : 24,
  width: small ? 16 : 24,
  minWidth: small ? 16 : 24,
  marginRight: marginRight ?? theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
