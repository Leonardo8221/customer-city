import { styled, Box as MuiBox, IconButton as MuiIconButton, Divider as MuiDivider, alpha, Grid } from '@mui/material';

export const Container = styled(MuiBox)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.common.white} 50%, ${theme.palette.primary.main} 50%)`,
  minHeight: '100vh',
  display: 'flex',
}));

export const ContentContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  overflowX: 'hidden',
}));

export const ContentHeader = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  color: theme.palette.neutral.n400,
  position: 'relative',
}));

export const ContentFooter = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  color: theme.palette.neutral.n400,
  padding: theme.spacing(4),
}));

export const IconButton = styled(MuiIconButton)(() => ({
  paddingLeft: 14,
  paddingRight: 14,
  marginLeft: -14,
}));

export const CenteredContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  backgroundColor: theme.palette.primary.subtone1,
  width: 'calc(100% - 64px)',
  position: 'absolute',
  bottom: 8,
  height: 1,
}));

export const RollItem = styled(MuiBox)(({ theme }) => ({
  height: 48,
  width: 248,
  backgroundColor: alpha(theme.palette.primary.subtone320 as string, 0.2),
  color: theme.palette.neutral.white,
  marginBottom: theme.spacing(2),
  borderRadius: 4,
  opacity: 0.2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px 18px',
  paddingTop: 12,
  '& span': {
    flex: 1,
    marginLeft: 18,
  },
}));

export const GridContainer = styled(Grid)(() => ({
  background: 'url(/assets/icons/roadBuildings.svg)',
  backgroundSize: '50vw',
  backgroundPosition: 'bottom right',
  backgroundRepeat: 'no-repeat',
}));
