import { FC } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { IntegrationProperty, IntegrationDetail } from './components';

const IntegrationDetailPage: FC = () => {
  const { id: appId } = useParams();

  return (
    <Container>
      <IntegrationProperty appId={String(appId)} />
      <IntegrationDetail />
    </Container>
  );
};

export default IntegrationDetailPage;
