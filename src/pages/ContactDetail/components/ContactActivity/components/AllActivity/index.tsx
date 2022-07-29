import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { Container } from './ui';
import { ReactComponent as CheckBoxIcon } from 'assets/icons/boxCheckedGrey.svg';
import { useActivity } from 'store/activity/hooks';

const AllActivity: FC = () => {
  const { getActivities, activities } = useActivity();

  useEffect(() => {
    console.log('here ====================================================================================');
    getActivities();
  }, []);

  return (
    <Container>
      <CheckBoxIcon />
      <Typography variant="p12" width={220} sx={{ textAlign: 'center', lineHeight: 2 }}>
        {'You don’t have any activity yet.'} {'Choose an activity on toolbar'}
      </Typography>
    </Container>
  );
};

export default AllActivity;
