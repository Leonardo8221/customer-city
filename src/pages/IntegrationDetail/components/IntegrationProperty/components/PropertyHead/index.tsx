import { Box, Typography } from '@mui/material';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { FC } from 'react';
import { useAuth } from 'store/auth/hooks';
import { Profile } from './ui';

interface Props {
  applicationIcon: string;
  applicationName: string;
  applicationDescription: string;
}
const PropertyHead: FC<Props> = ({ applicationIcon, applicationName, applicationDescription }) => {
  const { accessToken } = useAuth();
  const install = () => {
    window.location.href = `http://localhost:3001/integration/gmail/authorize?token=${accessToken}`;
  };
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
        <PrimaryButton sx={{ width: '168px', marginLeft: '15px', marginRight: '24px' }} onClick={install}>
          Install
        </PrimaryButton>
      </Box>
    </Box>
  );
};
export default PropertyHead;
