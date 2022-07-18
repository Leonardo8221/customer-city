import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIntegration } from 'store/integration/hooks';
import { IntegrationDetail, IntegrationProperty } from './components';
import { Container } from './ui';

const IntegrationDetailPage: FC = () => {
  const { id: appId } = useParams();
  const { getIntegration, integration } = useIntegration();
  useEffect(() => {
    getIntegration(Number(appId));
  }, []);
  return (
    <Container>
      <IntegrationProperty {...integration} />
      <IntegrationDetail />
    </Container>
  );
};

export default IntegrationDetailPage;
