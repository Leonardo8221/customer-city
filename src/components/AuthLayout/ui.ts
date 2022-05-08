import { styled, Box as MuiBox, IconButton as MuiIconButton, Divider as MuiDivider, alpha, Grid } from '@mui/material';

export const Container = styled(MuiBox)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.common.white} 50%, ${theme.palette.primary.main} 50%)`,
  minHeight: '100vh',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    background: theme.palette.primary.main,
  },
}));

export const ContentContainer = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ContentHeader = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  color: theme.palette.neutral.n400,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    color: theme.palette.neutral.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const ContentFooter = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  color: theme.palette.neutral.n400,
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    color: theme.palette.neutral.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
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

export const GridContainer = styled(Grid)(({ theme }) => ({
  background: 'url(/assets/icons/roadBuildings.svg)',
  backgroundSize: '50vw',
  backgroundPosition: 'bottom right',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('md')]: {
    backgroundSize: '100vw',
  },
}));
