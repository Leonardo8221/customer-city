import { FC } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { DealActivity, DealDetails, DealProperty } from './components';

const DealDetailPage: FC = () => {
  const { id: dealId } = useParams();

  return (
    <Container>
      <DealProperty dealId={Number(dealId)} />

      <DealActivity />

      <DealDetails />
    </Container>
  );
};

export default DealDetailPage;
