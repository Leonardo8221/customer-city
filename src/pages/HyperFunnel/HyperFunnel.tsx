import PipelinesProvider from './PipelinesProvider';
import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';
import EmptyHyperFunnel from 'pages/HyperFunnel/EmptyHyperFunnel';
import ProductsProvider from 'providers/ProductsProvider';

export default function HyperFunnel() {
  return (
    <ProductsProvider>
      <PipelinesProvider>
        <PipelinesList />
        <EmptyHyperFunnel />
      </PipelinesProvider>
    </ProductsProvider>
  );
}
