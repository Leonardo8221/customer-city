import { useState, useEffect } from 'react';
import { Product } from 'store/product/types';
import { useProduct } from 'store/product/hooks';
import { Loader } from 'components/Loader';
import { useAuth } from 'store/auth/hooks';
import PipelinesProvider from './PipelinesProvider';
import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';
import EmptyHyperFunnel from 'pages/HyperFunnel/EmptyHyperFunnel';

export default function HyperFunnel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { loading, error, getProducts } = useProduct();
  const { isAdmin, isSuperAdmin } = useAuth();

  useEffect(() => {
    // getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PipelinesProvider>
      <PipelinesList />
      <EmptyHyperFunnel />
    </PipelinesProvider>
  );
}
