import { styled, Box, Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  padding: '24px 32px',
  backgroundColor: theme.palette.neutral.white,
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 16,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    top: '-50%',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
    marginBottom: -4,
  },
}));

export const Tabs = styled(MuiTabs)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  backgroundColor: theme.palette.neutral.white,
  height: theme.spacing(6),
  '& .MuiTabs-indicator': {
    height: 8,
    borderRadius: 4,
    bottom: -4,
  },
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
  ...theme.typography.p14,
  color: theme.palette.neutral.n400,
  height: theme.spacing(6),
  textTransform: 'none',
  width: 'fit-content',
  minWidth: 'fit-content',
  maxWidth: 'fit-content',
  padding: 0,
  marginLeft: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const TabPanel = styled(Box)(({ theme }) => ({
  margin: '24px 32px',
  backgroundColor: theme.palette.neutral.white,
  flex: 1,
}));

TabPanel.defaultProps = { role: 'tabpanel' };
