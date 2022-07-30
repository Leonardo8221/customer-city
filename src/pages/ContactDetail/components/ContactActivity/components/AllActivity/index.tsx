import { Box, Typography } from '@mui/material';
import { ReactComponent as CheckBoxIcon } from 'assets/icons/boxCheckedGrey.svg';
import { FC, useEffect } from 'react';
import { useActivity } from 'store/activity/hooks';
import { ACTIVITY_TYPE_ID } from 'types';
import EmailActivity from './components/EmailActivity';
import { ActivityContainer, EmptyContainer } from './ui';

const AllActivity: FC = () => {
  const { getActivities, activities, successWrite } = useActivity();

  useEffect(() => {
    getActivities();
  }, [successWrite]);

  return (
    <>
      {activities?.length > 0 ? (
        <ActivityContainer>
          {activities.map((activity, index) => {
            return activity?.activityTypeId === ACTIVITY_TYPE_ID.EMAIL ? (
              <EmailActivity key={index} {...activity} />
            ) : (
              <Box component="div">NOT IMPLEMENTED YET</Box>
            );
          })}
        </ActivityContainer>
      ) : (
        <EmptyContainer>
          <CheckBoxIcon />
          <Typography variant="p12" width={220} sx={{ textAlign: 'center', lineHeight: 2 }}>
            {'You don’t have any activity yet.'} {'Choose an activity on toolbar'}
          </Typography>
        </EmptyContainer>
      )}
    </>
  );
};

export default AllActivity;
