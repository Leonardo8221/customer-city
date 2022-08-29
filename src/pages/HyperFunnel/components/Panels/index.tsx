import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BasicFunnelViews from './BasicFunnelView';
import ExpandedFunnelView from './ExpandedFunnelView';
import FullJourneyView from './FullJourneyView';

export default function Panels() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ backgroundColor: 'white', width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Basic Funnel View" value="1" />
              <Tab label="Expanded Funnel View" value="2" />
              <Tab label="Full Journey View" value="3" />
            </TabList>
          </Box>
        </Box>
        <TabPanel value="1">
          <BasicFunnelViews />
        </TabPanel>
        <TabPanel value="2">
          <ExpandedFunnelView />
        </TabPanel>
        <TabPanel value="3">
          <FullJourneyView />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
