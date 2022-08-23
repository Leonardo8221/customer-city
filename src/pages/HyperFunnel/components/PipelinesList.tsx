
import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material';
import LeftPanel from 'pages/HyperFunnel/components/LeftPanel';
import PanelBodySidebar from 'components/PanelLayout/PanelBodySidebar';

export default function HyperFunnel() {

  return (
    <PanelBodySidebar leftPanelChild={<LeftPanel />} middlePanelChild={<RightContainer />} leftPanelTitle="HyperFunnels" />
  );
}

export const Container = styled(MuiBox)(() => ({
  flex: 1,
  display: 'flex',
  backgroundColor: '#EDF0F5',
}));

export const RightContainer = styled(MuiBox)(() => ({ padding: 24, width: 800 }));

export const LeftContainer = styled(MuiBox)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));
