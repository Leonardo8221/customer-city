import { useFirestore } from 'firebase-redux/useFirestore';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IntegrationStatus } from 'store/integration-status/types';
import { useIntegration } from 'store/integration/hooks';
import { IntegrationOverview, IntegrationProperty } from './components';
import { Container } from './ui';
import * as actions from 'store/integration-status/actions';
import { useSelector } from 'store';

const IntegrationDetailPage: FC = () => {
  const { id: appId } = useParams();
  const { integration, getIntegration } = useIntegration();
  useEffect(() => {
    getIntegration(String(appId));
  }, []);
  return (
    <Container>
      <IntegrationProperty {...integration} />
      <IntegrationOverview />
    </Container>
  );
};

export default IntegrationDetailPage;
