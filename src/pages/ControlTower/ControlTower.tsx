import { FC, useState, SyntheticEvent } from 'react';
import { Typography } from '@mui/material';

import { Container, TitleContainer, VerticalDivider, Tabs, Tab, TabPanel } from './ui';

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const ControlTower: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  return (
    <Container>
      <TitleContainer>
        <Typography variant="h2" sx={{ color: 'neutral.main' }}>
          Control Tower
        </Typography>

        <VerticalDivider />

        <Typography variant="labelRegular12" sx={{ color: 'neutral.n400', marginBottom: 0.5 }} component="p">
          Manage your team and preferences here
        </Typography>
      </TitleContainer>

      <Tabs value={activeIndex} onChange={onTabChange} aria-label="control tower tabs">
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Team" {...a11yProps(1)} />
      </Tabs>

      <TabPanel hidden={activeIndex !== 0}>Profile</TabPanel>

      <TabPanel hidden={activeIndex !== 1}>Team</TabPanel>
    </Container>
  );
};

export default ControlTower;
