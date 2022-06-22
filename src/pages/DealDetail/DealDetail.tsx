import { FC, useEffect } from 'react';
import { Typography } from '@mui/material';

import { useDeal } from 'store/deal/hooks';
import { Loader } from 'components/Loader';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { DealActivity, DealDetails, DealProfile } from './components';

const DealDetailPage: FC = () => {
  const { id: dealId } = useParams();

  const { loading, error, deal, getDeal } = useDeal();

  useEffect(() => {
    getDeal(Number(dealId));
  }, [dealId, getDeal]);

  if (loading) return <Loader />;

  return (
    <Container>
      <DealProfile deal={deal} />

      <DealActivity />

      <DealDetails />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}
    </Container>
  );
};

export default DealDetailPage;
