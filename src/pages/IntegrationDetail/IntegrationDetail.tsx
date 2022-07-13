import { FC, useEffect } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { IntegrationProperty, IntegrationDetail } from './components';
import { useIntegration } from 'store/integration/hooks';

const IntegrationDetailPage: FC = () => {
  const { id: appId } = useParams();
  const { getIntegration, integration } = useIntegration();
  useEffect(() => {
    getIntegration(String(appId));
  }, [getIntegration, appId, integration]);
  return (
    <Container>
      <IntegrationProperty {...integration} />
      <IntegrationDetail />
    </Container>
  );
};

export default IntegrationDetailPage;
