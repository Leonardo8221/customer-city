import { Typography } from '@mui/material';
import { TextButton } from 'components/ui';
import { FC, SyntheticEvent, useState } from 'react';
import { ActivityHead, Container, NotificationButton, Tab, TabPanel, Tabs } from './ui';
import { ReactComponent as FilterIcon } from 'assets/icons/filterGray.svg';
import AllActivity from '../AllActivity';
import ActivityToolBar from '../ActivityToolBar/ActivityToolBar';

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const ContactActivity: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  return (
    <Container>
      <Typography variant="h3">{'Activity'}</Typography>

      <ActivityHead>
        <Tabs value={activeIndex} onChange={onTabChange} aria-label="contact activity tabs">
          <Tab label="All activity" {...a11yProps(0)} />
          <Tab label="Tasks" {...a11yProps(1)} />
          <Tab label="Touchpoints" {...a11yProps(2)} />
          <Tab label="Shared Files" {...a11yProps(3)} />
          <Tab
            label="Updates"
            {...a11yProps(4)}
            icon={<NotificationButton>{'1'}</NotificationButton>}
            iconPosition="end"
          />
        </Tabs>
        <TextButton startIcon={<FilterIcon />} sx={{ p: 1, height: 24 }}>
          {'Filter'}
        </TextButton>
      </ActivityHead>

      <TabPanel hidden={activeIndex !== 0}>{activeIndex === 0 && <AllActivity />}</TabPanel>
      <TabPanel hidden={activeIndex !== 1}>{activeIndex === 1 && <AllActivity />}</TabPanel>
      <TabPanel hidden={activeIndex !== 2}>{activeIndex === 2 && <AllActivity />}</TabPanel>
      <TabPanel hidden={activeIndex !== 3}>{activeIndex === 3 && <AllActivity />}</TabPanel>
      <TabPanel hidden={activeIndex !== 4}>{activeIndex === 4 && <AllActivity />}</TabPanel>

      <ActivityToolBar />
    </Container>
  );
};

export default ContactActivity;
