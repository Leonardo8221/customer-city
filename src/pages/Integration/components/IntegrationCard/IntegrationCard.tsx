import { Box, Typography } from '@mui/material';
import { ReactComponent as InstalledIcon } from 'assets/icons/checkBlue.svg';
import { ReactComponent as InstallIcon } from 'assets/icons/download.svg';
import { PrimaryButton } from 'components/ui';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Integration } from 'store/integration/types';
import { CardContainer } from './ui';

/* import AppIcon from 'assets/icons/applications/gmail.jpg'; */

type IntegrationCardProps = Integration;

const IntegrationCard: FC<IntegrationCardProps> = ({ appId, appName, appDescription, appIcon, isInstalled }) => {
  const navigate = useNavigate();
  const openDetail = () => {
    const path = generatePath(PRIVATE_ABS_ROUTE_PATHS.integrationDetail, { id: appId });
    navigate(path);
  };
  return (
    <CardContainer sx={{ backgroundColor: 'neutral.white' }} onClick={openDetail}>
      <Box className="card-header">
        <img width="32" src={appIcon}></img>
        <PrimaryButton
          variant={isInstalled ? 'outlined' : 'contained'}
          startIcon={isInstalled ? <InstalledIcon /> : <InstallIcon />}
          sx={{ marginLeft: 2 }}
        >
          {isInstalled ? 'Uninstall' : 'Install'}
        </PrimaryButton>
      </Box>
      <Box className="card-content">
        <Typography variant="p14" sx={{ mr: 'auto' }}>
          {appName}
        </Typography>
        <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
          {appDescription}
        </Typography>
      </Box>
    </CardContainer>
  );
};

export default IntegrationCard;
