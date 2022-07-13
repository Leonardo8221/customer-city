import { Box, Divider } from '@mui/material';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC } from 'react';
import { Integration } from 'store/integration/types';
import DataPrivacy from './components/DataPrivacy';
import Detail from './components/Detail';
import PropertyHead from './components/PropertyHead';
import Requirement from './components/Requirement';
import Resources from './components/Resources';
import Support from './components/Support';
import { BackToRoute, Container, PropertyContainer, PropertyHeadContainer } from './ui';

type Props = Partial<Integration>;

const IntegrationProperty: FC<Props> = ({ appName, appIcon, appDescription, isInstalled, property }) => {
  const { details: detailProps } = property || {};
  const { requirements: requirementProps } = property || {};
  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.integration}>
        <ArrowLeft />
        {'Back to Integration'}
      </BackToRoute>
      {/* <PropertyHeadContainer>
      </PropertyHeadContainer> */}
      <PropertyHead appIcon={String(appIcon)} appName={String(appName)} appDescription={String(appDescription)} />
      <Box padding="31px 24px">
        <Divider />
      </Box>
      <PropertyContainer>
        {detailProps && <Detail {...detailProps} />}
        <Divider />
        {requirementProps && <Requirement {...requirementProps} />}
        <Divider />
        <Resources />
        <Divider />
        <Support />
        <Divider />
        <DataPrivacy />
        <Divider />
      </PropertyContainer>
      {/* {loading && <Loader />} */}
    </Container>
  );
};

export default IntegrationProperty;
