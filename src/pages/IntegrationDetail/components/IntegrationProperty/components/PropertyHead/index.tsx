import { Box, Link, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { FC } from 'react';
import { useAuth } from 'store/auth/hooks';
import { Profile } from './ui';

interface Props {
  integrationId: number;
  applicationIcon: string;
  applicationName: string;
  applicationDescription: string;
  applicationStatus: string;
}
const PropertyHead: FC<Props> = ({
  integrationId,
  applicationIcon,
  applicationName,
  applicationDescription,
  applicationStatus,
}) => {
  const { accessToken } = useAuth();
  const isInstalled = applicationStatus === 'installed';
  const primaryActionUrl = `${process.env.REACT_APP_API_URL}/integration/${integrationId}/authorize?token=${accessToken}`;

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
        <Link href={primaryActionUrl} target="blank" rel="noreferrer">
          <PrimaryButton
            variant={isInstalled ? 'outlined' : 'contained'}
            sx={{ width: '168px', marginLeft: '15px', marginRight: '24px' }}
          >
            {isInstalled ? 'Uninstall' : 'Install'}
          </PrimaryButton>
        </Link>
      </Box>
    </Box>
  );
};
export default PropertyHead;
