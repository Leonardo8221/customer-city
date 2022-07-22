import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { useFirestore } from 'firebase-redux/useFirestore';
import { openAuthWindow } from 'pages/IntegrationRedirect/popup';
import { FC, useEffect } from 'react';
import * as actions from 'store/integration-status/actions';
import { useIntegrationStatus } from 'store/integration-status/hooks';
import {
  APPLICATION_STATUS,
  APPLICATION_STATUS_LABEL,
  IntegrationSession,
  mapStatusLabel,
} from 'store/integration-status/types';
import { useIntegration } from 'store/integration/hooks';
import { useUser } from 'store/user/hooks';
import { Profile } from './ui';

interface Props {
  integrationId: string;
  applicationIcon: string;
  applicationName: string;
  applicationDescription: string;
  initialStatus: string;
}

const PropertyHead: FC<Props> = ({
  integrationId,
  applicationIcon,
  applicationName,
  applicationDescription,
  initialStatus,
}) => {
  const { user, getCurrentUser } = useUser();
  const { authorizeRedirectUrl, authorize, uninstall, authCallback } = useIntegration();
  const {
    data: { applicationStatus, statusLabel },
    loading: statusLoading,
    setLoading,
  } = useIntegrationStatus();
  const firestore = useFirestore<IntegrationSession>('google-sessions');

  const popupListener = (event: any) => {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    const urlOrigin = new URL(event?.origin);
    if (urlOrigin.host !== window.location.host) {
      return;
    }
    const { data } = event;
    const params = new URLSearchParams(data);
    const state = params.get('state');
    // if we trust the sender and the source is our popup
    if (state === `${user?.userId}@${integrationId}`) {
      authCallback(data);
    }
  };

  const installOrUninstall = () => {
    if (applicationStatus === APPLICATION_STATUS.NOT_INSTALLED) {
      setLoading(APPLICATION_STATUS_LABEL.INSTALLING);
      authorize(integrationId);
    } else if (applicationStatus === APPLICATION_STATUS.INSTALLED) {
      setLoading(APPLICATION_STATUS_LABEL.UNINSTALLING);
      uninstall(integrationId);
    } else {
      return;
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
    if (applicationStatus === APPLICATION_STATUS.NOT_INSTALLED && authorizeRedirectUrl) {
      openAuthWindow(authorizeRedirectUrl, 'authpopup', popupListener);
    }
  }, [authorizeRedirectUrl]);

  const isInstalled = applicationStatus === APPLICATION_STATUS.INSTALLED;
  return (
    <Box>
      <Profile>
        <Box className="application-icon">{applicationIcon && <img width="72" src={applicationIcon}></img>}</Box>
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
          disabled={[APPLICATION_STATUS_LABEL.LOADING, APPLICATION_STATUS_LABEL.UNINSTALLING].includes(
            statusLabel as APPLICATION_STATUS_LABEL,
          )}
          variant={isInstalled ? 'outlined' : 'contained'}
          sx={{ width: '168px', marginLeft: '15px', marginRight: '24px' }}
          onClick={installOrUninstall}
        >
          {statusLabel ? statusLabel : mapStatusLabel(initialStatus)}
        </PrimaryButton>
      </Box>
    </Box>
  );
};
export default PropertyHead;
