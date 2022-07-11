import { Box, Divider, Typography } from '@mui/material';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC } from 'react';
import { BackToRoute, Container, ProfileHead, PropertyContainer } from './ui';

interface Props {
  appId: string;
}

const IntegrationProperty: FC<Props> = ({ appId }) => {
  const appName = 'Gmail';
  const appDescription =
    'Et consectetur tempora ipsa hic animi. Omnis eos aperiam omnis omnis et magni. Vitae tenetur vitae sed sapiente';
  const appIcon = 'https://cdn-icons-png.flaticon.com/32/281/281769.png';
  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.integration}>
        <ArrowLeft />
        {'Back to Integration'}
      </BackToRoute>
      <ProfileHead>
        <Box className="app-icon">
          <img width="72" src={appIcon}></img>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" sx={{ mr: 'auto' }}>
            {appName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'neutral.n400' }}>
            {appDescription}
          </Typography>
        </Box>
      </ProfileHead>
      <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between">
        <SecondaryButton sx={{ width: '168px', marginLeft: '24px' }}>View Setup Guide</SecondaryButton>
        <PrimaryButton sx={{ width: '168px', marginRight: '24px' }}>Install</PrimaryButton>
      </Box>
      <Divider />
      <PropertyContainer></PropertyContainer>
      {/* {loading && <Loader />} */}
    </Container>
  );
};

export default IntegrationProperty;
