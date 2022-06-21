import { Typography } from '@mui/material';
import { FC } from 'react';
import { Container } from './ui';
import AllActivity from '../AllActivity';

// const a11yProps = (index: number) => {
//   return {
//     id: `tab-${index}`,
//     'aria-controls': `tabpanel-${index}`,
//   };
// };

const AccountActivity: FC = () => {
  // const [activeIndex, setActiveIndex] = useState<number>(0);

  // const onTabChange = (event: SyntheticEvent, newValue: number) => {
  //   setActiveIndex(newValue);
  // };

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {'Activity'}
      </Typography>

      {/* <ActivityHead>
        <Tabs value={activeIndex} onChange={onTabChange} aria-label="account activity tabs">
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
      <TabPanel hidden={activeIndex !== 4}>{activeIndex === 4 && <AllActivity />}</TabPanel> */}

      <AllActivity />

      {/* <ActivityToolBar /> */}
    </Container>
  );
};

export default AccountActivity;
