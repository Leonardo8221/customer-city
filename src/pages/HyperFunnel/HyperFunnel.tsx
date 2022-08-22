import { FC, useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { ReactComponent as BlocksIcon } from 'assets/icons/blocks.svg';
import { PrimaryButton } from 'components/ui';
import { Product } from 'store/product/types';
import { useProduct } from 'store/product/hooks';
import { Loader } from 'components/Loader';
import { useAuth } from 'store/auth/hooks';
import { Container, HyperFunnelContainer } from './ui';
import { HyperFunnelModal } from './components';
import PipelinesProvider, { usePipelines } from './PipelinesProvider';
import React from 'react';
import { useToggle } from 'utils/toggle';
import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';

export default function HyperFunnel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { loading, error, getProducts } = useProduct();
  const { isAdmin, isSuperAdmin } = useAuth();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PipelinesProvider>
      <PipelinesList />
      <EmptyHyperFunnel />
    </PipelinesProvider>
  );
}

function EmptyHyperFunnel() {
  const { flag, toggle } = useToggle();
  const { pipelines } = usePipelines();

  if (pipelines.length) {
    return null;
  }
  return (
    <Container>
      <Typography variant="h2" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
        HyperFunnel
      </Typography>

      <HyperFunnelContainer>
        <Typography variant="h3" component="p" sx={{ color: 'neutral.main' }}>
          What Pipelines & Funnels need for?
        </Typography>
        <BlocksIcon />
        <Typography variant="p14" component="p" sx={{ color: 'neutral.main', width: 560, textAlign: 'center' }}>
          A sales pipeline represents the stages a consumer goes through to become a customer. The sales funnel
          represents the number of prospects who make it through those stages. A sales pipeline looks at the different
          steps in the sales process, from gaining the lead to closing the sale.
        </Typography>
        <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.n400' }}>
          You have not added any products yet
        </Typography>
        <PrimaryButton onClick={toggle}>Create a Pipeline</PrimaryButton>
      </HyperFunnelContainer>

      <HyperFunnelModal open={flag} toggleOpen={toggle} />
    </Container>
  );
}
