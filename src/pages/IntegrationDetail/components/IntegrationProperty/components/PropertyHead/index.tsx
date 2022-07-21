import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { useFirestore } from 'firebase-redux/useFirestore';
import { openAuthWindow } from 'pages/IntegrationRedirect/popup';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'store';
import * as actions from 'store/integration-status/actions';
import { APPLICATION_STATUS, IntegrationStatus } from 'store/integration-status/types';
import { useIntegration } from 'store/integration/hooks';
import { useUser } from 'store/user/hooks';
import { Profile } from './ui';

interface Props {
  integrationId: string;
  applicationIcon: string;
  applicationName: string;
  applicationDescription: string;
}

const PropertyHead: FC<Props> = ({ integrationId, applicationIcon, applicationName, applicationDescription }) => {
  const { user, getCurrentUser } = useUser();
  const { integrationStatus, authorizeRedirectUrl, setIntegrationStatus, authorize, uninstall, authCallback } =
    useIntegration();
  const firestore = useFirestore<IntegrationStatus>('google-sessions');

  const { applicationStatus, loading } = useSelector((state) => ({
    applicationStatus: state.integrationStatus.success
      ? state.integrationStatus.data
      : APPLICATION_STATUS.NOT_INSTALLED,
    loading: state.integrationStatus.loading,
  }));

  const popupListener = (event: any) => {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    /* const urlOrigin = new URL(event?.origin);
     * if (urlOrigin.host !== window.location.host) {
     *   return;
     * } */
    console.log('RECEIVE MESSAGE FROM CHILD SOURCE', event.source.location);
    const { data } = event;
    console.log('RECEIVE MESSAGE FROM CHILD DATA', data);
    const params = new URLSearchParams(data);
    const state = params.get('state');
    // if we trust the sender and the source is our popup
    if (state === `${user?.userId}@${integrationId}`) {
      authCallback(data);
    }
  };

  const installOrUninstall = () => {
    if (integrationStatus !== APPLICATION_STATUS.INSTALLED) {
      authorize(integrationId);
    } else {
      uninstall(integrationId);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      const { userId } = user;
      firestore.doc(String(userId), actions, { listen: true, listenerName: 'statusListener' });
    }
  }, [user]);

  useEffect(() => {
    if (applicationStatus && applicationStatus !== integrationStatus) {
      setIntegrationStatus(applicationStatus);
    }
  }, [applicationStatus]);

  useEffect(() => {
    if (integrationStatus === APPLICATION_STATUS.NOT_INSTALLED && authorizeRedirectUrl) {
      openAuthWindow(authorizeRedirectUrl, 'authpopup', popupListener);
    }
  }, [authorizeRedirectUrl]);

  const isInstalled = integrationStatus === APPLICATION_STATUS.INSTALLED;
  return (
    <Box>
      <Profile>
        <Box className="application-icon">
          <img width="72" src={applicationIcon}></img>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h2" sx={{ mr: 'auto', mb: '10px', weight: 600, lineHeight: '24px' }}>
            {applicationName}
          </Typography>
          <Typography component="p" variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
            {applicationDescription}
          </Typography>
        </Box>
      </Profile>
      <Box>
        <SecondaryButton sx={{ width: '168px', marginLeft: '24px' }}>View Setup Guide</SecondaryButton>
        <PrimaryButton
          variant={isInstalled ? 'outlined' : 'contained'}
          sx={{ width: '168px', marginLeft: '15px', marginRight: '24px' }}
          onClick={installOrUninstall}
        >
          {isInstalled ? 'Uninstall' : 'Install'}
        </PrimaryButton>
      </Box>
    </Box>
  );
};
export default PropertyHead;
