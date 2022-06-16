import { styled, Box, Tabs as MuiTabs, Tab as MuiTab, Button } from '@mui/material';

export const Container = styled(Box)(() => ({
  padding: 24,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #EDF0F5',
  borderRight: '1px solid #EDF0F5',
}));

export const ActivityHead = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
}));

export const Tabs = styled(MuiTabs)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.neutral.white,
  height: theme.spacing(6),
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    gap: theme.spacing(3),
  },
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
  minHeight: theme.spacing(6),
  textTransform: 'none',
  width: 'fit-content',
  minWidth: 'fit-content',
  maxWidth: 'fit-content',
  padding: 0,
  // marginLeft: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const TabPanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  flex: 1,
}));

export const NotificationButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  padding: 0,
  borderRadius: 4,
  fontWeight: 500,
  fontSize: 12,
}));
